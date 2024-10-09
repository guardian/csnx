# @guardian/source-development-kitchen

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
