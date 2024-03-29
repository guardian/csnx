# @guardian/source-react-components

## 22.1.0

### Minor Changes

- b3d79ac: Enable theming of the `Button` tertiary background colour.
  Defaults to `transparent` to be backwards-compatible.

## 22.0.2

### Patch Changes

- 759a692: Move shared component types in the source code into `@types` dirs.

## 22.0.1

### Patch Changes

- 7de7e01: Fix issue with types in build

## 22.0.0

### Major Changes

- 93eff4d: Updated dependencies

  - @guardian/source-foundations@14.1.4

## 21.0.0

### Major Changes

- ad1627f: - Added `theme` prop to support applying custom colour schemes to components with a complete or partial theme, avoiding the need for style overrides

  - Deprecated existing `ThemeProvider` themes

  `theme` prop example usage:

  ```tsx
  const myTheme: Partial<ThemeChoiceCard> = {
  	backgroundSelected: palette.brand[500],
  };

  <ChoiceCard theme={myTheme}>Select</ChoiceCard>;
  ```

## 20.0.0

### Major Changes

- 6603b42: Reduces text size of `xsmall` buttons to `14px`.

### Minor Changes

- 9ef761a: Adds optional `size` prop to `TextInput`, `TextArea`, `Label`, `InlineError` and `InlineSuccess` components. `medium` is the default value if `size` is not set, matching current behaviour.

## 19.0.1

### Patch Changes

- f4f275d: Fix footer backToTop icon

## 19.0.0

### Major Changes

- ed769eb: Replaces triangular warning icon in `InlineError` with circular version for consistency with rest of icon set

## 18.0.0

### Major Changes

- Update TS to version 5.3.3 and tslib to 2.6.2

- Updated dependencies
  - @guardian/source-foundations@14.0.0

## 17.0.1

### Patch Changes

- 9e0cb43: Linting fixes

## 17.0.0

### Major Changes

- 81dfd5a:

- New icons

  - `SvgBin`
  - `SvgNotificationsOffRound`
  - `SvgNotificationsONRound`

- Updated icons
  - `SvgShareCallout`
  - `SvgReload`

## 16.0.1

### Patch Changes

- 1b32aeb: Update @babel/core

## 16.0.0

### Major Changes

- Updated dependencies
  - @guardian/source-foundations@13.0.0
- Changes to component spacing and alignment due to line height updates:
  - Updates `Accordion` component spacing
  - Fixes label and supporting text alignment in `Checkbox` and `Radio` components.
  - Updates `Select` component to add missing spacing and bring in line with `TextInput`

## 15.0.2

### Patch Changes

- 5364a4c: Use latest package versions

## 15.0.1

### Patch Changes

- Update build output config

## 15.0.0

### Major Changes

- Update Typescript to v5.1.3 and tslib to v2.5.3

## 14.0.2

### Patch Changes

- 9bb6ffd: Updates `create-icons` script accessible label lookup and updates README with command to run script and steps to obtain a Figma access token.

## 14.0.1

### Major Changes

- 313f8c0: Update form component border styles. This breaking change will only affect consumers not using `box-sizing: border-box`. In these circumstances consumers may need to adjust their styling to account for thinner borders.

### Patch Changes

- Updated dependencies [313f8c0]
  - @guardian/source-foundations@11.0.0

## 13.0.0

### Major Changes

- Update React to v18

## 12.0.0

### Major Changes

- Now requires TypeScript ~4.9.5 (if you use it with TypeScript).

### Patch Changes

- Updated dependencies
  - @guardian/source-foundations@10.0.0

## 11.4.0

### Minor Changes

- 41095ce: Adds optional prop to CheckboxGroup element to append "optional" text to label

## 11.3.0

### Minor Changes

- 30c3254: Added two icons: Message and MessageRound.

## 11.2.0

### Minor Changes

- d0005e0: Export three icons: WhatsAppBrand, SignalBrand, and TelegramBrand

## 11.1.0

### Minor Changes

- 7743580: Added three icons: WhatsAppBrand, SignalBrand, and TelegramBrand.

## 11.0.0

### Major Changes

- c6366dd: Add `tslib@^2.4.1` to peerDependencies

### Patch Changes

- Updated dependencies [c6366dd]
  - @guardian/source-foundations@9.0.0

## 10.0.2

### Patch Changes

- 3a8956f: The Edit Icon has been updated to a newer design

## 10.0.1

### Patch Changes

- cf437f9: Bump @guardian/source-foundations to v8

## 10.0.0

### Major Changes

- eb65fde: Add `typescript@^4.3.2` to `peerDependecies` (`optional`).

  This should mean you get a warning if you're using an incompatible version of typescript, but not if you aren't using it at all.

### Patch Changes

- Updated dependencies [eb65fde]
  - @guardian/source-foundations@8.0.0

## 9.1.2

### Patch Changes

