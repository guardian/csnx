# @guardian/libs

## 15.4.0

### Minor Changes

- 314a6ba: Add the `startPerformanceMeasure` helper, which has a unified API for measuring
  durations and producing `PerformanceMeasure`s.

## 15.3.0

### Minor Changes

- 078dfaf: Add new ophan component types

## 15.2.0

### Minor Changes

- 644fcd7: Deprecate `ArticlePillar` in favour of `Pillar`. `ArticlePillar` will be removed entirely in a future major release.

## 15.1.0

### Minor Changes

- 529fdb6: Introducing a Picture design type for use by image articles

## 15.0.0

### Major Changes

- Update Typescript to v5.1.3 and tslib to v2.5.3

## 14.1.0

### Minor Changes

- 0353489: Add Open Journalism team colours

## 14.0.0

### Major Changes

- Now requires TypeScript ~4.9.5 (if you use it with TypeScript).

## 13.1.0

### Minor Changes

- b4f6334: Add more metadata to loadScript errors

## 13.0.0

### Major Changes

- b4104c1: loadScript rejects with an Error

### Minor Changes

- 05a5836: Actually export `isNonNullable`

## 12.0.1

### Patch Changes

- 40cae72: Prevent unnecessary throwing of SecurityError errors by storage lib

## 12.0.0

### Major Changes

- 98cd62f: Fix versioning, latest formats update was a breaking change

## 11.2.0

### Minor Changes

- ced1714: Extends format's articleDesign type to include `Profile` and `Timeline`

## 11.1.3

### Patch Changes

- f61460d: Refactor `CountryCode` type to infer the possible values from `countries#countryCode`.

## 11.1.2

### Patch Changes

- a544750: loadScript rejects with more helpful error messages

## 11.1.1

### Patch Changes

- a4aa0bd: Update docs

## 11.1.0

### Minor Changes

- 5a7ba38: Add `isNonNullable` [type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types) for values that are neither `null` nor `undefined`

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
