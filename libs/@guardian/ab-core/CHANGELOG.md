# @guardian/ab-core

## 7.0.3

### Patch Changes

- 0382052: 1. All packages are now ES modules, although they should be compatible with CommonJS environments. 2. Adds entry points for projects that can consume [`package.json#exports`](https://nodejs.org/api/packages.html#exports), alongside `main`.

## 7.0.2

### Patch Changes

- a247de9: Smaller source code

## 7.0.1

### Patch Changes

- c8c9634: Reduce code repetition, which may improve bundle size

## 7.0.0

### Major Changes

- Update TS to version 5.3.3 and tslib to 2.6.2

## 6.0.0

### Major Changes

- e9ac438: Members of the `OphanAPIConfig` are now **required**. Consumers must pass a
  record function, an error reporter and an object of server-side tests.

  With the previously optional members, failure to record tests to Ophan would
  fail silently. This has been the case in `dotcom-rendering` since Oct 2023.

  In order to update your code to work identically, you must now provide the
  following keys to the constructor’s argument. They are listed here along with
  the fallbacks previously applied:

  - `serverSideTests` &rarr; `{}`
  - `errorReporter` &rarr; `() => undefined`
  - `ophanRecord` &rarr; `() => undefined`

  Note that `errorReporter` has also been narrowed and it now receives a single
  parameter, which is still `unknown` due to the fact than anything can be thrown.

## 5.0.0

### Major Changes

- Update Typescript to v5.1.3 and tslib to v2.5.3

## 4.0.0

### Major Changes

- Now requires TypeScript ~4.9.5 (if you use it with TypeScript).

## 3.1.0

### Minor Changes

- 1f8670f: Export CoreAPIConfig type

## 3.0.0

### Major Changes

- c6366dd: Add `tslib@^2.4.1` to peerDependencies

## 2.0.1

### Patch Changes

- d6ff840: Published from CSNX and enforcing no unchecked indexed access.
