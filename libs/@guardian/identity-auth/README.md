# IdentityAuth

A library for authenticating and authorising users within the Guardian's identity platform hosted by Okta, using OAuth2 and OpenId Connect.

This is a slimmed down and reverse engineered version of [Okta's official JS SDK](https://github.com/okta/okta-auth-js) that is tailored to the Guardian's needs.

Specifically, it provides a subset of the functionality of the official SDK. This is to reduce the size of the library and to ensure that we only expose the functionality that we need. Our library only uses some of the same classes and methods as the official SDK, but the implementation of them is our own.

## Browser support

Browsers will need to support the following features or polyfill them:

- [`Web Crypto API`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
  - [`crypto.getRandomValues`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues)
  - [`crypto.subtle.digest`](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest)
  - [`crypto.subtle.importKey`](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey)
  - [`crypto.subtle.verify`](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/verify)
- [`TextEncoder`](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder)
- [`Page Visibility API`](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)

## Usage

```js
import { IdentityAuth } from '@guardian/identity-auth';

// Initialise the library with your configuration values
const identityAuth = new IdentityAuth({
	issuer: 'https://profile.theguardian.com/oauth2/SERVER_ID',
	clientId: 'example-client-id',
	redirectUri: 'https://theguardian.com',
	scopes: ['openid', 'profile'], // and any other scopes you need
});

// Check if the user is logged in and return the current auth state
const authState = await identityAuth.isSignedInWithAuthState();

authState.isAuthenticated; // true or false
authState?.accessToken; // the user's access token object
authState?.idToken; // the user's id token object

// or boolean only
const isLoggedIn = await identityAuth.isSignedIn();

// see rest of API below for more methods
```

Applications will need to be registered in Okta before they can use this library. Please contact the Identity team to do this. They will provide you with the configuration values you need to initialise the library.

In general you use the _Access Token_ to make API requests to Guardian services on behalf of the user, and you use the _ID Token_ to read the user's identity information within your application.

This is what replaces the `SC_GU_U` cookie that is used in the legacy identity platform.

## Configuration

```ts
import type { IdentityAuthOptions } from '@guardian/identity-auth';
import { IdentityAuth } from '@guardian/identity-auth';

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
 */
const config: IdentityAuthOptions = {
	issuer: 'https://profile.theguardian.com/oauth2/SERVER_ID',
	clientId: 'example-client-id',
	redirectUri: 'https://theguardian.com',
	scopes: ['openid', 'profile'], // and any other scopes you need
	autoRenew: true, // optional, defaults to true
	renewGracePeriod: 60, // optional, defaults to 60 seconds
};

const identityAuth = new IdentityAuth(config);
```

## API

`IdentityAuth` exposes the following:

- [`isSignedInWithAuthState`](#issignedinwithauthstate)
- [`isSignedIn`](#issignedin)
- [`authStateManager`](#authstatemanager)
  - [`getAuthState`](#getauthstate)
  - [`subscribe`](#subscribe)
  - [`unsubscribe`](#unsubscribe)
- [`tokenManager`](#tokenmanager)
  - [`clear`](#clear)
  - [`getTokens`](#gettokens)
  - [`getTokensSync`](#gettokenssync)
  - [`renew`](#renew)
  - [`setTokens`](#settokens)
- [`token`](#token)
  - [`decodeTokens`](#decodetokens)
  - [`getWithoutPrompt`](#getwithoutprompt)
  - [`verifyTokens`](#verifytokens)
- [`autoRenew`](#autorenew)
  - [`start`](#start)

#### `isSignedInWithAuthState`

Checks if the user is signed in, and updates the auth state as necessary, returns the current auth state

This performs side effects.

1. If the user has a GU_SO cookie, they have recently signed out, so we should clear their tokens (side effect)
2. If user tokens already exist, they are signed in
3. If the user doesn't have tokens, but they have a GU_U cookie, they are "maybe" signed in
   - We can try to get tokens without prompting/redirecting the user for credentials (side effect)
4. If the user doesn't have tokens or a GU_U cookie, they are not signed in

Returns the current auth state.

```ts
import { OAuthError } from '@guardian/identity-auth';

try {
	// Check if the user is logged in and return the current auth state
	const authState = await identityAuth.isSignedInWithAuthState();

	console.log(authState.isAuthenticated); // true or false
	console.log(authState?.accessToken); // the user's access token
	console.log(authState?.idToken); // the user's id token

	// e.g. read the id token claims to use in your application
	if (authState.idToken) {
		const claims = authState.idToken.claims;

		console.log('identity id', claims.legacy_identity_id);
		console.log('username', claims.identity_username);
	}

	// e.g use the access token to make an API request
	if (authState.accessToken) {
		const accessTokenString = authState.accessToken.accessToken;

		const response = await fetch('https://some-endpoint.theguardian.com', {
			headers: {
				Authorization: `Bearer ${accessTokenString}`,
			},
		});

		// Handle the response
	}
} catch (error) {
	if (error instanceof OAuthError) {
		// Handle OAuth errors
	}
	// Handle other errors
}
```

#### `isSignedIn`

Checks if the user is signed in, returns a boolean. Same as the `isSignedInWithAuthState` method, but without the auth state.

```ts
import { OAuthError } from '@guardian/identity-auth';

// Check if the user is logged in and return a boolean
try {
	const isLoggedIn = await identityAuth.isSignedIn();
} catch (error) {
	if (error instanceof OAuthError) {
		// Handle OAuth errors
	}
	// Handle other errors
}
```

### `authStateManager`

The `authStateManager` is an instance of `AuthStateManager`, which manages the auth state of the user.

The `IdentityAuthState` type is exported for convenience.

#### `getAuthState`

Returns the current auth state.

```ts
const authState = identityAuth.authStateManager.getAuthState();

authState.isAuthenticated; // true or false
authState?.accessToken; // the user's access token
authState?.idToken; // the user's id token
```

#### `subscribe`

Subscribes to changes in the auth state. The callback will be called with the new auth state whenever it changes.

```ts
import type { IdentityAuthState } from '@guardian/identity-auth';

const handler = (authState: IdentityAuthState) => {
	// do something with the new auth state
	console.log(authState);
};

identityAuth.authStateManager.subscribe(handler);
```

#### `unsubscribe`

Unsubscribes from changes in the auth state for a given handler.

```ts
identityAuth.authStateManager.unsubscribe(handler);
```

### `tokenManager`

The `tokenManager` is an instance of `TokenManager`, which manages the Manages the storage and retrieval of tokens.

#### `clear`

Clears the access and id tokens from storage.

```ts
identityAuth.tokenManager.clear();
```

#### `getTokens`

Gets the tokens from storage asynchronously, can refresh tokens if required and verify them. Returns tokens or `undefined`.

- `verifyTokens` - If `true`, the tokens will be verified before being returned. Defaults to `true`.
- `refreshIfRequired` - If `true`, the tokens will be refreshed if they are expired. Defaults to `false`.

```ts
const tokens = await identityAuth.tokenManager.getTokens({
	verifyTokens: true,
	refreshIfRequired: true,
});

tokens.accessToken; // the user's access token
tokens.idToken; // the user's id token
```

#### `getTokensSync`

Gets the tokens from storage synchronously, does not refresh tokens or verify them.

Returns tokens or `undefined`.

```ts
const tokens = identityAuth.tokenManager.getTokensSync();

tokens.accessToken; // the user's access token
tokens.idToken; // the user's id token
```

#### `renew`

Attempts to renew the tokens, regardless of whether they are expired or not

Returns tokens or `undefined`.

```ts
const renewedTokens = await identityAuth.tokenManager.renew();
```

#### `setTokens`

Sets the tokens in local storage, very unlikely you'll need to manually use this unless you're manually retrieving tokens using the `token` class.

```ts
import type { AccessToken, IDToken } from '@guardian/identity-auth';

const accessToken: AccessToken = {
	...
}
const idToken: IDToken = {
	...
}

const tokens = {
	accessToken,
	idToken,
};

identityAuth.tokenManager.setTokens(tokens);
```

### `token`

The `token` object is an instance of `Token`, which manages the retrieval of tokens by performing the OAuth Authorization Code Flow with PKCE, exchanging the authorization code for tokens and verifying the ID and access tokens.

#### `decodeTokens`

Decodes the access and id tokens, returns the decoded tokens, but does not verify that they are valid.

Verification can additionally done by calling `verifyTokens`.

```ts
import { OAuthError } from '@guardian/identity-auth';

try {
	// tokens from somewhere
	const accessTokenRaw = '...';
	const idTokenRaw = '...';
	const nonce = '...';

	const tokens = identityAuth.token.decodeTokens(
		accessTokenRaw,
		idTokenRaw,
		nonce,
	);

	await identityAuth.token.verifyTokens(tokens.idToken, tokens.accessToken);
} catch (error) {
	// handle error
	if (error instanceof OAuthError) {
		// handle OAuth error
		error.error; // the error returned by the OAuth server
		error.error_description; // the error description returned by the OAuth server
		error.message; // the error message
	}
	// handle other errors
}
```

#### `getWithoutPrompt`

Performs the Authorization Code Flow with PKCE, exchanging the authorization code for tokens and verifying the ID token, without prompting the user and using a hidden iframe. Returns `TokenResponse` or throws an `OAuthError`.

```ts
import { OAuthError } from '@guardian/identity-auth';

try {
	const tokenResponse = await identityAuth.token.getWithoutPrompt();

	tokenResponse.tokens.accessToken; // the user's access token
	tokenResponse.tokens.idToken; // the user's id token
	tokenResponse.state; // the state parameter passed to the authorize endpoint

	// set the tokens in local storage
	identityAuth.tokenManager.setTokens(tokenResponse.tokens);
} catch (error) {
	// handle error
	if (error instanceof OAuthError) {
		// handle OAuth error
		error.error; // the error returned by the OAuth server
		error.error_description; // the error description returned by the OAuth server
		error.message; // the error message
	}
	// handle other errors
}
```

#### `verifyTokens`

Verifies the ID token, checking the signature and claims, and verifies the access token using the `at_hash` claim from the IDToken.

- `idToken` - The ID token to verify
- `accessToken` - The access token to verify

Returns `void` or throws an `OAuthError`.

```ts
import { OAuthError } from '@guardian/identity-auth';

try {
	// tokens from somewhere
	const tokens = identityAuth.tokenManager.getTokensSync();

	await identityAuth.token.verifyTokens(tokens.idToken, tokens.accessToken);
} catch (error) {
	// handle error
	if (error instanceof OAuthError) {
		// handle OAuth error
		error.error; // the error returned by the OAuth server
		error.error_description; // the error description returned by the OAuth server
		error.message; // the error message
	}
	// handle other errors
}
```

### `autoRenew`

The `autoRenew` object is an instance of `AutoRenew`, which manages the automatic renewal of tokens based on the expiry time of the tokens and the `autoRenew` options (`autoRenew` and `renewGracePeriod`).

#### `start`

Starts the automatic renewal of tokens, will automatically be started, no need to call, but exposed for use in other internal classes.

## Types

We export a number of types for convenience, which can be useful when using the library. See the types themselves for more information.

```ts
import type {
	IdentityAuthOptions,
	IdentityAuthState,
	AccessToken,
	AccessTokenClaims,
	CustomClaims,
	IDToken,
	IDTokenClaims,
} from '@guardian/identity-auth';

// also the error which isn't a type, but is useful for checking if an error is an OAuth error
// e.g if (error instanceof OAuthError) { ... }
import { OAuthError } from '@guardian/identity-auth';
```

### Custom claims

Depending on the scopes you request, you may get custom claims in the Access Token or ID Token. If you don't create a type for these claims, then typescript will complain about them not existing.

You can add custom claims for you application by creating a type that extends the `CustomClaims` type.

A claim value can be a `string`, `number`, `boolean`, `string[]`, `number[]` or `boolean[]`.

```ts
type CustomAccessTokenClaims = CustomClaims & {
	foo: string;
};

type CustomIdTokenClaims = CustomClaims & {
	bar: number[];
	baz: boolean;
};

// pass the types to the IdentityAuth class as generics
const auth = new IdentityAuth<CustomAccessTokenClaims, CustomIdTokenClaims>({
	...
});

// the custom claims will be available on the AccessToken and IDToken types
const authState = auth.authStateManager.getAuthState();

authState.accessToken.foo; // string
authState.idToken.bar; // number[]
authState.idToken.baz; // boolean
```

## Contributing

Due to the nature of this library, if you want to make changes to it, we suggest you speak to the Identity team first regarding the nature of the changes you want to make, e.g. for bug fixes, new features, etc.
