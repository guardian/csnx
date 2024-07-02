# @guardian/source

## 5.0.0

### Major Changes

- e5b15dc: Update TypeScript support to `v5.5.2`.

## 4.0.0

### Major Changes

- dc79048: Adds Guardian Headline 64px typography presets and removes Guardian Headline 70px presets.

  ```
  headlineBold64
  headlineLight64
  headlineLightItalic64
  headlineMedium64
  headlineMediumItalic64
  ```

- 490384d: Now has a peer dependency of `@emotion/react@^11.11.3` (from `^11.11.1`).

  Fixes conflicting types between Emotion's deps, as outlined in https://github.com/emotion-js/emotion/pull/3141.

## 3.0.0

### Major Changes

- a275431: Removes `SvgSpinner` from icon library and replaces with dedicated `Spinner` component. The `size` prop supports the existing set of named icon sizes for backwards compatibility, but also allows setting a custom size in pixels. The default colour scheme can be overridden with the `theme` prop.

  ```tsx
  <>
  	<Spinner size="small" />
  	<Spinner size={40} />
  	<Spinner theme={{ background: 'transparent', color: 'currentColor' }} />
  </>
  ```

## 2.1.0

### Minor Changes

- 803f111: Adds `success.300` to the colour palette

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
