# @guardian/identity-auth-frontend

## 15.0.0

### Major Changes

- Updated peer dependencies [f93c41a]
  - @guardian/libs@28.0.0
  - @guardian/identity-auth@13.0.0

## 14.0.0

### Major Changes

- 816eebd:
  - Peer Dependency: Update `typescript` to `5.9.3`
  - Peer Dependency: Update `tslib` to `2.8.1`
  - Peer Dependency: Update `@guardian/identity-auth` to `12.0.0`
  - Peer Dependency: Update `@guardian/libs` to `27.0.0`

## 13.0.1

### Patch Changes

- 56dab8a: no-op

  This is a no-op release to test migration to [NPM trusted publishing](https://docs.npmjs.com/trusted-publishers).

## 13.0.0

### Patch Changes

- Updated dependencies [f3d443f]
  - @guardian/libs@26.0.0
  - @guardian/identity-auth@11.0.0

## 12.0.0

### Patch Changes

- Updated dependencies [4384c52]
  - @guardian/libs@25.0.0
  - @guardian/identity-auth@10.0.0

## 11.0.0

### Patch Changes

- Updated dependencies [559d04f]
  - @guardian/libs@24.0.0
  - @guardian/identity-auth@9.0.0

## 10.0.0

### Patch Changes

- Updated dependencies [bef13f1]
  - @guardian/libs@23.0.0
  - @guardian/identity-auth@8.0.0

## 9.0.0

### Patch Changes

- Updated dependencies [6c811ba]
  - @guardian/libs@22.0.0
  - @guardian/identity-auth@7.0.0

## 8.1.0

### Minor Changes

- 18d8837: Add `https://r.thegulocal.com/` and `https://m.thegulocal.com/` as a valid origin for `getRedirectUri` when the stage is `DEV` to allow DCR/frontend local development with okta/oauth tokens

## 8.0.1

### Patch Changes

- latest release - fix for accidental canary release

## 8.0.0

### Major Changes

- Updated peer dependencies [97822ce]
  - @guardian/libs@21.0.0
  - @guardian/identity-auth@6.0.0

## 7.0.0

### Major Changes

- Updated Peer dependencies [34042f6]
  - @guardian/libs@20.0.0
  - @guardian/identity-auth@5.0.0

## 6.0.3

### Patch Changes

- a35ec51: Add `profile` subdomain as valid `redirect_uri`

## 6.0.2

### Patch Changes

- 064c5fb: Fixes for new eslint config

## 6.0.1

### Patch Changes

- Updated dependencies
  - @guardian/identity-auth@4.0.1

## 6.0.0

### Patch Changes

- Updated dependencies [cb19d46]
- Updated dependencies [59b350f]
  - @guardian/libs@19.0.0
  - @guardian/identity-auth@4.0.0

## 5.0.0

### Major Changes

- e5b15dc: Update TypeScript support to `v5.5.2`.

### Patch Changes

- Updated dependencies [a5498b8]
- Updated dependencies [e5b15dc]
  - @guardian/libs@18.0.0
  - @guardian/identity-auth@3.0.0

## 4.0.1

### Patch Changes

- 0382052: 1. All packages are now ES modules, although they should be compatible with CommonJS environments. 2. Adds
  entry points for projects that can consume [`package.json#exports`](https://nodejs.org/api/packages.html#exports),
  alongside `main`.

## 4.0.0

### Major Changes

- 2407ec8: Update peer dependency `@guardian/identity-auth` to `2.1.0`

## 3.0.0

### Major Changes

- 31aa63e: Update `identity-auth` to `2.0.1` to fix sign out bug

## 2.0.0

### Major Changes

- Update TS to version 5.3.3 and tslib to 2.6.2

- Updated dependencies
  - @guardian/identity-auth@2.0.0
  - @guardian/libs@16.0.0

## 1.0.0

### Major Changes

- 394944b: Release `@guardian/identity-auth-frontend` v1.0.0

## 0.1.0

### Minor Changes

- 8d480a2: Add a new @guardian/identity-auth-frontend library which takes care of setting up `@guardian/identity-auth`
  for DCR, Frontend, and Commercial

### Patch Changes

- Updated dependencies [bae0b85]
  - @guardian/identity-auth@0.5.0
