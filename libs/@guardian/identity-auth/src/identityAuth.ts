import { getCookie, removeCookie } from '@guardian/libs';
import type {
	IdentityAuthOptions,
	IdentityAuthState,
	OAuthUrls,
	RequiredIdentityAuthOptions,
} from './@types/OAuth';
import type { CustomClaims } from './@types/Token';
import { AuthStateManager } from './authState';
import { AutoRenewService } from './autoRenew';
import { cookieRefreshIfRequired } from './cookieRefresh';
import { Emitter } from './emitter';
import { OAuthError } from './error';
import { Token } from './token';
import { TokenManager } from './tokenManager';

/**
 * @class IdentityAuth
 * @description IdentityAuth is the main class for interacting with the Guardian's OAuth2.0 implementation within a browser
 *
 * This provides minimal functionality for the Guardian's OAuth2.0 implementation.
 *
 * It provides the following functionality when instantiated:
 * - A `tokenManager` for managing oauth tokens
 * - A `token` for requesting new oauth tokens
 * - An `authStateManager` for managing the current authentication state
 *
 * @param {IdentityAuthOptions} options - The options for IdentityAuth
 */
export class IdentityAuth<
	AC extends CustomClaims = CustomClaims,
	IC extends CustomClaims = CustomClaims,
> {
	#options: RequiredIdentityAuthOptions;
	#oauthUrls: OAuthUrls;
	#emitter: Emitter;
	#autoRenewService: AutoRenewService;

	// holder if there is currently an is signed in check in progress
	#isSignedInWithAuthStateInProgress:
		| Promise<IdentityAuthState<AC, IC>>
		| undefined;

	public tokenManager: TokenManager<AC, IC>;
	public token: Token<AC, IC>;
	public authStateManager: AuthStateManager<AC, IC>;

	constructor(options: IdentityAuthOptions) {
		this.#options = {
			autoRenew: true,
			renewGracePeriod: 60,
			maxClockSkew: 300,
			idCookieSessionRefresh: false,
			oauthTimeout: 30000,
			strictClockSkewCheck: false,
			...options,
		};
		this.#oauthUrls = {
			authorizeUrl: `${this.#options.issuer}/v1/authorize`,
			tokenUrl: `${this.#options.issuer}/v1/token`,
			keysUrl: `${this.#options.issuer}/v1/keys`,
		};

		// before doing anything else, we check if the user's session should be refreshed based on the idCookieSessionRefresh option
		cookieRefreshIfRequired(
			this.#options.idCookieSessionRefresh,
			this.#options.issuer,
		);

		this.#emitter = new Emitter();
		this.token = new Token<AC, IC>(this.#options, this.#oauthUrls);
		this.tokenManager = new TokenManager<AC, IC>(this.#emitter, this.token);
		this.authStateManager = new AuthStateManager<AC, IC>(
			this.#emitter,
			this.tokenManager,
		);
		this.#autoRenewService = new AutoRenewService(
			this.#options,
			this.#emitter,
			this.authStateManager,
		);

		this.#isSignedInWithAuthStateInProgress = undefined;

		this.#autoRenewService.start();
	}

	/**
	 * @name #isSignedInWithAuthState
	 * @description Private implementation of `isSignedInWithAuthState`, see `isSignedInWithAuthState` for more details
	 * @returns `AuthState` - Returns the current authentication state
	 */
	async #isSignedInWithAuthState(): Promise<IdentityAuthState<AC, IC>> {
		try {
			// first check if the user has valid access and id tokens
			const authState = this.authStateManager.getAuthState();
			// if they do we need to check if a user has recently signed out
			if (authState.isAuthenticated) {
				// validate the id token and access token to make sure auth state is still valid
				await this.token.verifyTokens(authState.idToken, authState.accessToken);

				// if a user has a GU_SO cookie, they might have recently signed out
				const guSoCookie = parseInt(
					getCookie({ name: 'GU_SO', shouldMemoize: true }) ?? '',
				);

				// calculate the clock skew between the user's device and the server
				const normalisedCurrentTime =
					Math.floor(Date.now() / 1000) - authState.idToken.clockSkew;

				// if the GU_SO cookie value (the timestamp when a user last signed out) is greater than the id token's iat (issued at) value,
				// then the user has recently signed out, so we should clear their tokens
				if (
					// make sure that the GU_SO cookie is in the past
					guSoCookie <= normalisedCurrentTime &&
					// compare the GU_SO cookie to the id token's iat value
					guSoCookie > authState.idToken.claims.iat
				) {
					// clear the tokens
					// we don't return a blank auth state here,
					// as the user * might * still be signed in, so we go to the next check
					this.tokenManager.clear();
				} else {
					// otherwise the user is signed in, so return the auth state
					// if the id token is valid, return the auth state
					return authState;
				}
			}

			// if the user doesn't have tokens, but they have a GU_U cookie, they are "maybe" signed in
			// we can try to get tokens without prompting/redirecting the user for credentials
			// it will error if the user is not signed in
			// if testing on localhost, you will need to set the GU_U cookie manually
			if (getCookie({ name: 'GU_U', shouldMemoize: true })) {
				const tokens = await this.tokenManager.getTokens({
					refreshIfRequired: true,
				});
				if (tokens) {
					return {
						accessToken: tokens.accessToken,
						idToken: tokens.idToken,
						isAuthenticated: true,
					};
				} else {
					// if we weren't able to get the tokens, despite having a GU_U cookie, the user is not signed in
					// we should clear the GU_U cookie, as it is likely invalid
					removeCookie({ name: 'GU_U' });
				}
			}

			// if the user doesn't have tokens or a GU_U cookie, they are not signed in
			return {
				accessToken: undefined,
				idToken: undefined,
				isAuthenticated: false,
			};
		} catch (error) {
			// check if the error is an OAuthError and the error is login_required, in which case the user is not signed in
			if (error instanceof OAuthError && error.error === 'login_required') {
				// remove the GU_U cookie, as it is likely invalid
				removeCookie({ name: 'GU_U' });

				// and return isAuthenticated: false
				return {
					accessToken: undefined,
					idToken: undefined,
					isAuthenticated: false,
				};
			}

			// otherwise there is an unknown error, so clear any tokens and throw the error
			this.tokenManager.clear();
			throw error;
		}
	}

	/**
	 * @name isSignedInWithAuthState
	 * @description Checks if the user is signed in, and updates the auth state as necessary, returns the current auth state
	 *
	 * This performs side effects.
	 *
	 * This follows the flowchart from https://github.com/guardian/gateway/blob/main/docs/okta/web-apps-integration-guide.md#how-to-know-if-a-reader-is-signed-in to determine if the user is signed in
	 *
	 * 1. If the user tokens already exist, then verify them to make sure they are still valid
	 * 2. If they do, check if the user has a `GU_SO` cookie and compare it to the `iat` value of the id token
	 *   a. If the `GU_SO` cookie value is greater than the `iat` value, the user has recently signed out, so we should clear their tokens (side effect)
	 *   b. Otherwise, the user is signed in, so return the auth state
	 * 3. If the user doesn't have tokens, but they have a `GU_U` cookie, they are "maybe" signed in
	 *  a. We can try to get tokens without prompting/redirecting the user for credentials (side effect)
	 * 	b. If no tokens are returned, we clear the `GU_U` cookie, as it is likely invalid (side effect)
	 *  c. If there is an error getting the tokens:
	 *    i. If the error is an `OAuthError` and the error is `login_required`, the user is not signed in, so we clear the `GU_U` cookie, as it is likely invalid (side effect)
	 *    ii. Otherwise, there is an unknown error, so clear any tokens and throw the error
	 * 4. If the user doesn't have tokens or a GU_U cookie, they are not signed in
	 *
	 * For optimisation, this method will only run one signed in check at a time,
	 * and will return the existing promise if a check is already in progress
	 *
	 * @returns `AuthState` - Returns the current authentication state
	 */
	public async isSignedInWithAuthState(): Promise<IdentityAuthState<AC, IC>> {
		// check if there is already a signed in check in progress
		if (this.#isSignedInWithAuthStateInProgress) {
			// if there is, return the existing promise
			return this.#isSignedInWithAuthStateInProgress;
		}

		// if there isn't, start a new signed in check
		// by creating a new promise that clears itself when it finishes
		this.#isSignedInWithAuthStateInProgress =
			this.#isSignedInWithAuthState().finally(() => {
				this.#isSignedInWithAuthStateInProgress = undefined;
			});

		// return the new promise
		return this.#isSignedInWithAuthStateInProgress;
	}

	/**
	 * @name isSignedIn
	 * @description Checks if the user is signed in, and updates the auth state as necessary, returns boolean
	 *
	 * This performs side effects.
	 *
	 * This follows the flowchart from https://github.com/guardian/gateway/blob/main/docs/okta/web-apps-integration-guide.md#how-to-know-if-a-reader-is-signed-in to determine if the user is signed in
	 *
	 * 1. If the user tokens already exist, then verify them to make sure they are still valid
	 * 2. If they do, check if the user has a `GU_SO` cookie and compare it to the `iat` value of the id token
	 *   a. If the `GU_SO` cookie value is greater than the `iat` value, the user has recently signed out, so we should clear their tokens (side effect)
	 *   b. Otherwise, the user is signed in, so return the auth state
	 * 3. If the user doesn't have tokens, but they have a `GU_U` cookie, they are "maybe" signed in
	 *  a. We can try to get tokens without prompting/redirecting the user for credentials (side effect)
	 * 	b. If no tokens are returned, we clear the `GU_U` cookie, as it is likely invalid (side effect)
	 *  c. If there is an error getting the tokens:
	 *    i. If the error is an `OAuthError` and the error is `login_required`, the user is not signed in, so we clear the `GU_U` cookie, as it is likely invalid (side effect)
	 *    ii. Otherwise, there is an unknown error, so clear any tokens and throw the error
	 * 4. If the user doesn't have tokens or a GU_U cookie, they are not signed in
	 *
	 * @returns `boolean` - `true` if the user is signed in, `false` if not
	 */
	public async isSignedIn(): Promise<boolean> {
		return (await this.isSignedInWithAuthState()).isAuthenticated;
	}
}
