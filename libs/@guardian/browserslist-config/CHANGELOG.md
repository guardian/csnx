# @guardian/browserslist-config

## 6.1.2

### Patch Changes

- 064c5fb: Fixes for new eslint config

## 6.1.1

### Patch Changes

- 0382052: 1. All packages are now ES modules, although they should be compatible with CommonJS environments. 2. Adds entry points for projects that can consume [`package.json#exports`](https://nodejs.org/api/packages.html#exports), alongside `main`.

## 6.1.0

### Minor Changes

- 0f5fef4: Update with data for 2024.01.20-2024.02.18

## 6.0.0

### Major Changes

- Update TS to version 5.3.3 and tslib to 2.6.2
- 55d5aa9: Updated peer dependency browserlist from 4.21.7 to 4.22.2

## 5.1.0

### Minor Changes

- 3eb7b51: Update with data for 2023.06.18-2023.07.17

## 5.0.0

### Major Changes

- Update Typescript to v5.1.3 and tslib to v2.5.3

## 4.2.0

### Minor Changes

- 3e6d282: Updated with June 2023 data

## 4.1.0

### Minor Changes

- c755ea2: Updated with last 30 days usage data (2023-02-07 to 2023-03-08)

## 4.0.0

### Major Changes

- c6366dd: Add `tslib@^2.4.1` to peerDependencies

## 3.0.0

### Major Changes

- 0625974: Update browserslist version and include most up-to-date stats

## 2.0.3

### Patch Changes

- 0f81c66: Fix incorrect output directories

## 2.0.2

### Patch Changes

- f04d503: Update @rollup/plugin-node-resolve to v14

## 2.0.1

### Patch Changes

- 504ad30: Security patch (https://github.com/guardian/csnx/security/dependabot/1)

## 2.0.0

### Major Changes

- 7860cda:
  - requires `browserslist@^4.13.0` (earlier versions [don't support `supports`](https://github.com/browserslist/browserslist/blob/main/CHANGELOG.md#413))
  - updates with last 30 days usage data (2022-07-17 to 2022-08-16)

## 1.0.1

### Patch Changes

- f401853: fix an issue with accessing stats from consuming projects

## 1.0.0

### Major Changes

- ce729cd: create `@guardian/browserslist-config`
