# @guardian/eslint-config

## 10.0.0-beta.7

### Breaking Changes

- Run react checks on `js` and `ts` files too (e.g. for custom hooks).

## 10.0.0-beta.6

### Patch Changes

- Updates eslint to v9.14.0 as it updates `@eslint/plugin-kit` v0.2.3 with a security fix.

## 10.0.0-beta.5

### Breaking Changes

`react-hooks/exhaustive-deps` is now an `error` (rather than `warn`).

This means that if a hook that takes an array of deps is not passed all the deps it needs, linting will fail.

## 10.0.0-beta.4

### Patch Changes

- Fix missing types issue.

## 10.0.0-beta.3

### Minor Changes

Adds the `recommended` config of `eslint-plugin-react-hooks` when linting `jsx`, `mjsx`, `tsx` and `mtsx` files.

### Patch Changes

- Updates deps

## 10.0.0-beta.2

### Patch Changes

- Rejig `@eslint-community/eslint-plugin-eslint-comments` config

## 10.0.0-beta.1

### Patch Changes

- Replaces `eslint-plugin-eslint-comments` with `@eslint-community/eslint-plugin-eslint-comments`
- Bumps other dependencies

## 10.0.0-beta.0

### Major Changes

This is pre-release that requires [ESLint 9](https://eslint.org/blog/2024/04/eslint-v9.0.0-released/).

It should be feature complete, but this release is to allow for feedback and testing.

It replaces both `@guardian/eslint-config@9` and `@guardian/eslint-config-typescript@12` with a single package.

It also includes configs for `jest`, `storybook` and `react`.

See the [README](README.md) for full details.

> ESLint 9 contains a lot of breaking changes, including a new config format. See
> their [migration guide](https://eslint.org/docs/latest/use/migrate-to-9.0.0) for more details.
>
> Note that [ESLint 8 is EOL 2024-10-05](https://eslint.org/version-support/).

## 9.0.0

### Major Changes

- 80eea1d: ## Update packages to use

  - "@typescript-eslint/eslint-plugin": "8.1.0",
  - "@typescript-eslint/parser": "8.1.0",
  - "@stylistic/eslint-plugin": "2.6.2",
  - "eslint": "8.57.0",

## 8.0.1

### Patch Changes

- 0382052: 1. All packages are now ES modules, although they should be compatible with CommonJS environments. 2. Adds
  entry points for projects that can consume [`package.json#exports`](https://nodejs.org/api/packages.html#exports),
  alongside `main`.

## 8.0.0

### Major Changes

- cc7aa7d: Requires curly braces in all circumstances.

  This should help reduce noise in diffs, and remove ambiguity about when you should use curly braces (and possibly when
  a block starts and ends), especially for people unfamiliar with the language.

  _Note that this rule is fixable, so running eslint with the `--fix` flag will automatically update your code to comply
  with the new setting._

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

- 9e0cb43: `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` dependencies upgraded to next major
  version (6).

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

  1.  used `eslint-config-prettier` to disable any white-space formatting rules that would conflict with our prettier
      config
  2.  used `eslint-plugin-prettier` to lint for formatting errors that did not match our prettier config

  This is quite expensive, and although it means you could use `--fix` to apply prettier, it's not as fast as using
  prettier directly.

  ### After

  We still use `eslint-config-prettier` to avoid conflicts with our `prettier` config, but we no longer lint for
  errors (and therefore also don't fix them).

  ### Recommendations

  Your project should handle `prettier` formatting in another way, e.g.

  - via [editor integration](https://prettier.io/docs/en/editors.html)
  - via a [pre-commit hook](https://prettier.io/docs/en/precommit.html)

  If you prefer the way this used to work (applying `prettier` formatting as part of linting), add
  the [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) manually to your ESLint config.

## 1.0.2

### Patch Changes

- 73631d3: Update readme links
