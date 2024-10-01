# @guardian/libs

## 19.1.0

### Minor Changes

- f1ba24a: Restores `ArticleDesign.PrintShop`. To be re-removed at a later date.

## 19.0.0

### Major Changes

- cb19d46: Removes `ArticleDesign.PrintShop`, as we no longer intend to handle this as a separate `ArticleDesign`.

  This is a breaking change because it removes this member from the `enum`. Therefore any code the depends on this member will need to be updated.

  For example, in a `switch` the `case` will need to be removed:

  ```
  switch (design) {
      case ArticleDesign.Standard:
        // Other code
      case ArticleDesign.PrintShop:
        // This case will need to be removed
  }
  ```

  Any code that stores the enum members directly, such as a fixture, will also need to be updated:

  ```
  {
      ...
      format: {
          // With PrintShop removed, 20 will now refer to Obituary
          design: 20,
          ...
      }
  }
  ```

  Consideration will need to be given to what `ArticleDesign` will now be used for articles that were previously `PrintShop`. This is handled in the CAPI client for frontend/DCAR, and in AR itself for AR.

- 59b350f: CMP: Implement Multi-State Privacy Agreement for US Compliance

  This release introduces support for the Global Privacy Platform (GPP) for third-party vendors who have completed migration. The legacy \*\*uspapi will remain available temporarily for vendors still in transition.

  Key updates:

      Added window.__gpp stub function for the US region.
      Updated the US framework to use "usnat" instead of "ccpa".
      Migrated CCPA-related types and functions to the "aus" namespace.
      The ConsentState type, returned by getConsentFor, onConsentChange, and onConsent, now includes a usnat property, replacing the previous ccpa property.

## 18.0.2

### Patch Changes

- 5b909a7: Internally, `cmp.showPrivacyManager` uses an id for the Sourcepoint second layer in Australia. A new privacy manager has been created in Sourcepoint and this patch version reflects that change.

## 18.0.1

### Patch Changes

- 80eea1d: Small refactors to allow Eslint updates

## 18.0.0

### Major Changes

- e5b15dc: Update TypeScript support to `v5.5.2`.

### Patch Changes

- a5498b8: internal code refactors to simplify handling of undefined arrays

## 17.0.1

### Patch Changes

- e191a91: Fix issue with sourcepoint AB test

## 17.0.0

### Major Changes

- 437e880: Remove GA from cmp vendorlist

### Minor Changes

- c2da3cd: Introduce AB test in sourcepoint config

### Patch Changes

- 01a3362: Fix vendor data removal and more strictly type arguments for `getConsentFor`

## 16.1.4

### Patch Changes

- 013fed6: Add "CONTAINER" to OphanComponentType

## 16.1.3

### Patch Changes

- 0382052: 1. All packages are now ES modules, although they should be compatible with CommonJS environments. 2. Adds entry points for projects that can consume [`package.json#exports`](https://nodejs.org/api/packages.html#exports), alongside `main`.

## 16.1.2

### Patch Changes

- 92688c7: Make consent 11 false by default, currently undefined

## 16.1.1

### Patch Changes

- becac1a: Improvements to readability of if else statements. Cleanup after update to linting rules

## 16.1.0

### Minor Changes

- 14f4db9: Relocates the Guardian's CMP from [`@guardian/consent-management-platform`](https://www.npmjs.com/package/@guardian/consent-management-platform) to `@guardian/libs`.

  _`@guardian/consent-management-platform` is now deprecated._

  ## Before

  ```js
  import {
  	cmp,
  	onConsent,
  	onConsentChange,
  	getConsentFor,
  } from '@guardian/consent-management-platform';
  ```

  ## After

  ```js
  import {
  	cmp,
  	onConsent,
  	onConsentChange,
  	getConsentFor,
  } from '@guardian/libs';
  ```

  The new exports are functionally identical to those in the final version of `@guardian/consent-management-platform`: [v13.12.1](https://github.com/guardian/consent-management-platform/releases/tag/v13.12.1).

## 16.0.2

### Patch Changes

- af5a0fe: use `=>` to always bind storage methods to their parent scope

## 16.0.1

### Patch Changes

- 9c64a63: Make Storage handle numeric expiry value

## 16.0.0

### Major Changes

- Update TS to version 5.3.3 and tslib to 2.6.2

### Patch Changes

- f85e2a4: `joinUrl`: better documentation using JSDoc

## 15.9.1

### Patch Changes

- cff734b: Small performance improvements and internal refactors to `timeAgo`

## 15.9.0

### Minor Changes

- 28f0b1e: Add a `now` option to `timeAgo`. Useful for situations in which you need to recreate a previous call, for example when hydrating a server-rendered component which uses it.

## 15.8.0

### Minor Changes

- 623de72: Export `isOneOf` method which creates
  [type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
  that narrow primitives to
  [literal](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types) [type unions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

## 15.7.1

### Patch Changes

- 1791e1b: Uses a local cache for `logger` subscriptions, instead of hitting `localStorage` every time `log` was called (even when the console was closed).

## 15.7.0

### Minor Changes

- 89fb611: Labels used in `logger` are quieter.
- e47b5d2: - add `perf` to `logger`
  - log measurement duration when calling `endPerformanceMeasure`

## 15.6.4

### Patch Changes

- db6d601: PerformanceMeasure objects cannot be destructured…

## 15.6.3

### Patch Changes

- 1e3cbf9: Handle browsers which do not support the
  [`performance.getEntriesByType` API](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType#browser_compatibility),
  for real this time…

## 15.6.2

### Patch Changes

- 368083d: Handle browsers which do not support the
  [`performance.getEntriesByType` API](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType#browser_compatibility).

## 15.6.1

### Patch Changes

- efb20dc: Handle browser which do not support the `measureOptions` parameter to window.performance.measure() API

## 15.6.0

### Minor Changes

- 2f80074: Actually export new `getMeasures` method

## 15.5.0

### Minor Changes

- 6a88106: New API to retrieve `PerformanceMeasure` created with `startPerformanceMeasure`.

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
