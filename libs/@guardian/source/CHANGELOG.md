# @guardian/source

## 2.0.0

### Major Changes

- 637d127:
  - Adds `collapseUntil` option to `Inline` layout component to allow collapsing into a single column below a given breakpoint.
  - Text and icons are now horizontally centred within buttons. Visually this is only apparent if a button's styles have been overridden and it is stretched beyond it's natural intrinsic width. (Previously the text and icon would be pushed to the edges of the button.)

### Patch Changes

- 1921d8c: Fixes bug where `space.0` was not applied to `Inline` layouts and updates `Column` and `Stack` to support all spacing units

## 1.0.3

### Patch Changes

- 957cbac: call react hook useId before conditional

## 1.0.2

### Patch Changes

- 522b68e: Replaced internal uses of `generateSourceId` with React's `useId`, as it does not change when the component is re-rendered.
- 2e48c80: Make `react` and `@emotion/react` optional `peerDeps` (you don't need them if you're not using react components).

## 1.0.1

### Patch Changes

- be759ac: Improve README

## 0.3.0

### Minor Changes

- e60f79e: third attempt

## 1.0.0

### Major Changes

#### First production release of single Source package.

Combining `@guardian/source-foundations@16.0.0` and `@guardian/source-react-components@25.0.0` into single package.

#### Before

```
import { palette } from '@guardian/source-foundations'
import { Button } from '@guardian/source-react-components'
```

#### After

```
import { palette } from '@guardian/source/foundations'
import { Button } from '@guardian/source/react-components'
```

_There will be no more updates to the two separate packages. From now on, all updates to Source will come via this single package._
