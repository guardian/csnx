# @guardian/eslint-config-typescript

## 11.0.0

### Major Changes

- 95b16ee: Upgrade typescript peer dependency to v5.4.5

## 10.0.1

### Patch Changes

- 0382052: 1. All packages are now ES modules, although they should be compatible with CommonJS environments. 2. Adds entry points for projects that can consume [`package.json#exports`](https://nodejs.org/api/packages.html#exports), alongside `main`.
- Updated dependencies [0382052]
  - @guardian/eslint-config@8.0.1

## 10.0.0

### Major Changes

- cc7aa7d: Requires curly braces in all circumstances.

  This should help reduce noise in diffs, and remove ambiguity about when you should use curly braces (and possibly when a block starts and ends), especially for people unfamiliar with the language.

  _Note that this rule is fixable, so running eslint with the `--fix` flag will automatically update your code to comply with the new setting._

### Patch Changes

- Updated dependencies [cc7aa7d]
  - @guardian/eslint-config@8.0.0

## 9.0.4

### Patch Changes

- 2e530a6: Update deps to @typescript-eslint/eslint-plugin@7.31 and @typescript-eslint/parser@7.31

## 9.0.3

### Patch Changes

- a6eb679: Update @typescript-eslint/eslint-plugin and @typescript-eslint/parser
- 0f595f1: Use new `recommended-type-checked` config name.

  https://typescript-eslint.io/linting/configs/#recommended-configurations

## 9.0.2

### Patch Changes

- 48708f0: Improve performance by delegating namespace import to TypeScript.

  See https://typescript-eslint.io/linting/troubleshooting/performance-troubleshooting/#eslint-plugin-import.

## 9.0.1

### Patch Changes

- 225e542: Dependencies updates:

  - `@typescript-eslint/eslint-plugin` from 6.14.0 to 6.18.0
  - `@typescript-eslint/parser` from 6.14.0 to 6.18.0

- Updated dependencies [225e542]
  - @guardian/eslint-config@7.0.1

## 9.0.0

### Major Changes

- Update TS to version 5.3.3 and tslib to 2.6.2

- Updated dependencies
  - @guardian/eslint-config@7.0.0

## 8.0.1

### Patch Changes

- a116dfe: Update @typescript-eslint/parser and @typescript-eslint/eslint-plugin

## 8.0.0

### Major Changes

- 9e0cb43: `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` dependencies upgraded to next major version (6).

### Patch Changes

- Updated dependencies [9e0cb43]
  - @guardian/eslint-config@6.0.0

## 7.0.0

### Major Changes

- 6bb3297: Updates ESLint to latest version to fix security vulnerability in `word-wrap` dependency

### Patch Changes

- Updated dependencies [6bb3297]
  - @guardian/eslint-config@5.0.0

## 6.0.1

### Patch Changes

- Updated dependencies [a135875]
  - @guardian/eslint-config@4.1.0

## 6.0.0

### Major Changes

- Update Typescript to v5.1.3 and tslib to v2.5.3

### Patch Changes

- Updated dependencies
  - @guardian/eslint-config@4.0.0

## 5.0.0

### Major Changes

- Now requires TypeScript ~4.9.5 (if you use it with TypeScript).

## 4.0.0

### Major Changes

- c6366dd: Add `tslib@^2.4.1` to peerDependencies

### Patch Changes

- Updated dependencies [c6366dd]
  - @guardian/eslint-config@3.0.0

## 3.0.0

### Major Changes

- 4cb065e: Explicit uses of `any` are now errors, not just warnings.

## 2.0.1

### Patch Changes

- 24ad7d0: Update dependencies

## 2.0.0

### Major Changes

- 8faec03: Requires `typescript@^4.1.2` (the version that added the `jsxImportSource` compiler option)

## 1.0.11

### Patch Changes

- 0f81c66: Fix incorrect output directories
- Updated dependencies [0f81c66]
  - @guardian/eslint-config@2.0.3

## 1.0.10

### Patch Changes

- f04d503: Update @rollup/plugin-node-resolve to v14
- Updated dependencies [f04d503]
  - @guardian/eslint-config@2.0.2

## 1.0.9

### Patch Changes

- 84f85db: Update dependency `eslint-import-resolver-typescript` to v3

## 1.0.8

### Patch Changes

- 7de3535: bumps deps:

  - @typescript-eslint/eslint-plugin `5.28.0 -> 5.36.1`
  - @typescript-eslint/parser `5.31.0 -> 5.36.1`

## 1.0.7

### Patch Changes

- Updated dependencies [8f3ed43]
  - @guardian/eslint-config@2.0.1

## 1.0.6

### Patch Changes

- Updated dependencies [0f0888d]
  - @guardian/eslint-config@2.0.0

## 1.0.5

### Patch Changes

- Updated dependencies [73631d3]
  - @guardian/eslint-config@1.0.2

## 1.0.4

### Patch Changes

- eca1288: noop to check changesets handles [pnpm's `workspace:*` syntax](https://pnpm.io/workspaces#publishing-workspace-packages) (again)

  _you can safely skip this release_

## 1.0.3

### Patch Changes

- 0cffa7a: noop to check changesets handles [pnpm's `workspace:*` syntax](https://pnpm.io/workspaces#publishing-workspace-packages)

  _you can safely skip this release_
