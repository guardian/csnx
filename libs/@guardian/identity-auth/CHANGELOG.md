# @guardian/identity-auth

## 2.0.0

### Major Changes

- Update TS to version 5.3.3 and coresponding packages

### Patch Changes

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
