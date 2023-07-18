/* eslint-disable @typescript-eslint/no-unnecessary-condition -- we're doing type guards on two different types */

import { isNonNullable } from '@guardian/libs';
import type {
	AuthorizeParams,
	OAuthAuthorizeResponse,
	OAuthAuthorizeResponseError,
	OAuthTokenResponse,
	OAuthTokenResponseError,
	OAuthUrls,
	RequiredIdentityAuthOptions,
	TokenParams,
} from './@types/OAuth';
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
	TokenResponse,
	Tokens,
} from './@types/Token';
import {
	base64UrlEncode,
	base64UrlToString,
	generateCodeChallenge,
	generateCodeVerifier,
	generateSha256Hash,
	getRandomString,
	stringToBuffer,
} from './crypto';
import { OAuthError } from './error';

/**
 * @name isAccessTokenClaims
 * @description Type guard for AccessTokenClaims
 *
 * @param claims - the claims to check
 * @returns	{boolean} - true if claims is an AccessTokenClaims object
 */
const isAccessTokenClaims = (claims: unknown): claims is AccessTokenClaims => {
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
 * @name isIDTokenClaims
 * @description Type guard for IDTokenClaims
 *
 * @param claims - the claims to check
 * @returns	{boolean} - true if claims is an IDTokenClaims object
 */
const isIDTokenClaims = (claims: unknown): claims is IDTokenClaims => {
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
 * @name isOAuthAuthorizeResponseError
 * @description Type guard for OAuthAuthorizeResponseError
 *
 * Determines if the response is an OAuthAuthorizeResponseError,
 * i.e if it has the error, error_description and state properties
 *
 * @param response OAuthAuthorizeResponse | OAuthAuthorizeResponseError
 * @returns boolean - true if the response is an OAuthAuthorizeResponseError
 */
const isOAuthAuthorizeResponseError = (
	response: OAuthAuthorizeResponse | OAuthAuthorizeResponseError,
): response is OAuthAuthorizeResponseError => {
	const maybeResponse = response as OAuthAuthorizeResponseError;
	return (
		isNonNullable(maybeResponse) &&
		maybeResponse.error !== undefined &&
		maybeResponse.error_description !== undefined &&
		maybeResponse.state !== undefined
	);
};

/**
 * @name isOAuthTokenResponseError
 * @description Type guard for OAuthTokenResponseError
 *
 * Determines if the response is an OAuthTokenResponseError,
 * i.e if it has the error and error_description properties
 *
 * @param response OAuthTokenResponse | OAuthTokenResponseError
 * @returns boolean - true if the response is an OAuthTokenResponseError
 */
const isOAuthTokenResponseError = (
	response: OAuthTokenResponse | OAuthTokenResponseError,
): response is OAuthTokenResponseError => {
	const maybeResponse = response as OAuthTokenResponseError;
	return (
		isNonNullable(maybeResponse) &&
		maybeResponse.error !== undefined &&
		maybeResponse.error_description !== undefined
	);
};

/**
 * @name decodeToken
 * @description Decodes a JWT token into its parts, i.e header, payload and signature
 *
 * @param token `string` - JWT token
 * @returns JWTObject - object containing the decoded token parts
 */
const decodeToken = <T extends CustomClaims = CustomClaims>(
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
 * @name decodeTokens
 * @description Decodes the access and ID tokens, returning the decoded claims, without verifying the tokens
 *
 * @param accessToken - Raw access token string to decode
 * @param idToken - Raw ID token string to decode
 * @param nonce - Nonce used when generating the tokens
 *
 * @returns Tokens - decoded access and ID tokens
 */
const decodeTokens = <
	AC extends CustomClaims = CustomClaims,
	IC extends CustomClaims = CustomClaims,
>({
	accessTokenRaw,
	idTokenRaw,
	nonce,
	options,
}: {
	accessTokenRaw: string;
	idTokenRaw: string;
	nonce: string;
	options: RequiredIdentityAuthOptions;
}): Tokens<AC, IC> => {
	// get the current time in seconds
	const now = Math.floor(Date.now() / 1000);

	// decode the access tokens
	const decodedAccessToken = decodeToken<AC>(accessTokenRaw);

	// get the access token claims, not type validated
	const accessTokenPayload = decodedAccessToken.payload;

	// validate the type of access token claims
	if (!isAccessTokenClaims(accessTokenPayload)) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Invalid access token claims',
			message: 'Invalid access token claims',
		});
	}

	// calculate the clock skew (difference between local and server time) using the iat claim
	const accessTokenClockSkew = now - accessTokenPayload.iat;

	// if the clock skew is greater than maxClockSkew (default 5 mins), throw an error, as this is likely a replay attack
	if (Math.abs(accessTokenClockSkew) > options.maxClockSkew) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Invalid Access token',
			message: 'Clock skew too large',
		});
	}

	// construct the access token
	const accessToken: AccessToken<AC> = {
		accessToken: accessTokenRaw,
		claims: accessTokenPayload,
		expiresAt: accessTokenPayload.exp - accessTokenPayload.iat + now, // adjusting expiresAt to be in local (machine) time, to account for clock skew, // adjusted to local (machine) time, to account for clock skew
		clockSkew: accessTokenClockSkew,
		tokenType: 'Bearer',
		scopes: accessTokenPayload.scp,
	};

	// validate the type of the access token
	if (!isAccessToken(accessToken)) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Invalid access token',
			message: 'Invalid access token',
		});
	}

	// decode the ID token
	const decodedIDToken = decodeToken<IC>(idTokenRaw);

	// get the id token claims, not type validated
	const idTokenPayload = decodedIDToken.payload;

	// validate the type of the ID token claims
	if (!isIDTokenClaims(idTokenPayload)) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Invalid ID token claims',
			message: 'Invalid ID token claims',
		});
	}

	// calculate the clock skew (difference between local and server time) using the iat claim
	const idTokenClockSkew = now - idTokenPayload.iat;

	// if the clock skew is greater than maxClockSkew (default 5 mins), throw an error, as this is likely a replay attack
	if (Math.abs(idTokenClockSkew) > options.maxClockSkew) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Invalid ID token',
			message: 'Clock skew too large',
		});
	}

	// construct the ID token
	const idToken: IDToken<IC> = {
		idToken: idTokenRaw,
		issuer: options.issuer,
		clientId: options.clientId,
		claims: idTokenPayload,
		expiresAt: idTokenPayload.exp - idTokenPayload.iat + now, // adjusting expiresAt to be in local (machine) time, to account for clock skew
		clockSkew: idTokenClockSkew,
		scopes: options.scopes,
		nonce: nonce,
	};

	// validate the type of the ID token
	if (!isIDToken(idToken)) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Invalid ID token',
			message: 'Invalid ID token',
		});
	}

	return {
		accessToken,
		idToken,
	};
};

