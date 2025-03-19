# @guardian/source

## 9.0.0

### Major Changes

- 29e58ba: Adds new icons to source and both renames and removes some existing icons. This is a major bump and consumers using removed icons will need to update their UI.

## 8.0.2

### Patch Changes

- 5de61bb: Fix eslint errors after version bump

## 8.0.1

### Patch Changes

- 064c5fb: Fixes for new eslint config

## 8.0.0

### Major Changes

- 33608e2: Disallows direct use of Emotion's `css` prop on Source components.

  If you need to override the internal styling of Source components, use `cssOverrides` instead.

## 7.0.1

### Patch Changes

- 80eea1d: Small refactors to allow Eslint updates

## 7.0.0

### Major Changes

- 238dfd3: Removes deprecated typography API.

  In `@guardian/source-foundations@14.2.0` (2024-04-07), we added new [web typography presets](https://guardian.github.io/storybooks/?path=/story/source_foundations-typography--presets) to standardise on the typographic language used by Design, and deprecated the old typography API.

  This release removes that old API, in order to simplify the ongoing maintenance of the library.

  The following exports have been removed:

  - `titlepiece`
  - `headline`
  - `body`
  - `textSans`
  - `titlepieceSizes`
  - `headlineSizes`
  - `bodySizes`
  - `textSansSizes`
  - `remTitlepieceSizes`
  - `remHeadlineSizes`
  - `remBodySizes`
  - `remTextSansSizes`
  - `fonts`
  - `fontWeights`
  - `lineHeights`
  - `bodyObjectStyles`
  - `headlineObjectStyles`
  - `textSansObjectStyles`
  - `titlepieceObjectStyles`

  along with the following `type` exports:

  - `ScaleUnit`
  - `Category`
  - `LineHeight`
  - `FontWeight`
  - `FontStyle`
  - `FontWeightDefinition`
  - `Option`
  - `TypographySizes`
  - `TypographyStyles`
  - `TitlepieceSizes`
  - `HeadlineSizes`
  - `BodySizes`
  - `TextSansSizes`
  - `Fs`
  - `FontScaleFunction`
  - `FontScaleFunctionStr`
  - `FontScaleArgs`

  _If you cannot map existing uses of the old API to the new presets, please check which preset you should use with a designer._

- 447e6b6: Applies consistent spacing around checkboxes and radio buttons by removing conditional styles and using padding to ensure minimum height of 44px.

  The external padding is now consistent regardless of the presence of a label and / or supporting text, and removes any inconsistency when these elements are stacked vertically.

  Checkboxes and radio buttons are also now aligned with the first line of text when labels wrap on to multiple lines.

- 7805d16: Brings `remSize`, `remIconSize`, `remHeight` and `remWidth` into line with `remSpace`, by changing their values from a `number` (of rems) to a `string` that ends with `rem` units.

  `pxToRem` also now returns a string with `rem` units, rather than a `number` of rems.

  _The sizes haven't changed, only the way they are exported._

  ### Before

  ```js
  const style = `
  	top: ${pxToRem(10)}rem;
  	bottom: ${remHeight.ctaSmall}rem;
  `;
  ```

  ### After

  ```js
  const style = `
  	top: ${pxToRem(10)};
  	bottom: ${remHeight.ctaSmall};
  `;
  ```

  If you have been performing calculations with the old number values in JS, you can use the [CSS `calc` function](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) instead:

  ### Before

  ```js
  const style = `
  	bottom: -${remHeight.ctaSmall / 2}rem;
  `;
  ```

  ### After

  ```js
  const style = `
  	bottom: calc(-${remHeight.ctaSmall} / 2);
  `;
  ```

### Patch Changes

- 69ecc3f: Moves design tokens into `@guardian/source` itself.

  Allows us to calculate `@guardian/source/foundations` values during build, rather than at the point of consumption, which relieves user's devices of this overhead and means the design tokens JSON will no longer be included in consumer's bundles.

## 6.1.0

### Minor Changes

- 11c62af: Adds `headlineBold15`, `headlineLight15`, `headlineLightItalic15`, `headlineMedium15` and `headlineMediumItalic15` to the typography presets

## 6.0.0

### Major Changes

- d274436: Adds new icons to the icon library and applies updates to existing icons. In addition, some icons have been renamed and others deprecated. Icons that were previously deprecated have now been removed in this update.

  #### Renamed icons

  These icons have been renamed:

  | Old name           | New name               |
  | ------------------ | ---------------------- |
  | `SvgBookMark`      | `SvgBookmarkFilled`    |
  | `SvgBookMarkCross` | `SvgBookmarkCross`     |
  | `SvgCrossRound`    | `SvgCrossRoundFilled`  |
  | `SvgHouse`         | `SvgHomeHouseFilled`   |
  | `SvgPersonRound`   | `SvgPersonRoundFilled` |
  | `SvgShare`         | `SvgShareWeb`          |

  #### Deprecated icons

  These existing deprecated aliases have been removed:

  | Removed           | Aliased to             |
  | ----------------- | ---------------------- |
  | `SvgOfflineCloud` | `SvgCrossedOutCloud`   |
  | `SvgAlert`        | `SvgExclamation`       |
  | `SvgMessenger`    | `SvgFacebookMessenger` |
  | `SvgInfo`         | `SvgInfoRound`         |
  | `SvgPlay`         | `SvgMediaControlsPlay` |
  | `SvgPayPal`       | `SvgPayPalBrand`       |

  eg. if you are importing `SvgOfflineCloud` this is aliased to `SvgCrossedOutCloud`. The alias has now been removed so you should import `SvgCrossedOutCloud` directly.

  The following icons have been deprecated and are still available, but will be removed in a future release:

  | Don't use          | Use instead            |
  | ------------------ | ---------------------- |
  | `SvgAlertTriangle` | `SvgAlertRound`        |
  | `SvgFilter`        | `SvgFilterOutlinedWeb` |
  | `SvgShareCallout`  | `SvgShareWeb`          |

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
