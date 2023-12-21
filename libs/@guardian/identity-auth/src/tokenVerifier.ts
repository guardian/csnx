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
	audience: string;
	scopes?: string[];
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
	async #decodeAndVerifyToken<T extends CustomClaims = CustomClaims>(
		token: string,
	): Promise<JWTObject<T>> {
		const decodedToken = decodeToken<T>(token);
		await verifySignature(this.#oauthUrls.keysUrl, decodedToken, token);
		return decodedToken;
	}

	/**
	 * Verify an OAuth access token
	 *
	 * For any access token to be valid, the following are asserted:
	 * - Signature is valid (the token was signed by a private key which has a corresponding public key in the JWKS response from the authorization server).
	 * - Access token is not expired (requires local system time to be in sync with Okta, checks the exp claim of the access token).
	 * - The aud claim matches any expected aud claim passed to verifyAccessToken().
	 * - The iss claim matches the issuer the verifier is constructed with.
	 * - The cid claim matches the client ID the verifier is constructed with.
	 * - Any custom claim assertions that you add are confirmed
	 */
	public async verifyAccessToken<T extends CustomClaims = CustomClaims>({
		accessToken,
		audience,
		scopes,
	}: AccessTokenVerifierParams): Promise<JWTObject<AccessTokenClaims<T>>> {
		const decodedToken =
			await this.#decodeAndVerifyToken<AccessTokenClaims<T>>(accessToken);

		genericVerifyAccessTokenClaims({
			claims: decodedToken.payload,
			audience,
			issuer: this.#options.issuer,
			clientId: this.#options.clientId,
		});

		// Check that all scopes in scopes array (if it exists) are present in the token
		if (scopes && scopes.length > 0) {
			const everyScopeExists = scopes.every((scope) =>
				decodedToken.payload.scp.includes(scope),
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
			const hasSecureScopes = scopes.some((scope) => scope.endsWith('.secure'));

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
			nonce,
			clientId: this.#options.clientId,
			issuer: this.#options.issuer,
		});

		return decodedToken;
	}
}