/**
 * @name verifyIdTokenClaims
 * @description Verifies the claims of an ID token are valid and expected
 *
 * @param decoded - decoded ID token
 * @param claims - ID token claims
 * @param options - RequiredIdentityAuthOptions
 *
 * @throws Error - if the claims are invalid
 * @returns void
 */
export const verifyIdTokenClaims = (
	decoded: IDToken,
	claims: JWTPayload,
	options: RequiredIdentityAuthOptions,
): void => {
	// get the local time in seconds
	const localTime = Math.floor(Date.now() / 1000);

	// calculate the normalised time, which takes into account clock skew
	const normalisedTime = localTime - decoded.clockSkew;

	// check the nonce is valid
	if (claims.nonce !== decoded.nonce) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Invalid nonce in ID token',
			message: 'Invalid nonce in ID token',
		});
	}

	// check the issuer is the one configured in the options
	if (claims.iss !== options.issuer) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Invalid issuer in ID token',
			message: 'Invalid issuer in ID token',
		});
	}

	// check the audience is the one configured in the options (clientId)
	if (claims.aud !== options.clientId) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Invalid audience in ID token',
			message: 'Invalid audience in ID token',
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

	// check the token wasn't issued in the future
	if (claims.iat > normalisedTime) {
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Token was issued in the future',
			message: 'Token was issued in the future',
		});
	}
};

/**
 * @name verifyAccessTokenWithAtHash
 * @description Verifies the access token with the id token at_hash claim
 *
 * @param at_hash - at_hash claim from the id token
 * @param access_token - access token to verify
 * @returns Promise<void> - resolves if the access token is valid, rejects if not
 */
