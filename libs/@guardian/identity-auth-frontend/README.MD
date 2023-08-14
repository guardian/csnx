# IdentityAuthFrontend

A wrapper around [@guardian/identity-auth](../identity-auth/README.md) which manages creating and configuring a IdentityAuth singleton to be used solely on [www.theguardian.com](www.theguardian.com) by DCR, Frontend, and Commercial.

## Usage

```js
import { getIdentityAuth } from '@guardian/identity-auth-frontend';

const identityAuth = getIdentityAuth();

// Check if the user is logged in and return the current auth state
const authState = await identityAuth.isSignedInWithAuthState();

authState.isAuthenticated; // true or false
authState?.accessToken; // the user's access token object
authState?.idToken; // the user's id token object

// or boolean only
const isLoggedIn = await identityAuth.isSignedIn();
```
