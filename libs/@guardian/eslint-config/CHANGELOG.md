# @guardian/eslint-config

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