export const verifyAccessTokenWithAtHash = async (
	at_hash: string,
	access_token: string,
): Promise<void> => {
	// verify the access token with the id token at_hash claim
	// generate the access token hash
	const accessTokenHash = await generateSha256Hash(access_token);

	// take the first 128 bits of the hash (the first half)
	const accessTokenHash128 = accessTokenHash.substring(0, 16);

	// convert the hash to a base64url string
	const accessTokenHashBase64 = base64UrlEncode(accessTokenHash128);

	// compare the hash with the at_hash claim
	// if they don't match, the token is invalid
	if (accessTokenHashBase64 !== at_hash) {
		// throw an error
		throw new OAuthError({
			error: 'invalid_token',
			error_description: 'Invalid token',
			message: 'The access token hash does not match the at_hash claim',
		});
	}
	// if they do match, the token is valid, return void
	return;
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
	const jwks = (await jwksResponse.json()) as JWKS;

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
		hash: { name: 'SHA-256' },
	};

	// import the public key using the jwk format
	const publicKey = await window.crypto.subtle.importKey(
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
	const isValid = await window.crypto.subtle.verify(
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

/**
 * @name verifyAccessTokenTimestamps
 * @description Verifies the timestamps of an access token, used to determine if both the access token and ID token are valid
 *
 * We validate the access token token timestamps rather than the ID token timestamps, because the ID token in Okta is only valid for
 * 1 hour with no way to change this, whereas the access token can be valid anywhere from 5 minutes to 24 hours, so we use the access token
 * timestamps to determine if the tokens are valid.
 *
 * @param decoded - the decoded access token object
 * @param claims - the jwt payload from the access token
 * @returns void - resolves if the access token timestamps are valid, rejects if not
 */
export const verifyAccessTokenTimestamps = (
	decoded: AccessToken,
	claims: JWTPayload,
) => {
	// get the local time in seconds
	const localTime = Math.floor(Date.now() / 1000);

	// calculate the normalised time, which takes into account clock skew
	const normalisedTime = localTime - decoded.clockSkew;

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
	if (normalisedTime > claims.exp) {
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
			error_description: 'Token was issued in the future',
			message: 'Token was issued in the future',
		});
	}
};

/**
 * @name addPostMessageListener
 * @description Adds a postMessage listener to the window to listen for the response from the authorization server when performing the Authorization Code Flow with PKCE in an iframe
 *
 * @param opts - RequiredIdentityAuthOptions
 * @param state - state to match the response
 * @param timeout - timeout in milliseconds, defaults to 12000 (12 seconds)
 * @returns Promise<OAuthAuthorizeResponse | OAuthAuthorizeResponseError> - resolves with the response from the authorization server
 */
export const addPostMessageListener = (
	opts: RequiredIdentityAuthOptions,
	state: string,
	timeout = 12000,
) => {
	// setup the response handler variable
	let responseHandler: (
		e: MessageEvent<OAuthAuthorizeResponse | OAuthAuthorizeResponseError>,
	) => void;

	// setup the timeout id variable to clear the timeout
	let timeoutId: number;

	// create a promise that resolves when the message is received or rejects when the timeout is reached
	const msgReceivedOrTimeout: Promise<
		OAuthAuthorizeResponse | OAuthAuthorizeResponseError
	> = new Promise((resolve, reject) => {
		// create the response handler
		responseHandler = (e) => {
			// check the message is for us, i.e the state matches
			if (e.data.state !== state) {
				return;
			}

			// check the message is from the correct origin, i.e the issuer
			if (e.origin !== opts.issuer.split('/oauth2/')[0]) {
				return reject(
					new OAuthError({
						error: 'invalid_origin',
						error_description: 'Invalid origin',
						message: 'The request does not originate from the issuer',
					}),
				);
			}

			// resolve the promise with the response
			return resolve(e.data);
		};

		// add the response handler to the window
		window.addEventListener('message', responseHandler);

		// set the timeout
		timeoutId = window.setTimeout(() => {
			// reject the promise with a timeout error if the timeout is reached
			return reject(
				new OAuthError({
					error: 'timeout',
					error_description: 'Timeout',
					message: 'The oauth request timed out',
				}),
			);
		}, timeout);
	});

	// return the promise, clearing the timeout and removing the event listener when the promise resolves
	return msgReceivedOrTimeout.finally(() => {
		window.clearTimeout(timeoutId);
		window.removeEventListener('message', responseHandler);
	});
};

