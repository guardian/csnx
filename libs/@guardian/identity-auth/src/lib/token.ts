/* eslint-disable @typescript-eslint/no-unnecessary-condition -- we're doing type guards on two different types */

import { isNonNullable } from '@guardian/libs';
import type {
	AccessToken,
	AccessTokenClaims,
	CustomClaims,
	IDToken,
	IDTokenClaims,
	JWK,
	JWKS,
	JWTHeader,
	JWTObject,
	JWTPayload,
} from '../@types/Token';
import { base64UrlToString, stringToBuffer } from '../crypto';
import { OAuthError } from '../error';

/**
 * @name isAccessTokenClaims
 * @description Type guard for AccessTokenClaims
 *
 * @param claims - the claims to check
 * @returns	{boolean} - true if claims is an AccessTokenClaims object
 */
export const isAccessTokenClaims = (
	claims: unknown,
): claims is AccessTokenClaims => {
	const maybeClaims = claims as AccessTokenClaims;
	return (
		isNonNullable(maybeClaims) &&
		maybeClaims.aud !== undefined &&
		maybeClaims.auth_time !== undefined &&
		maybeClaims.cid !== undefined &&
		maybeClaims.email_validated !== undefined &&
		maybeClaims.exp !== undefined &&
		maybeClaims.iat !== undefined &&
		maybeClaims.identity_username !== undefined &&
		maybeClaims.iss !== undefined &&
		maybeClaims.jti !== undefined &&
		maybeClaims.legacy_identity_id !== undefined &&
		maybeClaims.scp !== undefined &&
		maybeClaims.sub !== undefined &&
		maybeClaims.uid !== undefined &&
		maybeClaims.ver !== undefined
	);
};

/**
 * @name isIDTokenClaims
 * @description Type guard for IDTokenClaims
 *
 * @param claims - the claims to check
 * @returns	{boolean} - true if claims is an IDTokenClaims object
 */
export const isIDTokenClaims = (claims: unknown): claims is IDTokenClaims => {
	const maybeClaims = claims as IDTokenClaims;
	return (
		isNonNullable(maybeClaims) &&
		maybeClaims.amr !== undefined &&
		maybeClaims.at_hash !== undefined &&
		maybeClaims.aud !== undefined &&
		maybeClaims.auth_time !== undefined &&
		maybeClaims.exp !== undefined &&
		maybeClaims.iat !== undefined &&
		maybeClaims.identity_username !== undefined &&
		maybeClaims.idp !== undefined &&
		maybeClaims.iss !== undefined &&
		maybeClaims.jti !== undefined &&
		maybeClaims.legacy_identity_id !== undefined &&
		maybeClaims.name !== undefined &&
		maybeClaims.nonce !== undefined &&
		maybeClaims.preferred_username !== undefined &&
		maybeClaims.sub !== undefined &&
		maybeClaims.user_groups !== undefined &&
		maybeClaims.ver !== undefined
	);
};

/**
 * @name isAccessToken
 * @description Type guard for AccessToken
 *
 * @param token - the token to check
 * @returns	{boolean} - true if token is an AccessToken object
 */
export const isAccessToken = (token: unknown): token is AccessToken => {
	const maybeToken = token as AccessToken;
	return (
		isNonNullable(maybeToken) &&
		maybeToken.accessToken !== undefined &&
		maybeToken.expiresAt !== undefined &&
		maybeToken.scopes !== undefined &&
		maybeToken.tokenType !== undefined &&
		isAccessTokenClaims(maybeToken.claims)
	);
};

/**
 * @name isIDToken
 * @description Type guard for IDToken
 *
 * @param token - the token to check
 * @returns	{boolean} - true if token is an IDToken object
 */
export const isIDToken = (token: unknown): token is IDToken => {
	const maybeToken = token as IDToken;
	return (
		isNonNullable(maybeToken) &&
		maybeToken.expiresAt !== undefined &&
		maybeToken.idToken !== undefined &&
		maybeToken.scopes !== undefined &&
		isIDTokenClaims(maybeToken.claims)
	);
};

