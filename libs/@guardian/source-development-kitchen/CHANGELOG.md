# @guardian/source-development-kitchen

## 23.0.0

### Major Changes

- 816eebd:
  - Peer Dependency: Update `typescript` to `5.9.3`
  - Peer Dependency: Update `tslib` to `2.8.1`
  - Peer Dependency: Update `@guardian/source` to `12.0.0`
  - Peer Dependency: Update `@guardian/libs` to `27.0.0`

## 22.0.1

### Patch Changes

- 56dab8a: no-op

  This is a no-op release to test migration to [NPM trusted publishing](https://docs.npmjs.com/trusted-publishers).

## 22.0.0

### Patch Changes

- Updated dependencies [f3d443f]
  - @guardian/libs@26.0.0

## 21.0.0

### Patch Changes

- Updated dependencies [4384c52]
  - @guardian/libs@25.0.0

## 20.0.0

### Patch Changes

- Updated dependencies [559d04f]
  - @guardian/libs@24.0.0

## 19.0.0

### Patch Changes

- Updated dependencies [bef13f1]
- Updated dependencies [f1248c7]
  - @guardian/libs@23.0.0
  - @guardian/source@11.0.0

## 18.1.1

### Patch Changes

- 22b7d0d: Improve ticker animation

## 18.1.0

### Minor Changes

- 0791b4b: Make the goalCopy in tickerCopy configurable

## 18.0.0

### Major Changes

- 3f1442d: Bump @emotion/react to 11.11.4
- f360ebe: Remove `Crossword` component. This has been superseded by the [`@guardian/react-crossword`](https://github.com/guardian/csnx/tree/main/libs/%40guardian/react-crossword) package.

### Patch Changes

- Updated dependencies [3f1442d]
  - @guardian/source@10.0.0

## 17.0.0

### Major Changes

- Updated dependencies [29e58ba]
  - @guardian/source@9.0.0

## 16.0.0

### Patch Changes

- Updated dependencies [6c811ba]
  - @guardian/libs@22.0.0

## 15.0.1

### Patch Changes

- latest release - fix for accidental canary release

## 15.0.0

### Major Changes

- Updated peer dependencies [97822ce]
  - @guardian/libs@21.0.0

## 14.0.1

### Patch Changes

- 5de61bb: Fix eslint errors after version bump

## 14.0.0

### Major Changes

- Updated peer dependencies [34042f6]
  - @guardian/libs@20.0.0

## 13.2.0

### Minor Changes

- c247761: Replace deprecated warning icon in ErrorSummary component

## 13.1.1

### Patch Changes

- 064c5fb: Fixes for new eslint config

## 13.1.0

### Minor Changes

- afe409d: Add WIP `Crossword` component

## 13.0.0

### Major Changes

- 902521c: Remove `EditorialButton` and `EditorialLinkButton` components
- cd351c5: Remove `QuoteIcon` component and `HeadlineSize` type
- 90b4703: Remove `format` prop from `ToggleSwitch` component (it was not being used anyway).

## 12.0.0

### Major Changes

- 4442352: Remove padding from Ticker component

## 11.0.0

### Major Changes

- 7e8b36a: Make `Ticker` size configurable via a new `size` prop.
  Rename prop `countLabel` to `headline` in `Ticker`.

## 10.0.0

### Patch Changes

- Updated dependencies [cb19d46]
- Updated dependencies [59b350f]
  - @guardian/libs@19.0.0

## 9.0.0

### Major Changes

- 85dcc72: Updating 'ticker' design to update the default padding

## 8.0.0

### Patch Changes

- Updated dependencies [33608e2]
  - @guardian/source@8.0.0

## 7.1.0

### Minor Changes

- bcd0e25: Add a new `ticker` component

## 7.0.1

### Patch Changes

- 80eea1d: Small refactors to allow Eslint updates

## 7.0.0

### Major Changes

Updated peer dependency to `@guardian/source@7.0.0`

## 6.0.0

### Major Changes

- d4e48f9: Refactor `DottedLines` to render pattern with CSS rather than SVG

## 5.0.0

### Patch Changes

- Updated dependencies [d274436]
  - @guardian/source@6.0.0

## 4.0.0

### Major Changes

- e5b15dc: Update TypeScript support to `v5.5.2`.

### Patch Changes

- Updated dependencies [a5498b8]
- Updated dependencies [e5b15dc]
  - @guardian/libs@18.0.0
  - @guardian/source@5.0.0

## 3.0.0

### Major Changes

- bd424c2: Now has a peer dependency of `@emotion/react@^11.11.3` (from `^11.11.1`).
- Update peer dependency of @guardian/libs v17.0.0
- Update peer dependency of @guardian/source v4.0.0

  Fixes conflicting types between Emotion's deps, as outlined in https://github.com/emotion-js/emotion/pull/3141.

### Patch Changes

- bd424c2: Replace use of deprecated `ArticlePillar` with `Pillar` from `@guardian/libs`.

## 2.0.0

### Major Changes

- bdd830b: Update dependencies:
  - `@guardian/source@3.0.0`
  - `@guardian/libs@16.1.3`

## 0.1.0

### Minor Changes

- dfe0ebb: Create `@guardian/source-development-kitchen`

## 1.0.0

### Major Changes

#### First production release of single Source Development Kitchen.

Allows extending Source Development Kitchen to add potential support beyond React components...

#### Before

```
import { StarRating } from '@guardian/source-react-components-development-kitchen'
```

#### After

```
import { StarRating } from '@guardian/source-development-kitchen/react-components'
```

_There will be no more updates to the old package. From now on, all updates to Source Development Kitchen will come via this package._
