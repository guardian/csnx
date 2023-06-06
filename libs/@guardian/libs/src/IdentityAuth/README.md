# IdentityAuth

A library for authenticating and authorising users within the Guardian's identity platform hosted by Okta, using OAuth2 and OpenId Connect.

This is a slimmed down and reverse engineered version of [Okta's official JS SDK](https://github.com/okta/okta-auth-js) that is tailored to the Guardian's needs.

Specifically, it provides a subset of the functionality of the official SDK. This is to reduce the size of the library and to ensure that we only expose the functionality that we need. Our library only uses some of the same classes and methods as the official SDK, but the implementation of them is our own.

## Browser support

Browsers will need to support the following features or polyfill them:

- [`Web Crypto API`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
  - [`crypto.getRandomValues`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues)
  - [`crypto.subtle`](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto)
- [`TextEncoder`](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder)

## Usage

```js
import { IdentityAuth } from '@guardian/libs';

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
authState?.accessToken; // the user's access token
authState?.idToken; // the user's id token

// or boolean only
const isLoggedIn = await identityAuth.isSignedIn();

// see rest of API below for more methods
```

Applications will need to be registered in Okta before they can use this library. Please contact the Identity team to do this. They will provide you with the configuration values you need to initialise the library.

## Configuration

```ts
import type { IdentityAuthOptions } from '@guardian/libs';
import { IdentityAuth } from '@guardian/libs';

const config: IdentityAuthOptions = {
	issuer: 'https://profile.theguardian.com/oauth2/SERVER_ID',
	clientId: 'example-client-id',
	redirectUri: 'https://theguardian.com',
	scopes: ['openid', 'profile'], // and any other scopes you need
};

const identityAuth = new IdentityAuth(config);
```

## API

`IdentityAuth` exposes the following:

- [`isSignedInWithAuthState`](#isSignedInWithAuthState)
- [`isSignedIn`](#isSignedIn)
- [`authStateManager`](#authStateManager)
  - [`getAuthState`](#getAuthState)
  - [`subscribe`](#subscribe)
  - [`unsubscribe`](#unsubscribe)
- [`tokenManager`](#tokenManager)
  - [`clear`](#clear)
  - [`getTokens`](#getTokens)
  - [`getTokensSync`](#getTokensSync)
  - [`setTokens`](#setTokens)
- [`token`](#token)
  - [`getWithoutPrompt`](#getWithoutPrompt)
  - [`verifyToken`](#verifyToken)

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
import { OAuthError } from '@guardian/libs';

try {
	// Check if the user is logged in and return the current auth state
	const authState = await identityAuth.isSignedInWithAuthState();

	authState.isAuthenticated; // true or false
	authState?.accessToken; // the user's access token
	authState?.idToken; // the user's id token
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
import { OAuthError } from '@guardian/libs';

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
import type { IdentityAuthState } from '@guardian/libs';

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

- `verifyToken` - If `true`, the tokens will be verified before being returned. Defaults to `true`.
- `refreshIfRequired` - If `true`, the tokens will be refreshed if they are expired. Defaults to `false`.

```ts
const tokens = await identityAuth.tokenManager.getTokens({
	verifyToken: true,
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

#### `setTokens`

Sets the tokens in local storage, very unlikely you'll need to manually use this unless you're manually retrieving tokens using the `token` class.

```ts
import type { AccessToken, IDToken } from '@guardian/libs';

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

#### `getWithoutPrompt`

Performs the Authorization Code Flow with PKCE, exchanging the authorization code for tokens and verifying the ID token, without prompting the user and using a hidden iframe. Returns `TokenResponse` or throws an `OAuthError`.

```ts
import { OAuthError } from '@guardian/libs';

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

#### `verifyToken`

Verifies the ID token, checking the signature and claims, and verifies the access token using the `at_hash` claim from the IDToken.

- `idToken` - The ID token to verify
- `accessToken` - The access token to verify

Returns `void` or throws an `OAuthError`.

```ts
import { OAuthError } from '@guardian/libs';

try {
	// tokens from somewhere
	const tokens = identityAuth.tokenManager.getTokensSync();

	identityAuth.token.verifyToken(tokens.idToken, tokens.accessToken);
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
} from '@guardian/libs';

// also the error which isn't a type, but is useful for checking if an error is an OAuth error
// e.g if (error instanceof OAuthError) { ... }
import { OAuthError } from '@guardian/libs';
```
