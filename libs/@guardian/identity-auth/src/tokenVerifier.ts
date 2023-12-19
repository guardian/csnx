import type { OAuthUrls, ProfileUrl } from './@types/OAuth';
import { OAuthError } from './error';
import { decodeToken, verifySignature } from './token';

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
	public async verifyAccessToken({
		accessToken,
		audience,
		scopes,
	}: AccessTokenVerifierParams) {
		const decodedToken = await this.#verifyToken(accessToken);

		// get the local time in seconds
		const localTime = Math.floor(Date.now() / 1000);

		// check that the iat (issued at) and exp (expiry) decodedToken.payload are present
		if (!decodedToken.payload.iat || !decodedToken.payload.exp) {
			throw new OAuthError({
				error: 'invalid_token',
				error_description: 'Missing iat or exp claim in access token',
				message: 'Token does not contain required decodedToken.payload',
			});
		}

		// check that the iat isn't after the exp
		if (decodedToken.payload.iat > decodedToken.payload.exp) {
			throw new OAuthError({
				error: 'invalid_token',
				error_description: 'iat claim is after exp claim in access token',
				message: 'Token has expired before it was issued',
			});
		}

		// check the token hasn't expired
		if (localTime > decodedToken.payload.exp) {
			throw new OAuthError({
				error: 'invalid_token',
				error_description: 'Token has expired',
				message: 'Token has expired',
			});
		}

		// check the token wasn't issued in the future
		if (decodedToken.payload.iat > localTime) {
			throw new OAuthError({
				error: 'invalid_token',
				error_description: 'Token was issued in the future',
				message: 'Token was issued in the future',
			});
		}

		// check audience claim
		if (decodedToken.payload.aud !== audience) {
			throw new OAuthError({
				error: 'invalid_token',
				error_description: 'Token audience does not match expected audience',
				message: 'Token audience does not match expected audience',
			});
		}

		// check issuer claim
		if (decodedToken.payload.iss !== this.#options.issuer) {
			throw new OAuthError({
				error: 'invalid_token',
				error_description: 'Token issuer does not match expected issuer',
				message: 'Token issuer does not match expected issuer',
			});
		}

		// check client ID claim (if it exists)
		if (
			this.#options.clientId &&
			decodedToken.payload.cid !== this.#options.clientId
		) {
			throw new OAuthError({
				error: 'invalid_token',
				error_description: 'Token client ID does not match expected client ID',
				message: 'Token client ID does not match expected client ID',
			});
		}

		if (!decodedToken.payload.scp || decodedToken.payload.scp.length === 0) {
			throw new OAuthError({
				error: 'invalid_token',
				error_description: 'Token is missing required scopes',
				message: 'Token is missing required scopes',
			});
		}

		// Check that all scopes in scopes array (if it exists) are present in the token
		if (scopes && scopes.length > 0) {
			const everyScopeExists = scopes.every(
				(scope) => decodedToken.payload.scp?.includes(scope),
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
	}
	public async verifyIdToken({ idToken, nonce }: IdTokenVerifierParams) {
		if (!this.#options.clientId) {
			throw new OAuthError({
				error: 'invalid_token',
				error_description: 'Client ID is required to verify ID token',
				message: 'Client ID is required to verify ID token',
			});
		}

		const decodedToken = await this.#verifyToken(idToken);

		// get the local time in seconds
		const localTime = Math.floor(Date.now() / 1000);

		// aud claim matches clientId
		if (decodedToken.payload.aud !== this.#options.clientId) {
			throw new OAuthError({
				error: 'invalid_token',
				error_description:
					'Token `aud` claim does not match expected `clientId`',
				message: 'Token `aud` claim does not match expected `clientId`',
			});
		}

		// iss claim matches issuer
		if (decodedToken.payload.iss !== this.#options.issuer) {
			throw new OAuthError({
				error: 'invalid_token',
				error_description: 'Token issuer does not match expected issuer',
				message: 'Token issuer does not match expected issuer',
			});
		}

		// nonce claim matches nonce (if it exists)
		if (nonce && decodedToken.payload.nonce !== nonce) {
			throw new OAuthError({
				error: 'invalid_token',
				error_description: 'Token nonce does not match expected nonce',
				message: 'Token nonce does not match expected nonce',
			});
		}

		// check that the iat (issued at) claim is present
		if (!decodedToken.payload.iat) {
			throw new OAuthError({
				error: 'invalid_token',
				error_description: 'Missing iat claim in ID token',
				message: 'Token does not contain required claims',
			});
		}

		// check the token wasn't issued in the future
		if (decodedToken.payload.iat > localTime) {
			throw new OAuthError({
				error: 'invalid_token',
				error_description: 'Token was issued in the future',
				message: 'Token was issued in the future',
			});
		}
	}

	async #verifyToken(token: string) {
		const decodedToken = decodeToken(token);
		await verifySignature(this.#oauthUrls.keysUrl, decodedToken, token);
		return decodedToken;
	}
}