- c616be8: Links in docs updated to point at csnx instead of the archived Source repo

## 9.1.1

### Patch Changes

- 2033774: No op to test release process

## 9.1.0

### Minor Changes

- 305c58e6: Add the SvgShareCallout icon

## 9.0.1

### Patch Changes

- c04aae35: Improve partial loading of Guardian logo SVG

## 9.0.0

### Major Changes

- Updated `peerDependencies` [905c5148]
  - @guardian/source-foundations@7.0.0

### Patch Changes

- 905c5148: Uses input `reset` in `TextArea` and `TextInput`.
- 905c5148: `Link` text has variable underline heights, based on the size of the link text.

## 8.0.1

### Patch Changes

- 40e41a43: **No changes**: Patch bump to fix deploy to npm due to the major version already having been published and deleted

## 8.0.0

### Patch Changes

- Updated dependencies [3823490a]
  - @guardian/source-foundations@6.0.0

## 7.1.5

### Patch Changes

- 8079ce0e: Add value field to textArea so the component works as a controlled component
- 6b989f6a: - fix the size of the loading spinner on buttons of size: small and xsmall

## 7.1.4

### Patch Changes

- 81a17eaa: Turn ambient `Theme` type into an explicitly imported type

## 7.1.3

### Patch Changes

- fee8fd5b: the width of the button loading spinner icon is set to 24px as it was previously too large

## 7.1.2

### Patch Changes

- 9d7fa178: - #1548 Fix missing label for `newsletter` icon

## 7.1.1

### Patch Changes

- 57c14867: Update to eslint configs

## 7.1.0

### Minor Changes

- bbbe1e3e: make BackToTop an explicit export of source-react-components so it can be used in the FooterWithContents dev kitchen component

## 7.0.1

### Patch Changes

- 175e8dcf: Bump dev dependencies

## 7.0.0

### Major Changes

- 8e8535ba: Update Select border colour

### Patch Changes

- 12a9fce5: Update Link hover underline thickness

## 6.0.0

### Major Changes

- 07bfaf1b: Update default border colour for TextInput and TextArea

### Minor Changes

- fd69cf60: add newsletter icon

### Patch Changes

- 78ff24be: Add documentation note about `AccordionRow`'s `max-height`

## 5.0.0

### Major Changes

- 94a6de68: Improve Link/ButtonLink accessibility
- 1e129d0b: Add spaced focus halo and apply to buttons
- d55bc4b6: Change underline on subdued Button
- ef458f83: Increase spacing between choice cards and label
- a5a14a49: Improve accessibility of unselected state of ChoiceCard
- c37e5be9: Improve accessibility of unselected state of checkbox

### Patch Changes

- b87baf5c: Replace deprecated colour tokens with palette
- Updated dependencies [b87baf5c]
- Updated dependencies [1e129d0b]
- Updated dependencies [8bd1adce]
- Updated dependencies [51f8737e]
- Updated dependencies [f6865ac5]
- Updated dependencies [34ec716d]
  - @guardian/source-foundations@5.0.0

## 4.4.0

### Minor Changes

- a90b69a2: Add Guardian Best Website Logo
- 8f401873: Fetch icon SVG markup from Figma, expose new icons

## 4.3.1

### Patch Changes

- 825e71e1: move legacy icon exports to `deprecated-exports`
- 44816e06: Move deprecated exports to their own file, and export them from there.

  This just keeps things cleaner internally.

## 4.3.0

### Minor Changes

- ecd0969c: expose spinner icon from components index

### Patch Changes

- 65049d62: Accessibility improvements to form components
- d9bcb118: Add an icons svg folder and svgs for all icons
- 8a13ceeb: Expose new icon names
- ddfac4ac: Add `@deprecated` jsdoc hints so that VS Code will let you know if you use deprecated features.

## 4.2.0

### Minor Changes

- 44f78769: Add pinned SVG icon
- b1240d34: Add screen reader accessible labels to logo icons

## 4.1.1

### Patch Changes

- 9001d7b2: Add alert role to inline user feedback components

## 4.1.0

### Minor Changes

- 7305e4ca: Adds an `isLoading` prop to the Button component. This replaces any icon rendered on the button with a spinner (`SvgSpinner`). The spinner will have colours that match the background and text colours of the button. The Button `disabled` state is also extended to show a `not-allowed` cursor so that the disabled state is indicated visually"

### Patch Changes

- 13a0f399: Remove aria-checked attributes from ChoiceCard, Checkbox and Radio components

## 4.0.3

### Patch Changes

- 11da0939: Export palette types as one `palette` object and add colour tokens to Foundations palette doc

## 4.0.2

### Patch Changes

- 45d4d8df: React minimum version is 17.0.1 (instead of 17.0.0)
- 71148ecf: Stop publishing packages as single files, so they can be properly tree-shaken.
- Updated dependencies [71148ecf]
  - @guardian/source-foundations@4.0.3
