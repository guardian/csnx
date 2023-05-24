import { getCookie } from '../cookies/getCookie';
import type {
	IdentityAuthOptions,
	IdentityAuthState,
	OAuthUrls,
} from './@types/OAuth';
import { AuthStateManager } from './authState';
import { Emitter } from './emitter';
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
export class IdentityAuth {
	private options: IdentityAuthOptions;
	private oauthUrls: OAuthUrls;
	private emitter: Emitter;

	public tokenManager: TokenManager;
	public token: Token;
	public authStateManager: AuthStateManager;

	constructor(options: IdentityAuthOptions) {
		this.options = options;
		this.oauthUrls = {
			authorizeUrl: `${this.options.issuer}/v1/authorize`,
			tokenUrl: `${this.options.issuer}/v1/token`,
		};

		this.emitter = new Emitter();
		this.token = new Token(this.options, this.oauthUrls);
		this.tokenManager = new TokenManager(this.emitter, this.token);
		this.authStateManager = new AuthStateManager(
			this.emitter,
			this.tokenManager,
		);
	}

	/**
	 * @name isSignedInWithAuthState
	 * @description Checks if the user is signed in, and updates the auth state as necessary, returns the current auth state
	 *
	 * This performs side effects.
	 *
	 * 1. If the user has a GU_SO cookie, they have recently signed out, so we should clear their tokens (side effect)
	 * 2. If user tokens already exist, they are signed in
	 * 3. If the user doesn't have tokens, but they have a GU_U cookie, they are "maybe" signed in
	 *   a. We can try to get tokens without prompting/redirecting the user for credentials (side effect)
	 * 4. If the user doesn't have tokens or a GU_U cookie, they are not signed in
	 *
	 * @returns `AuthState` - Returns the current authentication state
	 */
	public async isSignedInWithAuthState(): Promise<IdentityAuthState> {
		try {
			// if the user has a GU_SO cookie, they have recently signed out, so we should clear their tokens
			// the GU_SO cookie will be automatically cleared when the user signs back in
			if (getCookie({ name: 'GU_SO', shouldMemoize: true })) {
				this.tokenManager.clear();
				return {
					isAuthenticated: false,
				};
			}

			// if user tokens already exist, they are signed in
			const authState = this.authStateManager.getAuthState();
			if (
				authState?.isAuthenticated &&
				authState.accessToken &&
				authState.idToken
			) {
				// validate the id token and access token to make sure auth state is still valid
				await this.token.verifyToken(authState.idToken, authState.accessToken);

				// if the id token is valid, return the auth state
				return authState;
			}

			// if the user doesn't have tokens, but they have a GU_U cookie, they are "maybe" signed in
			// we can try to get tokens without prompting/redirecting the user for credentials
			// it will error if the user is not signed in
			// if testing on localhost, you will need to set the GU_U cookie manually
			if (getCookie({ name: 'GU_U', shouldMemoize: true })) {
				const tokens = await this.tokenManager.getTokens({
					refreshIfRequired: true,
				});
				return {
					accessToken: tokens?.accessToken,
					idToken: tokens?.idToken,
					isAuthenticated: true,
				};
			}

			// if the user doesn't have tokens or a GU_U cookie, they are not signed in
			return {
				isAuthenticated: false,
			};
		} catch (error) {
			// clear tokens if there is an error, which updates the auth state
			this.tokenManager.clear();
			throw error;
		}
	}

	/**
	 * @name isSignedIn
	 * @description Checks if the user is signed in, and updates the auth state as necessary, returns boolean
	 *
	 * This performs side effects.
	 *
	 * 1. If the user has a GU_SO cookie, they have recently signed out, so we should clear their tokens (side effect)
	 * 2. If user tokens already exist, they are signed in
	 * 3. If the user doesn't have tokens, but they have a GU_U cookie, they are "maybe" signed in
	 *   a. We can try to get tokens without prompting/redirecting the user for credentials (side effect)
	 * 4. If the user doesn't have tokens or a GU_U cookie, they are not signed in
	 *
	 * @returns `boolean` - `true` if the user is signed in, `false` if not
	 */
	public async isSignedIn(): Promise<boolean> {
		return (await this.isSignedInWithAuthState()).isAuthenticated;
	}
}
