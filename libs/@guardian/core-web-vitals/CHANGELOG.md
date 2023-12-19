# @guardian/core-web-vitals

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
