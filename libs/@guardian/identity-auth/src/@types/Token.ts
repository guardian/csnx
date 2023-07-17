// type for using custom claims in the access token or ID token
type CustomClaimValue = string | boolean | number;
// extend this type to add custom claims to the access token or ID token
export type CustomClaims = Record<
	string,
	CustomClaimValue | CustomClaimValue[]
>;

// these are the default custom claims that we add to the access token for all guardian apps
// as long as the scope `openid` and `profile` are requested
type DefaultCustomAccessTokenClaims = {
	email_validated: boolean;
	identity_username: string;
	legacy_identity_id: string;
};

// these are the default custom claims that we add to the ID token for all guardian apps
// as long as the scope `openid` and `profile` are requested
type DefaultCustomIDTokenClaims = {
	identity_username: string;
	legacy_identity_id: string;
	user_groups: string[];
};

/**
 * The claims in an access token.
 *
 * https://developer.okta.com/docs/reference/api/oidc/#reserved-claims-in-the-payload-section
 *
 * We also extend the claims with our own custom claims.
 */
export type AccessTokenClaims<T extends CustomClaims = CustomClaims> = T &
	DefaultCustomAccessTokenClaims & {
		aud: string;
		auth_time: number;
		cid: string;
		exp: number;
		iat: number;
		iss: string;
		jti: string;
		scp: string[];
		sub: string;
		uid: string;
		ver: number;
	};

/**
 * The claims in an ID token.
 *
 * https://developer.okta.com/docs/reference/api/oidc/#claims-in-the-payload-section
 *
 * We also extend the claims with our own custom claims.
 */
export type IDTokenClaims<T extends CustomClaims = CustomClaims> = T &
	DefaultCustomIDTokenClaims & {
		amr: string[];
		at_hash: string;
		aud: string;
		auth_time: number;
		exp: number;
		iat: number;
		idp: string;
		iss: string;
		jti: string;
		name: string;
		nonce: string;
		sub: string;
		ver: number;
	};

// set up a partial type for the claims in the access token and ID token
export type UserClaims = Partial<AccessTokenClaims & IDTokenClaims>;

/**
 * The header of a JWT.
 *
 * https://developer.okta.com/docs/reference/api/oidc/#reserved-claims-in-the-header-section
 * https://developer.okta.com/docs/reference/api/oidc/#claims-in-the-header-section
 */
export interface JWTHeader {
	alg: string;
	kid: string;
}

/**
 * The payload of a JWT.
 *
 * Set up as a partial type so that we can use it for the access token and ID token, as we don't
 * know exactly which claims will be in each, and will be returned from the server, until we
 * validate and decode the token.
 */
export type JWTPayload<T extends CustomClaims = CustomClaims> = UserClaims &
	T & {
		scp?: string[];
	};

/**
 * A JWT (JSON Web Token)
 */
export interface JWTObject<T extends CustomClaims = CustomClaims> {
	header: JWTHeader;
	payload: JWTPayload<T>;
	signature: string;
}

// Shared types for the access token and ID token
interface AbstractToken {
	expiresAt: number;
	scopes: string[];
	clockSkew: number; // in seconds, determines the drift between the client and server
}

/**
 * The access token object.
 */
export type AccessToken<T extends CustomClaims = CustomClaims> =
	AbstractToken & {
		accessToken: string;
		claims: AccessTokenClaims<T>;
		tokenType: string;
	};

/**
 * The ID token object.
 */
export type IDToken<T extends CustomClaims = CustomClaims> = AbstractToken & {
	idToken: string;
	claims: IDTokenClaims<T>;
	issuer: string;
	clientId: string;
	nonce: string;
};

/**
 * The tokens object, containing the access token and ID token.
 */
export type Tokens<
	AC extends CustomClaims = CustomClaims,
	IC extends CustomClaims = CustomClaims,
> = {
	accessToken: AccessToken<AC>;
	idToken: IDToken<IC>;
};

// valid token types, currently only `accessToken` and `idToken`
export type TokenType = keyof Tokens;

/**
 * Type used in the response from certain SDK methods, containing the tokens and the state (/authorize param)
 */
export type TokenResponse<
	AC extends CustomClaims = CustomClaims,
	IC extends CustomClaims = CustomClaims,
> = {
	tokens: Tokens<AC, IC>;
	state: string;
};

/**
 * A JSON Web Key (JWK) as returned from the JWKS endpoint.
 */
export interface JWK {
	alg: string;
	e: string;
	kid: string;
	kty: string;
	n: string;
	use: string;
}

/**
 * Response from the JWKS endpoint.
 */
export interface JWKS {
	keys: JWK[];
}
