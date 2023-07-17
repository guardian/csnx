# @guardian/identity-auth

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
