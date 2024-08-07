# @guardian/source-development-kitchen

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
