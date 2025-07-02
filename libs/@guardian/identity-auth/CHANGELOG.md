# @guardian/identity-auth

## 9.0.0

### Patch Changes

- Updated dependencies [559d04f]
  - @guardian/libs@24.0.0

## 8.0.0

### Patch Changes

- Updated dependencies [bef13f1]
  - @guardian/libs@23.0.0

## 7.0.0

### Patch Changes

- Updated dependencies [6c811ba]
  - @guardian/libs@22.0.0

## 6.0.1

### Patch Changes

- latest release - fix for accidental canary release

## 6.0.0

### Major Changes

- Updated peer dependencies [97822ce]
  - @guardian/libs@21.0.0

## 5.0.0

### Major Changes

- Updated peer dependencies [34042f6]
  - @guardian/libs@20.0.0

## 4.0.2

### Patch Changes

- 064c5fb: Fixes for new eslint config

## 4.0.1

### Patch Changes

- db73c76: Noop to force release.

## 4.0.0

### Patch Changes

- Updated dependencies [cb19d46]
- Updated dependencies [59b350f]
  - @guardian/libs@19.0.0

## 3.0.1

### Patch Changes

- 80eea1d: Small refactors to allow Eslint updates

## 3.0.0

### Major Changes

- e5b15dc: Update TypeScript support to `v5.5.2`.

### Patch Changes

- Updated dependencies [a5498b8]
- Updated dependencies [e5b15dc]
  - @guardian/libs@18.0.0

## 2.1.1

### Patch Changes

- 0382052: 1. All packages are now ES modules, although they should be compatible with CommonJS environments. 2. Adds entry points for projects that can consume [`package.json#exports`](https://nodejs.org/api/packages.html#exports), alongside `main`.

## 2.1.0

### Minor Changes

- 145fb9b: Optimise `isSignedInWithAuthState` method so that it does one call simultaneously if called multiple times

### Patch Changes

- 707a035: Correctly handle `GU_SO` check in `isSignedInWithAuthState` method

## 2.0.1

### Patch Changes

- f2f4527: Update `isSignedIn` logic to use `GU_SO` cookie correctly
- a75996f: Remove `GU_U` cookie if we fail to get tokens with it, as it's likely invalid

## 2.0.0

### Major Changes

- Update TS to version 5.3.3 and tslib to 2.6.2

- Updated dependencies
  - @guardian/libs@16.0.0

## 1.1.1

### Patch Changes

- 9e0cb43: Linting fixes

## 1.1.0

### Minor Changes

- 5a4d75a: Make strict clock skew checking optional

## 1.0.0

### Major Changes

- e41cfa7: Release `@guardian/identity-auth` 1.0. We're using this package in PROD and has multiple consumers so we should expect it to be stable now.

## 0.5.0

### Minor Changes

- bae0b85: - Fix clock skew calculation issue
  - Increase oauth timeout from 12 seconds to 30 seconds

## 0.4.0

### Minor Changes

- b25f0bf: Add functionality to refresh the user's Okta and Identity session, if required, once every 30 days. Controlled through the new `idCookieSessionRefresh` option, which defaults to `false`.

## 0.3.0

### Minor Changes

- 870f3bd: - Add `decodeTokens` method to `Token` class
  - Refactor library so that we only store required values in `verifyTokens` local storage, and now derive other values from decoding the token
  - Rename `verifyToken` method to `verifyTokens` in `Token` class to better reflect functionality
  - Use access token to verify timestamps, instead of id tokens

## 0.2.1

### Patch Changes

- c4e6c09: Account for clock skew when verifying tokens

## 0.2.0

### Minor Changes

- 3dfc301: - Add `AutoRenewService` for automatically renewing tokens before they expire
  - Update type definitions for `IdentityAuthState`

## 0.1.2

### Patch Changes

- 2784f00: Only use a single promise if `getWithoutPrompt` called multiple times

## 0.1.1

### Patch Changes

- Update Typescript to v5.1.3 and tslib to v2.5.3

## 0.1.0

### Minor Changes

- b479354: Pre-release: Adds `IdentityAuth` library for authenticating and authorising users within the Guardian's identity platform hosted by Okta using OAuth2 and OpenID Connect within a client-side, browser-based context.
