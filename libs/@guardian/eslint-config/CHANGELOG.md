# @guardian/eslint-config

## 7.0.1

### Patch Changes

- 225e542: Dependencies updates:

  - `@typescript-eslint/eslint-plugin` from 6.14.0 to 6.18.0
  - `@typescript-eslint/parser` from 6.14.0 to 6.18.0

## 7.0.0

### Major Changes

- Update TS to version 5.3.3 and tslib to 2.6.2

## 6.0.0

### Major Changes

- 9e0cb43: `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` dependencies upgraded to next major version (6).

## 5.0.0

### Major Changes

- 6bb3297: Updates ESLint to latest version to fix security vulnerability in `word-wrap` dependency

## 4.1.0

### Minor Changes

- a135875: Bump eslint-config-prettier from 8.5.0 to 8.8.0

## 4.0.0

### Major Changes

- Update Typescript to v5.1.3 and tslib to v2.5.3

## 3.0.0

### Major Changes

- c6366dd: Add `tslib@^2.4.1` to peerDependencies

## 2.0.3

### Patch Changes

- 0f81c66: Fix incorrect output directories

## 2.0.2

### Patch Changes

- f04d503: Update @rollup/plugin-node-resolve to v14

## 2.0.1

### Patch Changes

- 8f3ed43: Configures `import/no-cycle` to ignore external modules, decreasing the time it takes to lint a project.

## 2.0.0

### Major Changes

- 0f0888d: _tl;dr_

  - linting for conformance with our `prettier` config is slow
  - to speed up linting, we will stop doing that
  - you should use `prettier` directly

  ### Before

  We extended `plugin:prettier/recommended` which

  1. used `eslint-config-prettier` to disable any white-space formatting rules that would conflict with our prettier config
  2. used `eslint-plugin-prettier` to lint for formatting errors that did not match our prettier config

  This is quite expensive, and although it means you could use `--fix` to apply prettier, it's not as fast as using prettier directly.

  ### After

  We still use `eslint-config-prettier` to avoid conflicts with our `prettier` config, but we no longer lint for errors (and therefore also don't fix them).

  ### Recommendations

  Your project should handle `prettier` formatting in another way, e.g.

  - via [editor integration](https://prettier.io/docs/en/editors.html)
  - via a [pre-commit hook](https://prettier.io/docs/en/precommit.html)

  If you prefer the way this used to work (applying `prettier` formatting as part of linting), add the [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) manually to your ESLint config.

## 1.0.2

### Patch Changes

- 73631d3: Update readme links
