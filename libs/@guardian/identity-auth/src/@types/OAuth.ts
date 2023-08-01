import { guard } from './guard';
import type { Guard } from './guard';
import type { AccessToken, CustomClaims, IDToken } from './Token';

/**
 * Defines the `profile` endpoint URL (Identity/Okta endpoint)
 */
// type of valid domains
type GuardianDomain = 'theguardian' | 'code.dev-theguardian' | 'thegulocal';
// list of valid profile urls
const profileUrls = [
	'https://profile.theguardian.com',
	'https://profile.code.dev-theguardian.com',
	'https://profile.thegulocal.com',
] as const satisfies ReadonlyArray<`https://profile.${GuardianDomain}.com`>;

// type guard for profile urls
export const isProfileUrl = guard(profileUrls);

// type for profile urls
export type ProfileUrl = Guard<typeof isProfileUrl>;

/**
 * Defines the options that are required to configure the IdentityAuth
 * Ask the Identity team for the values to use for your app.
 *
 * https://developer.okta.com/docs/reference/api/oidc/
 *
 * @param clientId - The client ID of your app
 * @param issuer - The issuer of the tokens
 * @param scopes - The scopes that your app requires
 * @param redirectUri - The redirect URI of your app
 * @param autoRenew - Whether to automatically renew the tokens, defaults to `true`
 * @param renewGracePeriod - The time in seconds before the access token expires to renew the token, defaults to 60 seconds
 * @param maxClockSkew - The maximum time drift in seconds between the client and server, defaults to 300 seconds (5 minutes), based on the default maximum tolerance of the Kerberos protocol
 * @param idCookieSessionRefresh - If switched on (set to `true`, ), will refresh the okta session and identity cookie (GU_U), if required (once every 30 days), should be based on the id-cookie-refresh (idCookieRefresh) switch if being supplied by theguardian.com, defaults to `false`
 */
export interface IdentityAuthOptions {
	clientId: string;
	issuer: `${ProfileUrl}/oauth2/${string}`;
	scopes: ['openid', 'profile', ...string[]];
	redirectUri: string;
	autoRenew?: boolean;
	renewGracePeriod?: number;
	maxClockSkew?: number;
	idCookieSessionRefresh?: boolean;
}

/**
 * Defines the options that are required to configure the IdentityAuth
 */
export type RequiredIdentityAuthOptions = Required<IdentityAuthOptions>;

/**
 * Defines the state of the IdentityAuth instance when not authenticated.
 */
export type IdentityAuthStateNotAuthenticated = {
	accessToken: undefined;
	idToken: undefined;
	isAuthenticated: false;
};

/**
 * Defines the state of the IdentityAuth instance when authenticated.
 */
export type IdentityAuthStateAuthenticated<
	AC extends CustomClaims = CustomClaims,
	IC extends CustomClaims = CustomClaims,
> = {
	accessToken: AccessToken<AC>;
	idToken: IDToken<IC>;
	isAuthenticated: true;
};

/**
 * Defines the state of the IdentityAuth instance.
 *
 * `isAuthenticated` - `true` when access and id token are present, `false` otherwise
 * `accessToken` - the access token, `undefined` if not authenticated
 * `idToken` - the id token, `undefined` if not authenticated
 */
export type IdentityAuthState<
	AC extends CustomClaims = CustomClaims,
	IC extends CustomClaims = CustomClaims,
> = IdentityAuthStateNotAuthenticated | IdentityAuthStateAuthenticated<AC, IC>;

/**
 * Parameter required for the OAuth2 authorization code flow, /authorize endpoint
 *
 * https://developer.okta.com/docs/reference/api/oidc/#authorize
 *
 * In our case specifically set up for:
 * 	- Authorization Code Flow with PKCE
 * 	- Okta Post Message (iframe) response mode
 */
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

/**
 * Parameter required for the OAuth2 authorization code flow, /token endpoint
 *
 * https://developer.okta.com/docs/reference/api/oidc/#token
 *
 * In our case specifically set up for:
 * 	- Authorization Code Flow with PKCE
 */
export interface TokenParams extends Record<string, string> {
	client_id: string;
	code: string;
	code_verifier: string;
	grant_type: 'authorization_code';
	redirect_uri: string;
}

/**
 * Defines the URLs available for the OAuth2 authorization code flow
 *
 * https://developer.okta.com/docs/reference/api/oidc/#endpoints
 */
export interface OAuthUrls {
	authorizeUrl: `${IdentityAuthOptions['issuer']}/v1/authorize`;
	tokenUrl: `${IdentityAuthOptions['issuer']}/v1/token`;
	keysUrl: `${IdentityAuthOptions['issuer']}/v1/keys`;
}

/**
 * Defines the response from the OAuth2 /authorize endpoint
 *
 * https://developer.okta.com/docs/reference/api/oidc/#postmessage-data-object
 * https://developer.okta.com/docs/reference/api/oidc/#response-properties
 */
export interface OAuthAuthorizeResponse {
	code: string;
	state: string;
}

/**
 * Defines the response from the OAuth2 /authorize endpoint when an error occurs
 *
 * https://developer.okta.com/docs/reference/api/oidc/#postmessage-data-object
 * https://developer.okta.com/docs/reference/api/oidc/#response-properties
 */
export interface OAuthAuthorizeResponseError {
	state: string;
	error: string;
	error_description: string;
}

/**
 * Defines the response from the OAuth2 /token endpoint
 *
 * https://developer.okta.com/docs/reference/api/oidc/#response-properties-4
 */
export interface OAuthTokenResponse {
	access_token: string;
	id_token: string;
	expires_in: number;
	scope: string;
	token_type: string;
}

/**
 * Defines the response from the OAuth2 /token endpoint when an error occurs
 *
 * https://developer.okta.com/docs/reference/api/oidc/#response-properties-4
 */
export interface OAuthTokenResponseError {
	error: string;
	error_description: string;
}
