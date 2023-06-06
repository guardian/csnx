import type { AccessToken, CustomClaims, IDToken } from './Token';

export interface IdentityAuthOptions {
	clientId: string;
	issuer: `https://profile.${
		| 'theguardian'
		| 'code.dev-theguardian'
		| 'thegulocal'}.com/oauth2/${string}`;
	scopes: ['openid', 'profile', ...string[]];
	redirectUri: string;
}

export type IdentityAuthState<
	AC extends CustomClaims = CustomClaims,
	IC extends CustomClaims = CustomClaims,
> = {
	accessToken?: AccessToken<AC>;
	idToken?: IDToken<IC>;
	isAuthenticated: boolean;
};

export interface AuthorizeParams extends Record<string, string> {
	client_id: string;
	code_challenge: string;
	code_challenge_method: 'S256';
	nonce: string;
	prompt: 'none';
	redirect_uri: string;
	response_type: 'code';
	response_mode: 'okta_post_message';
	scope: string;
	state: string;
}

export interface TokenParams extends Record<string, string> {
	client_id: string;
	code: string;
	code_verifier: string;
	grant_type: 'authorization_code';
	redirect_uri: string;
}

export interface OAuthUrls {
	authorizeUrl: `${IdentityAuthOptions['issuer']}/v1/authorize`;
	tokenUrl: `${IdentityAuthOptions['issuer']}/v1/token`;
}

export interface OAuthAuthorizeResponse {
	code: string;
	state: string;
}

export interface OAuthAuthorizeResponseError {
	state: string;
	error: string;
	error_description: string;
}

export interface OAuthTokenResponse {
	access_token: string;
	id_token: string;
	expires_in: number;
	scope: string;
	token_type: string;
}

export interface OAuthTokenResponseError {
	error: string;
	error_description: string;
}
