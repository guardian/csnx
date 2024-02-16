import type { OAuthUrls, ProfileUrl } from './@types/OAuth';
import type {
	AccessTokenClaims,
	CustomClaims,
	IDTokenClaims,
	JWTObject,
} from './@types/Token';
import { OAuthError } from './error';
import {
	decodeToken,
	genericVerifyAccessTokenClaims,
	genericVerifyIdTokenClaims,
	verifySignature,
} from './lib/token';

interface TokenVerifierOptions {
	issuer: `${ProfileUrl}/oauth2/${string}`;
	audience: string;
	clientId?: string;
}

interface AccessTokenVerifierParams {
	accessToken: string;
	expectedAudience: string;
	expectedScopes?: string[];
}

interface IdTokenVerifierParams {
	idToken: string;
	nonce?: string;
}

export class TokenVerifier {
	#options: TokenVerifierOptions;
	#oauthUrls: Pick<OAuthUrls, 'keysUrl' | 'userinfoUrl'>;

	constructor(options: TokenVerifierOptions) {
		this.#options = options;
		this.#oauthUrls = {
			keysUrl: `${this.#options.issuer}/v1/keys`,
			userinfoUrl: `${this.#options.issuer}/v1/userinfo`,
		};
	}

	/**
	 * @name decodeAndVerifyToken
	 * @description First, attempts to decode the token. Then verifies the signature is valid.
	 * @param token - The token to decode and verify
	 * @returns The decoded and verified token
	 */
	async #decodeAndVerifyToken<T extends CustomClaims = CustomClaims>(
		token: string,
	): Promise<JWTObject<T>> {
		const decodedToken = decodeToken<T>(token);
		await verifySignature(this.#oauthUrls.keysUrl, decodedToken, token);
		return decodedToken;
	}

	/**
	 * @name verifyAccessToken
	 * @description Verify an OAuth access token
	 * For any access token to be valid, the following are asserted:
	 * - Signature is valid (the token was signed by a private key which has a corresponding public key in the JWKS response from the authorization server).
	 * - Access token is not expired (requires local system time to be in sync with Okta, checks the exp claim of the access token).
	 * - The aud claim matches any expected aud claim passed to verifyAccessToken().
	 * - The iss claim matches the issuer the verifier is constructed with.
	 * - The cid claim matches the client ID the verifier is constructed with.
	 * - The token has all the required scopes (if any are passed to verifyAccessToken()).
	 * - If secure scopes are passed in, a server-side check is performed.
	 * - Any custom claim assertions that you add are confirmed
	 * @param accessToken - The access token to verify
	 * @param expectedAudience - The expected aud claim of the access token
	 * @param expectedScopes - The expected scopes of the access token
	 * @returns The decoded and verified access token
	 */
	public async verifyAccessToken<T extends CustomClaims = CustomClaims>({
		accessToken,
		expectedAudience,
		expectedScopes,
	}: AccessTokenVerifierParams): Promise<JWTObject<AccessTokenClaims<T>>> {
		const decodedToken =
			await this.#decodeAndVerifyToken<AccessTokenClaims<T>>(accessToken);

		genericVerifyAccessTokenClaims({
			claims: decodedToken.payload,
			expectedAudience,
			expectedIssuer: this.#options.issuer,
			expectedClientId: this.#options.clientId,
		});

		// Check that all scopes in scopes array (if it exists) are present in the token
		if (expectedScopes && expectedScopes.length > 0) {
			const everyScopeExists = expectedScopes.every((expectedScope) =>
				decodedToken.payload.scp.includes(expectedScope),
			);

			if (!everyScopeExists) {
				throw new OAuthError({
					error: 'invalid_token',
					error_description: 'Token is missing required scopes',
					message: 'Token is missing required scopes',
				});
			}

			// If any of the scopes passed in end with '.secure', perform the serverside check
			// using the userinfo endpoint from the options
			const hasSecureScopes = expectedScopes.some((expectedScope) =>
				expectedScope.endsWith('.secure'),
			);

			if (hasSecureScopes) {
				try {
					const userInfoResponse = await fetch(this.#oauthUrls.userinfoUrl, {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					});

					if (!userInfoResponse.ok) {
						const wwwAuthenticateHeader =
							userInfoResponse.headers.get('WWW-Authenticate');
						const errorMatch =
							wwwAuthenticateHeader?.match(/error="(.*?)"/)?.[0];
						const errorDescriptionMatch = wwwAuthenticateHeader?.match(
							/error_description="(.*?)"/,
						)?.[0];
						throw new OAuthError({
							error: errorMatch ?? 'invalid_token',
							error_description:
								errorDescriptionMatch ?? 'Unexpected error validating token',
							message:
								errorDescriptionMatch ?? 'Unexpected error validating token',
						});
					}
				} catch (error) {
					throw new OAuthError({
						error: 'invalid_token',
						error_description: 'Unexpected error validating token',
						message: 'Unexpected error validating token',
					});
				}
			}
		}

		return decodedToken;
	}

	/**
	 * @name verifyIdToken
	 * @description Verify an OAuth ID token
	 * For any ID token to be valid, the following are asserted:
	 * - Signature is valid (the token was signed by a private key which has a corresponding public key in the JWKS response from the authorization server).
	 * - ID token is not expired (requires local system time to be in sync with Okta, checks the exp claim of the ID token).
	 * - The aud claim matches the client ID the verifier is constructed with.
	 * - The iss claim matches the issuer the verifier is constructed with.
	 * - The nonce claim matches the nonce passed to verifyIdToken().
	 * @param idToken - The ID token to verify
	 * @param nonce - The nonce to verify
	 * @returns The decoded and verified ID token
	 */
	public async verifyIdToken<T extends CustomClaims = CustomClaims>({
		idToken,
		nonce,
	}: IdTokenVerifierParams): Promise<JWTObject<IDTokenClaims<T>>> {
		if (!this.#options.clientId) {
			throw new OAuthError({
				error: 'invalid_token',
				error_description: 'Client ID is required to verify ID token',
				message: 'Client ID is required to verify ID token',
			});
		}

		const decodedToken =
			await this.#decodeAndVerifyToken<IDTokenClaims<T>>(idToken);

		genericVerifyIdTokenClaims({
			claims: decodedToken.payload,
			expectedNonce: nonce,
			expectedClientId: this.#options.clientId,
			expectedIssuer: this.#options.issuer,
		});

		return decodedToken;
	}
}