/**
 * @name loadFrame
 * @description Loads a hidden iframe with the given url
 *
 * @param url - url to load in the iframe
 * @returns	HTMLIFrameElement - the iframe element
 */
export const loadFrame = (url: string) => {
	const frame = document.createElement('iframe');
	frame.style.display = 'none';
	frame.src = url;

	return document.body.appendChild(frame);
};

/**
 * @name performAuthCodeFlowIframe
 * @description Performs the authorization code flow with PKCE using an iframe, and returns the AuthorizationResponse
 *
 * @param authorizeParams - AuthorizeParams
 * @param options - RequiredIdentityAuthOptions
 * @param oauthUrls - OAuthUrls
 * @returns OAuthAuthorizeResponse | OAuthAuthorizeResponseError - resolves with the AuthorizationResponse
 */
export const performAuthCodeFlowIframe = async (
	authorizeParams: AuthorizeParams,
	options: RequiredIdentityAuthOptions,
	oauthUrls: OAuthUrls,
): Promise<OAuthAuthorizeResponse | OAuthAuthorizeResponseError> => {
	// convert the authorize params to a query string
	const searchParams = new URLSearchParams(authorizeParams);

	// create the postMessage listener for the iframe
	const postMessageListener = addPostMessageListener(
		options,
		authorizeParams.state,
	);
	// load the iframe with the authorize url
	const iframe = loadFrame(
		`${oauthUrls.authorizeUrl}?${searchParams.toString()}`,
	);

	// wait for the postMessage listener to resolve
	const authorizeResponse = await postMessageListener.finally(() => {
		if (document.body.contains(iframe)) {
			document.body.removeChild(iframe);
		}
	});

	return authorizeResponse;
};

// memoized verify token map
const memoizedVerifyTokens = new Map<string, unknown>();

/**
 * @name verifyTokens
 * @description Verifies the ID token, checking the signature and claims, and verifies the access token using the at_hash claim
 *
 * @param idToken - IDToken
 * @param accessToken - AccessToken
 * @param options - RequiredIdentityAuthOptions
 * @returns Promise<void> - resolves when the token is verified
 */
export const verifyTokens = async (
	idToken: IDToken,
	accessToken: AccessToken,
	options: RequiredIdentityAuthOptions,
	oauthUrls: OAuthUrls,
) => {
	// check if the token has already been verified
	if (memoizedVerifyTokens.has(idToken.claims.jti)) {
		// get the memoized value
		const memoized = memoizedVerifyTokens.get(idToken.claims.jti);

		// if the memoized value is true, return, already verified
		if (memoized === true) {
			return;
		}

		// otherwise the memoized value is an error, throw the error
		throw memoized;
	}

	try {
		// decode the token
		const idTokenJWT = decodeToken(idToken.idToken);

		// verify the claims
		verifyIdTokenClaims(idToken, idTokenJWT.payload, options);

		// verify the signature
		await verifySignature(oauthUrls.keysUrl, idTokenJWT, idToken.idToken);

		// verify the access token using the at_hash claim
		await verifyAccessTokenWithAtHash(
			idToken.claims.at_hash,
			accessToken.accessToken,
		);

		const accessTokenJWT = decodeToken(accessToken.accessToken);

		// verify access token timestamps
		verifyAccessTokenTimestamps(accessToken, accessTokenJWT.payload);

		// if successful, memoize the token
		memoizedVerifyTokens.set(idToken.claims.jti, true);
	} catch (error) {
		// if there is an error, memoize the error
		memoizedVerifyTokens.set(idToken.claims.jti, error);

		// throw the error
		throw error;
	}
};

/**
 * @name exchangeCodeForTokens
 * @description Exchanges the authorization code for tokens using the OAuth token endpoint
 *
 * @param code - authorization code
 * @param codeVerifier - code verifier used to generate the code challenge
 * @param options - RequiredIdentityAuthOptions
 * @param oauthUrls - OAuthUrls
 * @returns Promise<OAuthTokenResponse> - resolves with the response from the authorization server
 */
