export type UserClaims = Partial<AccessTokenClaims & IDTokenClaims>;

export interface AccessTokenClaims {
	aud: string;
	auth_time: number;
	cid: string;
	email_validated: boolean;
	exp: number;
	iat: number;
	identity_username: string;
	iss: string;
	jti: string;
	legacy_identity_id: string;
	scp: string[];
	sub: string;
	uid: string;
	ver: number;
}

export interface IDTokenClaims {
	amr: string[];
	at_hash: string;
	aud: string;
	auth_time: number;
	exp: number;
	iat: number;
	identity_username: string;
	idp: string;
	iss: string;
	jti: string;
	legacy_identity_id: string;
	name: string;
	nonce: string;
	preferred_username: string;
	sub: string;
	user_groups: string[];
	ver: number;
}

export interface JWTHeader {
	alg: string;
	kid: string;
}

export type JWTPayload = UserClaims & {
	scp?: string[];
};

export interface JWTObject {
	header: JWTHeader;
	payload: JWTPayload;
	signature: string;
}

interface AbstractToken {
	expiresAt: number;
	scopes: string[];
}

export interface AccessToken extends AbstractToken {
	accessToken: string;
	claims: AccessTokenClaims;
	tokenType: string;
}

export interface IDToken extends AbstractToken {
	idToken: string;
	claims: IDTokenClaims;
	issuer: string;
	clientId: string;
	nonce: string;
}

export interface Tokens {
	accessToken: AccessToken;
	idToken: IDToken;
}

export type TokenType = keyof Tokens;

export interface TokenResponse {
	tokens: Tokens;
	state: string;
}

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
