# @guardian/eslint-plugin-source-react-components

## 24.0.0

### Major Changes

- b4b6940: Updated dependencies

  - @guardian/source-react-components@22.0.1

## 23.0.0

### Major Changes

- 145ba2a: Updated dependencies
  - @guardian/source-foundations@14.1.4
  - @guardian/source-react-components@22.0.0

## 22.0.1

### Patch Changes

- a6eb679: Update @typescript-eslint/eslint-plugin and @typescript-eslint/parser

## 22.0.0

### Major Changes

- 629e941: - Updated dependencies
  - @guardian/source-react-components@20.0.0

## 21.0.1

### Patch Changes

- 225e542: Dependencies updates:

  - `@typescript-eslint/eslint-plugin` from 6.14.0 to 6.18.0
  - `@typescript-eslint/parser` from 6.14.0 to 6.18.0

## 21.0.0

### Major Changes

- Update TS to version 5.3.3 and tslib to 2.6.2

- Updated dependencies
  - @guardian/source-react-components@18.0.0
  - @guardian/libs@16.0.0

## 20.0.1

### Patch Changes

- a116dfe: Update @typescript-eslint/parser and @typescript-eslint/eslint-plugin

## 20.0.0

### Major Changes

- 9e0cb43: `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` dependencies upgraded to next major version (6).

### Patch Changes

- Updated dependencies [9e0cb43]
  - @guardian/source-react-components@17.0.1

## 19.0.0

### Major Changes

- 6bb3297: Updates ESLint to latest version to fix security vulnerability in `word-wrap` dependency

## 18.0.0

### Major Changes

- Use latest Guardian packages

## 17.0.0

### Major Changes

- Update Typescript to v5.1.3 and tslib to v2.5.3

### Patch Changes

- Updated dependencies
  - @guardian/source-react-components@15.0.0
  - @guardian/libs@15.0.0

## 16.0.0

### Major Changes

- Update Source package versions

## 15.0.0

### Major Changes

- Update React to v18

### Patch Changes

- Updated dependencies
  - @guardian/source-react-components@13.0.0

## 14.0.0

### Major Changes

- Now requires TypeScript ~4.9.5 (if you use it with TypeScript).

### Patch Changes

- Updated dependencies
  - @guardian/libs@14.0.0
  - @guardian/source-react-components@12.0.0

## 13.0.0

### Major Changes

- 1793e3c: Add linkComponents to settings

  eslint allows us to specify components which should be treated as 'link components' for linting purposes.
  In source-react-components, both Link and ButtonLink will apply props directly to an `<a>` tag. Listing them as link components allows rules like `jsx-no-target-blank` to identify them as links, and to lint their props accordingly.
  If you don't have any linting rules which look for link elements then this update should not cause any changes. If you do have rules like this then it is possible that new errors or warnings will be raised, but these will be identifying pre-existing issues in your code.

## 12.0.0

### Major Changes

- c6366dd: Add `tslib@^2.4.1` to peerDependencies

### Patch Changes

- Updated dependencies [c6366dd]
- Updated dependencies [b4104c1]
- Updated dependencies [05a5836]
  - @guardian/source-react-components@11.0.0
  - @guardian/libs@13.0.0

## 11.0.3

### Patch Changes

- 7cd6f21: Bump tslib to v2.4.1

## 11.0.2

### Patch Changes

- cf437f9: Bump @guardian/source-foundations to v8
- Updated dependencies [cf437f9]
  - @guardian/source-react-components@10.0.1

## 11.0.1

### Patch Changes

- d742b50: Bump @guardian/libs to 12.0.0

## 11.0.0

### Major Changes

- eb65fde: Add `typescript@^4.3.2` to `peerDependecies` (`optional`).

  This should mean you get a warning if you're using an incompatible version of typescript, but not if you aren't using it at all.

### Patch Changes

- Updated dependencies [eb65fde]
  - @guardian/libs@11.0.0
  - @guardian/source-react-components@10.0.0

## 10.0.4

### Patch Changes

- 0e11603: Links in `eslint-plugin-source-foundations` and `eslint-plugin-source-react-components` eslint documentation updated to point at the relevant readme instead of the archived Source repo.

## 10.0.3

### Patch Changes

- a442275: Declare compatability with `@guardian/libs@^10.0.0`

## 10.0.2

### Patch Changes

- 24ad7d0: Update dependencies

## 10.0.1

### Patch Changes

- 2033774: No op to test release process

## 10.0.0

### Major Changes

- aa4c2caa: Bump @guardian/libs to `^9.0.0`

## 9.0.0

### Major Changes

- Updated `peerDependencies` [905c5148]
  - @guardian/source-react-components@9.0.0

## 8.0.1

### Patch Changes

- 40e41a43: **No changes**: Patch bump to fix deploy to npm due to the major version already having been published and deleted

## 8.0.0

### Patch Changes

- @guardian/source-react-components@8.0.0

## 7.0.0

### Patch Changes

- Updated dependencies [12a9fce5]
- Updated dependencies [8e8535ba]
  - @guardian/source-react-components@7.0.0

## 6.0.0

### Patch Changes

- Updated dependencies [07bfaf1b]
- Updated dependencies [78ff24be]
- Updated dependencies [fd69cf60]
  - @guardian/source-react-components@6.0.0

## 5.0.0

### Patch Changes

- Updated dependencies [b87baf5c]
- Updated dependencies [94a6de68]
- Updated dependencies [1e129d0b]
- Updated dependencies [d55bc4b6]
- Updated dependencies [ef458f83]
- Updated dependencies [a5a14a49]
- Updated dependencies [c37e5be9]
  - @guardian/source-react-components@5.0.0

## 4.1.0

### Minor Changes

- e6ccc60c: Improve SVG icon accessibility