export const exchangeCodeForTokens = async (
	code: string,
	codeVerifier: string,
	options: RequiredIdentityAuthOptions,
	oauthUrls: OAuthUrls,
): Promise<OAuthTokenResponse | OAuthTokenResponseError> => {
	// create the token params
	// https://developer.okta.com/docs/reference/api/oidc/#token
	const tokenParams: TokenParams = {
		client_id: options.clientId,
		code,
		code_verifier: codeVerifier,
		grant_type: 'authorization_code',
		redirect_uri: options.redirectUri,
	};

	// make the request to the token endpoint
	const response = await fetch(oauthUrls.tokenUrl, {
		method: 'POST',
		body: new URLSearchParams(tokenParams),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});

	return response.json() as Promise<
		OAuthTokenResponse | OAuthTokenResponseError
	>;
};

/**
 * @name handleOAuthResponse
 * @description Handles the response from the token endpoint, verifying the ID token and returning the access and ID tokens
 *
 * @param oauthTokenResponse - response from the token endpoint
 * @param authorizeParams - params used to generate the authorization request (/authorize)
 * @returns Promise<TokenResponse> - resolves with the access and ID tokens
 */
export const handleOAuthResponse = async <
	AC extends CustomClaims = CustomClaims,
	IC extends CustomClaims = CustomClaims,
>(
	oauthTokenResponse: OAuthTokenResponse,
	authorizeParams: AuthorizeParams,
	options: RequiredIdentityAuthOptions,
	oauthUrls: OAuthUrls,
): Promise<TokenResponse<AC, IC>> => {
	// destructure the response
	const { access_token, id_token } = oauthTokenResponse;

	// decode the tokens
	const { accessToken, idToken } = decodeTokens<AC, IC>({
		accessTokenRaw: access_token,
		idTokenRaw: id_token,
		nonce: authorizeParams.nonce,
		options,
	});

	// verify the tokens
	await verifyTokens(idToken, accessToken, options, oauthUrls);

	// return the tokens
	return {
		state: authorizeParams.state,
		tokens: {
			accessToken,
			idToken,
		},
	};
};

/**
 * @class Token
 * @description Class for performing the Authorization Code Flow with PKCE, exchanging the authorization code for tokens and verifying the ID token
 */
export class Token<
	AC extends CustomClaims = CustomClaims,
	IC extends CustomClaims = CustomClaims,