/**
 * @name decodeToken
 * @description Decodes a JWT token into its parts, i.e header, payload and signature
 *
 * @param token `string` - JWT token
 * @returns JWTObject - object containing the decoded token parts
 */
export const decodeToken = <T extends CustomClaims = CustomClaims>(
	token: string,
): JWTObject<T> => {
	// attempt to split the token into its parts
	const [headerStr, payloadStr, signature] = token.split('.');

	try {
		// check that all parts are present
		if (
			headerStr === undefined ||
			payloadStr === undefined ||
			signature === undefined
		) {
			throw 'Missing token parts';
		}

		const header = JSON.parse(base64UrlToString(headerStr)) as JWTHeader;
		const payload = JSON.parse(base64UrlToString(payloadStr)) as JWTPayload<T>;

		// validate the header, all okta oauth tokens have an alg and kid claim
		if (!header.alg || !header.kid) {
			throw 'Missing algorithm in header';
		}

		// validate the payload, all okta oauth tokens have an jti claim
		if (!payload.jti) {
			throw 'Possibly malformed payload';
		}

		return {
			header,
			payload,
			signature,
		};
	} catch (error) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Malformed token',
			message: error as string,
		});
	}
};

/**
 * @name verifySignature
 * @description Verifies the signature of a JWT token
 *
 * Get's the public key from the JWKS endpoint, imports it and verifies the signature
 * of a given JWT token
 *
 * @param issuer
 * @param jwt
 * @param token
 */
export const verifySignature = async (
	jwksUri: string,
	jwt: JWTObject,
	token: string,
): Promise<void> => {
	// fetch the JWKS, okta returns standard cache-control headers, so caching is handled by the browser
	const jwksResponse = await fetch(jwksUri);

	// throw an error if the response isn't ok
	if (!jwksResponse.ok) {
		throw new OAuthError({
			error: 'failed_request',
			error_description: 'Failed to fetch JWKS',
			message: 'Failed to fetch JWKS',
		});
	}

	// parse the JWKS response
	const jwks = (await jwksResponse.json()) as Partial<JWKS>;

	// validate the JWKS, first check that there are keys
	if (!jwks.keys || jwks.keys.length === 0) {
		throw new OAuthError({
			error: 'invalid_jwks',
			error_description: 'No keys found in JWKS',
			message: 'No keys found in JWKS',
		});
	}

	// next loop through the keys and check that they have the required properties
	for (const key of jwks.keys) {
		if (!key.kty || !key.n || !key.e || !key.alg || !key.use || !key.kid) {
			throw new OAuthError({
				error: 'invalid_jwks',
				error_description: 'Invalid key in JWKS',
				message: 'Invalid key in JWKS',
			});
		}
	}

	// find the key that matches the kid in the JWT header
	const key = jwks.keys.find((k: JWK) => k.kid === jwt.header.kid);

	// throw an error if no key was found
	if (key === undefined) {
		throw new OAuthError({
			error: 'invalid_jwks',
			error_description: 'No key found for token in JWKS',
			message: 'No key found for token in JWKS',
		});
	}

	// create the algorithm to use for the verification
	const algorithm: HmacImportParams = {
		name: 'RSASSA-PKCS1-v1_5',
		hash: { name: 'SHAxw-256' },
	};

	// import the public key using the jwk format
	const publicKey = await crypto.subtle.importKey(
		'jwk',
		{
			kty: key.kty,
			n: key.n,
			e: key.e,
			alg: key.alg,
			use: key.use,
		},
		algorithm,
		true,
		['verify'],
	);

	// split the token into it's parts
	const [header, payload, sig] = token.split('.');

	// throw an error if the token is malformed
	if (header === undefined || payload === undefined || sig === undefined) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Malformed token',
			message: 'Malformed token',
		});
	}

	// create the data to verify, i.e the header and payload
	const data = `${header}.${payload}`;

	// verify the signature
	const isValid = await crypto.subtle.verify(
		algorithm,
		publicKey,
		stringToBuffer(base64UrlToString(sig)),
		stringToBuffer(data),
	);

	// throw an error if the signature is invalid
	if (!isValid) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Invalid signature',
			message: 'Invalid signature',
		});
	}
};

