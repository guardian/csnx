# @guardian/tsconfig

## 1.0.0

### Major Changes

- 9c40ba3: Sets `moduleResolution` to `bundler` (https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-beta/#moduleresolution-bundler), bringing the compiler's behaviour into line with application bundlers.

  This is also the first major release as the rest of the defaults have settled down.

## 0.3.1

### Patch Changes

- 0382052: 1. All packages are now ES modules, although they should be compatible with CommonJS environments. 2. Adds entry points for projects that can consume [`package.json#exports`](https://nodejs.org/api/packages.html#exports), alongside `main`.

## 0.3.0

### Minor Changes

- 1a7deef: Removes the `"incremental": true` setting, deferring [the TypeScript defaults](https://www.typescriptlang.org/tsconfig/#incremental).

  _This should be project-specific, not a default for all configs._

## 0.2.0

### Minor Changes

- 907c1dc: Enable the [incremental compiler option](https://www.typescriptlang.org/tsconfig#incremental) for faster rebuilds

## 0.1.6

### Patch Changes

- 0f81c66: Fix incorrect output directories

## 0.1.5

### Patch Changes

- f04d503: Update @rollup/plugin-node-resolve to v14

## 0.1.4

### Patch Changes

- 73631d3: Update readme links

## 0.1.3

### Patch Changes

- a291be2: noop to test publishing

## 0.1.2

### Patch Changes

- 034da90: noop for release process testing

## 0.1.1

### Patch Changes

- 84f0eb8: Empty change to test release pipeline

## 0.1.0

### Minor Changes

- 1ee0271: Initial release
