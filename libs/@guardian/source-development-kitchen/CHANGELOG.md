# @guardian/source-development-kitchen

## 3.0.0

### Major Changes

- c4baa5c: Update typescript v4.5.4 and peer deps @guardian/libs and @guardian/source
- 490384d: Now has a peer dependency of `@emotion/react@^11.11.3` (from `^11.11.1`).

  Fixes conflicting types between Emotion's deps, as outlined in https://github.com/emotion-js/emotion/pull/3141.

### Patch Changes

- 955b831: Replace use of deprecated `ArticlePillar` with `Pillar` from `@guardian/libs`.

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