interface VerifyIdTokenParams {
	claims: JWTPayload;
	expectedIssuer: string;
	expectedClientId: string;
	expectedNonce?: string;
	clockSkew?: number;
}

export const genericVerifyIdTokenClaims = ({
	claims,
	expectedIssuer,
	expectedClientId,
	expectedNonce,
	clockSkew = 0,
}: VerifyIdTokenParams): void => {
	// get the local time in seconds
	const localTime = Math.floor(Date.now() / 1000);

	// calculate the normalised time, which takes into account clock skew
	const normalisedTime = localTime - clockSkew;

	if (!isIDTokenClaims(claims)) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Token is not an ID token',
			message: 'Token is not an ID token',
		});
	}

	// aud claim matches clientId
	if (claims.aud !== expectedClientId) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Token `aud` claim does not match expected `clientId`',
			message: 'Token `aud` claim does not match expected `clientId`',
		});
	}

	// iss claim matches issuer
	if (claims.iss !== expectedIssuer) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Token issuer does not match expected issuer',
			message: 'Token issuer does not match expected issuer',
		});
	}

	// if the token contains a nonce claim, but no nonce was provided, throw an error
	if (claims.nonce && !expectedNonce) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Token contains nonce but nonce was not provided',
			message: 'Token contains nonce but nonce was not provided',
		});
	}

	// nonce claim matches expected nonce (if it exists)
	if (expectedNonce && claims.nonce !== expectedNonce) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Token nonce does not match expected nonce',
			message: 'Token nonce does not match expected nonce',
		});
	}

	// check that the iat (issued at) claim is present
	if (!claims.iat) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Missing iat claim in ID token',
			message: 'Token does not contain required claims',
		});
	}

	// check that the token wasn't issued in the future
	if (claims.iat > normalisedTime) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Token issued in the future',
			message: 'Token issued in the future',
		});
	}
};

interface VerifyAccessTokenParams {
	claims: JWTPayload;
	expectedAudience: string;
	expectedIssuer: string;
	expectedClientId?: string;
	clockSkew?: number;
}

export const genericVerifyAccessTokenClaims = ({
	claims,
	expectedAudience,
	expectedIssuer,
	expectedClientId,
	clockSkew = 0,
}: VerifyAccessTokenParams): void => {
	// get the local time in seconds
	const localTime = Math.floor(Date.now() / 1000);

	// calculate the normalised time, which takes into account clock skew
	const normalisedTime = localTime - clockSkew;

	if (!isAccessTokenClaims(claims)) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Token is not an access token',
			message: 'Token is not an access token',
		});
	}

	// check that the iat (issued at) and exp (expiry) claims are present
	if (!claims.iat || !claims.exp) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Missing iat or exp claim in access token',
			message: 'Token does not contain required claims',
		});
	}

	// check that the iat isn't after the exp
	if (claims.iat > claims.exp) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'iat claim is after exp claim in access token',
			message: 'Token has expired before it was issued',
		});
	}

	// check the token hasn't expired
	if (claims.exp < normalisedTime) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Token has expired',
			message: 'Token has expired',
		});
	}

	// check the token wasn't issued in the future
	if (claims.iat > normalisedTime) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Token issued in the future',
			message: 'Token issued in the future',
		});
	}

	// check audience claim
	if (claims.aud !== expectedAudience) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Token audience does not match expected audience',
			message: 'Token audience does not match expected audience',
		});
	}

	// check issuer claim
	if (claims.iss !== expectedIssuer) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Token issuer does not match expected issuer',
			message: 'Token issuer does not match expected issuer',
		});
	}

	// check client ID claim (if it exists)
	if (expectedClientId && claims.cid !== expectedClientId) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Token client ID does not match expected client ID',
			message: 'Token client ID does not match expected client ID',
		});
	}

	// check that the token has at least one scope
	if (claims.scp.length === 0) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Token is missing scopes',
			message: 'Token is missing scopes',
		});
	}
};
