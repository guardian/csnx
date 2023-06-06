export type CustomClaimValue = string | boolean | number;
export type CustomClaim = CustomClaimValue | Record<string, CustomClaimValue>;
export type CustomClaims = Record<string, CustomClaim | CustomClaim[]>;

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

export type UserClaims = Partial<AccessTokenClaims & IDTokenClaims>;

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

export interface JWTHeader {
	alg: string;
	kid: string;
}

export type JWTPayload<T extends CustomClaims = CustomClaims> = UserClaims &
	T & {
		scp?: string[];
	};

export interface JWTObject<T extends CustomClaims = CustomClaims> {
	header: JWTHeader;
	payload: JWTPayload<T>;
	signature: string;
}

interface AbstractToken {
	expiresAt: number;
	scopes: string[];
}

export type AccessToken<T extends CustomClaims = CustomClaims> =
	AbstractToken & {
		accessToken: string;
		claims: AccessTokenClaims<T>;
		tokenType: string;
	};

export type IDToken<T extends CustomClaims = CustomClaims> = AbstractToken & {
	idToken: string;
	claims: IDTokenClaims<T>;
	issuer: string;
	clientId: string;
	nonce: string;
};

export type Tokens<
	AC extends CustomClaims = CustomClaims,
	IC extends CustomClaims = CustomClaims,
> = {
	accessToken: AccessToken<AC>;
	idToken: IDToken<IC>;
};

export type TokenType = keyof Tokens;

export type TokenResponse<
	AC extends CustomClaims = CustomClaims,
	IC extends CustomClaims = CustomClaims,
> = {
	tokens: Tokens<AC, IC>;
	state: string;
};

export interface JWK {
	alg: string;
	e: string;
	kid: string;
	kty: string;
	n: string;
	use: string;
}
export interface JWKS {
	keys: JWK[];
}