> {
	#options: RequiredIdentityAuthOptions;
	#oauthUrls: OAuthUrls;

	// holder if there is currently a get token flow in progress
	#getTokensInProgress: Promise<TokenResponse<AC, IC>> | undefined;

	constructor(options: RequiredIdentityAuthOptions, oauthUrls: OAuthUrls) {
		this.#options = options;
		this.#oauthUrls = oauthUrls;
		this.#getTokensInProgress = undefined;
	}

	#exchangeCodeForTokens = (
		code: string,
		codeVerifier: string,
	): Promise<OAuthTokenResponse | OAuthTokenResponseError> =>
		exchangeCodeForTokens(code, codeVerifier, this.#options, this.#oauthUrls);

	#handleOAuthResponse = (
		oauthTokenResponse: OAuthTokenResponse,
		authorizeParams: AuthorizeParams,
	): Promise<TokenResponse<AC, IC>> =>
		handleOAuthResponse<AC, IC>(
			oauthTokenResponse,
			authorizeParams,
			this.#options,
			this.#oauthUrls,
		);

	#performAuthCodeFlowIframe = (
		authorizeParams: AuthorizeParams,
	): Promise<OAuthAuthorizeResponse | OAuthAuthorizeResponseError> =>
		performAuthCodeFlowIframe(authorizeParams, this.#options, this.#oauthUrls);

	/**
	 * @name getWithoutPrompt
	 * @description Performs the Authorization Code Flow with PKCE, exchanging the authorization code for tokens and verifying the ID token, without prompting the user and using a hidden iframe
	 * @returns Promise<TokenResponse> - resolves with the access and ID tokens
	 */
	async #getWithoutPrompt(): Promise<TokenResponse<AC, IC>> {
		// generate the code verifier and code challenge for PKCE
		// see https://www.oauth.com/oauth2-servers/pkce/authorization-request/
		// the `code_verifier` is a cryptographically random string using the characters A-Z, a-z, 0-9
		// the `code_challenge` is the `code_verifier` hashed with SHA-256 and then base64url encoded
		const codeVerifier = generateCodeVerifier();
		const codeChallenge = await generateCodeChallenge(codeVerifier);

		// create the authorize params
		// https://developer.okta.com/docs/reference/api/oidc/#authorize
		const authorizeParams: AuthorizeParams = {
			client_id: this.#options.clientId,
			code_challenge: codeChallenge,
			code_challenge_method: 'S256',
			prompt: 'none',
			nonce: getRandomString(16),
			redirect_uri: this.#options.redirectUri,
			response_type: 'code',
			response_mode: 'okta_post_message',
			scope: this.#options.scopes.join(' '),
			state: getRandomString(42),
		};

		// perform the authorization code flow with PKCE using an iframe
		const authorizeResponse = await this.#performAuthCodeFlowIframe(
			authorizeParams,
		);

		// check for an error response
		if (isOAuthAuthorizeResponseError(authorizeResponse)) {
			throw new OAuthError({
				error: authorizeResponse.error,
				error_description: authorizeResponse.error_description,
				message: `OAuth Authorize Error | ${authorizeResponse.error} | ${authorizeResponse.error_description}`,
			});
		}

		// successful response
		const { code, state } = authorizeResponse;

		// check the state parameter matches
		if (state !== authorizeParams.state) {
			throw new OAuthError({
				error: 'invalid_state',
				error_description: 'Invalid state parameter',
				message: 'Invalid state parameter',
			});
		}

		// exchange the authorization code for tokens
		const tokenResponse = await this.#exchangeCodeForTokens(code, codeVerifier);

		// check for an error response
		if (isOAuthTokenResponseError(tokenResponse)) {
			throw new OAuthError({
				error: tokenResponse.error,
				error_description: tokenResponse.error_description,
				message: `OAuth Token Error | ${tokenResponse.error} | ${tokenResponse.error_description}`,
			});
		}

		// parse the response
		const parsed = await this.#handleOAuthResponse(
			tokenResponse,
			authorizeParams,
		);

		// return the tokens
		return parsed;
	}

	/**
	 * @name getWithoutPrompt
	 * @description Performs the Authorization Code Flow with PKCE, exchanging the authorization code for tokens and verifying the ID token, without prompting the user and using a hidden iframe
	 * @returns Promise<TokenResponse> - resolves with the access and ID tokens
	 */
	public async getWithoutPrompt(): Promise<TokenResponse<AC, IC>> {
		// check if there is already an auth code flow in progress
		if (this.#getTokensInProgress) {
			// return the existing promise
			return this.#getTokensInProgress;
		}

		// create a new promise that clears itself when it resolves
		this.#getTokensInProgress = this.#getWithoutPrompt().finally(() => {
			this.#getTokensInProgress = undefined;
		});

		// return the promise
		return this.#getTokensInProgress;
	}

	/**
	 * @name verifyTokens
	 * @description Verifies the ID token, checking the signature and claims, and verifies the access token using the at_hash claim
	 *
	 * @param idToken - ID token to verify
	 * @param accessToken - Access token to verify
	 * @returns void
	 */
	public async verifyTokens(idToken: IDToken, accessToken: AccessToken) {
		return verifyTokens(idToken, accessToken, this.#options, this.#oauthUrls);
	}

	/**
	 * @name decodeTokens
	 * @description Decodes the access and ID tokens, returning the decoded claims, without verifying the tokens
	 *
	 * @param accessToken - Raw access token string to decode
	 * @param idToken - Raw ID token string to decode
	 * @param nonce - Nonce used when generating the tokens
	 *
	 * @returns Tokens - decoded access and ID tokens
	 */
	public decodeTokens(accessToken: string, idToken: string, nonce: string) {
		return decodeTokens<AC, IC>({
			accessTokenRaw: accessToken,
			idTokenRaw: idToken,
			nonce,
			options: this.#options,
		});
	}
}
