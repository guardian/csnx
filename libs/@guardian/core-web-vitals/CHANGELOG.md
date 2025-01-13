# @guardian/core-web-vitals

## 9.0.0

### Patch Changes

- Updated dependencies [34042f6]
  - @guardian/libs@20.0.0

## 8.0.1

### Patch Changes

- 064c5fb: Fixes for new eslint config

## 8.0.0

### Patch Changes

- Updated dependencies [cb19d46]
- Updated dependencies [59b350f]
  - @guardian/libs@19.0.0

## 7.0.0

### Major Changes

- 4de52e7: This major change adds attribution data on 3 core web vital metrics; CLS, INP, and LCP.
  - It also updates the endpoint so that this data will now be sent to a new table in big query. We now send the stage as a value to big query, rather than using separate endpoints.
  - In addition, null values have been removed in favour of undefined.
  - It also updates the version of `web-vitals` required to `v4.2.1`.
- e5b15dc: Update TypeScript support to `v5.5.2`.

### Patch Changes

- Updated dependencies [a5498b8]
- Updated dependencies [e5b15dc]
  - @guardian/libs@18.0.0

## 6.0.1

### Patch Changes

- 0382052: 1. All packages are now ES modules, although they should be compatible with CommonJS environments. 2. Adds entry points for projects that can consume [`package.json#exports`](https://nodejs.org/api/packages.html#exports), alongside `main`.

## 6.0.0

### Major Changes

- Update TS to version 5.3.3 and tslib to 2.6.2

- Updated dependencies
  - @guardian/libs@16.0.0

## 5.1.0

### Minor Changes

- b6f5343: Adds collection of INP data in core-web-vitals
- 0d15993: Updated deprecated ReportHandler with ReportCallback in core-web-vitals

## 5.0.0

### Major Changes

- Update Typescript to v5.1.3 and tslib to v2.5.3

### Patch Changes

- Updated dependencies
  - @guardian/libs@15.0.0

## 4.0.0

### Major Changes

- Now requires TypeScript ~4.9.5 (if you use it with TypeScript).

### Patch Changes

- Updated dependencies
  - @guardian/libs@14.0.0

## 3.0.0

### Major Changes

- ed13a6c: Update to use web-vitals v3.0.0.

  - Add a config object param to all metric functions ([#​225](https://togithub.com/GoogleChrome/web-vitals/pull/225))
  - Report TTFB after a bfcache restore ([#​220](https://togithub.com/GoogleChrome/web-vitals/pull/220))
  - Only include last LCP entry in metric entries ([#​218](https://togithub.com/GoogleChrome/web-vitals/pull/218))

  The changelog for web-vitals 3.0.0 is [here](https://github.com/GoogleChrome/web-vitals/blob/HEAD/CHANGELOG.md#v300-2022-08-24)

### Patch Changes

- Updated dependencies [b4f6334]
  - @guardian/libs@13.1.0

## 2.0.3

### Patch Changes

- cf437f9: Bump @guardian/source-foundations to v8

## 2.0.2

### Patch Changes

- d742b50: Bump @guardian/libs to 12.0.0

## 2.0.1

### Patch Changes

- a4aa0bd: Update docs

## 2.0.0

### Major Changes

- eb65fde: Add `typescript@^4.3.2` to `peerDependecies` (`optional`).

  This should mean you get a warning if you're using an incompatible version of typescript, but not if you aren't using it at all.

### Patch Changes

- Updated dependencies [eb65fde]
  - @guardian/libs@11.0.0

## 1.0.1

### Patch Changes

- 3882dc1: peer dependency on `@guardian/libs` is now restricted to current major version (`^10.0.0`, rather than `<=10.0.0`)

## 1.0.0

### Major Changes

- 481e7a6: Create `@guardian/core-web-vitals`.

  This is drop-in, identical functionality to the exports that were removed in `@guardian/libs` in `v10.0.0`.
