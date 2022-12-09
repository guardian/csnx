# @guardian/libs

## 11.0.0

### Major Changes

- eb65fde: Add `typescript@^4.3.2` to `peerDependecies` (`optional`).

  This should mean you get a warning if you're using an incompatible version of typescript, but not if you aren't using it at all.

## 10.1.1

### Patch Changes

- c39f114: noop, testing release process

## 10.1.0

### Minor Changes

- 50a9940: Add new Ophan component event type

## 10.0.0

### Major Changes

- 481e7a6: Everything related to Core Web Vitals has been moved to `@guardian/core-web-vitals`.

  This means this package no longer has a peer dependency on `web-vitals` so can you remove if you don't use it (you won't be nagged any more either if you never installed it).

## 9.1.0

### Minor Changes

- fd85d19: Added `VG` (British Virgin Islands) to `countries`

## 9.0.1

### Patch Changes

- 04bda61: CommonJS exports in NPM packages target `ES2018`

## 9.0.0

### Major Changes

- 3a2c68e: This adds `SpecialReportAlt` theme in article format. We need to support a new type of special report. Consumers need to handle the new theme.

## 8.0.5

### Patch Changes

- 0f81c66: Fix incorrect output directories

## 8.0.4

### Patch Changes

- 7913225: Remove the `exports` field in its current form from the package.json

## 8.0.3

### Patch Changes

- f04d503: Update @rollup/plugin-node-resolve to v14

## 8.0.2

### Patch Changes

- e6a54ec: Fix package entry paths

## 8.0.1

### Patch Changes

- 72d9c34: Noop to test the release process.

  You can safely ignore this version.

## <= 8.0.0

Previous versions are listed at the old repo: https://github.com/guardian/libs/releases
