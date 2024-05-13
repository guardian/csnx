# @guardian/source-react-components-development-kitchen

## 20.0.3

### Patch Changes

- 0382052: 1. All packages are now ES modules, although they should be compatible with CommonJS environments. 2. Adds entry points for projects that can consume [`package.json#exports`](https://nodejs.org/api/packages.html#exports), alongside `main`.

## 20.0.2

### Patch Changes

- fbaa879: Components are no longer explicitly typed as `JSX.Element`, which may be too wide. The TypeScript compiler will now be able to infer the correct type itself.

## 20.0.1

### Patch Changes

- 5e280ac: Adds compatability with projects that consume `package.json#exports`

## 20.0.0

### Major Changes

- a798a2e: Updates dependencies to `@guardian/source-foundations@14.2.2` and `@guardian/source-react-components@23.0.0`, and replaces use of deprecated typography API with typography presets

## 19.0.0

### Major Changes

- b4b6940: Updated dependencies

  - @guardian/source-react-components@22.0.1

## 18.0.0

### Major Changes

- 145ba2a: Updated dependencies
  - @guardian/source-react-components@22.0.0
- 6cc6c8c: Displays a warning about the file size limit on uploads if a max file size has been provided.

## 17.0.0

### Major Changes

- ce1d2a2: Update file input error border width

### Minor Changes

- 9ef761a: Adds optional `size` prop to `NumericInput` component to mirror `TextInput` which it extends. `medium` is the default value if `size` is not set, matching current behaviour.

### Patch Changes

- Updated dependencies [6603b42]
- Updated dependencies [9ef761a]
  - @guardian/source-react-components@20.0.0

## 16.0.1

### Patch Changes

- 8fba0a7: Fix toggle switch on position

## 16.0.0

### Major Changes

- Update TS to version 5.3.3 and tslib to 2.6.2

- Updated dependencies
  - @guardian/source-react-components@18.0.0
  - @guardian/source-foundations@14.0.0
  - @guardian/libs@16.0.0

## 15.0.0

### Major Changes

- 61afb21: Refactor `ExpandingWrapper` so it can receive an optional theme. This will
  require consumers relying on `cssOverrides` to use the `theme` prop instead. The
  exported exported light (default) and dark themes are compatible with this API.

  ```jsx
  import { css } from '@emotion/react';
  import {
  	ExpandingWrapper,
  	expandingWrapperThemeDefault,
  } from '@guardian/source-react-components-development-kitchen';

  const Before = ({ children }) => (
  	<ExpandingWrapper
  		cssOverrides={css`
  			color: aquamarine;
  		`}
  	>
  		{children}
  	</ExpandingWrapper>
  );

  const After = ({ children }) => (
  	<ExpandingWrapper
  		theme={{
  			...expandingWrapperThemeDefault,
  			'--text': 'aquamarine',
  		}}
  	>
  		{children}
  	</ExpandingWrapper>
  );
  ```

  Uses CSS Custom Properties under the hood.

- 182a659: Refactor `Tabs` so it can receive an optional theme. This will require consumers
  relying on `cssOverrides` to use the `theme` prop instead. The exported exported
  light (default) and dark themes are compatible with this API

  ```tsx
  import { css } from '@emotion/react';
  import {
  	Tabs,
  	tabsThemeDefault,
  } from '@guardian/source-react-components-development-kitchen';

  const Before = () => (
  	<Tabs
  		tabs={tabs}
  		cssOverride={css`
  			border-color: darkbrown;
  		`}
  	/>
  );

  const After = () => (
  	<Tabs
  		tabs={tabs}
  		theme={{ ...tabsThemeDefault, '--border': 'darkbrown' }}
  	/>
  );
  ```

  Uses CSS Custom Properties under the hood.

### Patch Changes

- 3954945: Internals rewritten as read-only. No change for consumers, they are still able
  to provide a mutable data structure, but we guarantee that this component will
  not modify it

## 14.1.0

### Minor Changes

- 214f533: Update FooterLinks component to support ButtonLinks

## 14.0.2

### Patch Changes

- 1b32aeb: Update @babel/core

## 14.0.1

### Patch Changes

- f74fda0: `ToggleSwitch` tick is now centred

## 14.0.0

### Major Changes

- Use latest Guardian packages

## 13.0.2

### Patch Changes

- 5364a4c: Use latest package versions

## 13.0.1

### Patch Changes

- Update build output config

## 13.0.0

### Major Changes

- Update Typescript to v5.1.3 and tslib to v2.5.3

### Patch Changes

- Updated dependencies
  - @guardian/source-react-components@15.0.0
  - @guardian/libs@15.0.0

## 12.1.0

### Minor Changes

- 88c5b36: update styling of NumericInput to match core Source input components

## 12.0.1

### Major Changes

- 313f8c0: Update form component border styles. This breaking change will only affect consumers not using `box-sizing: border-box`. In these circumstances consumers may need to adjust their styling to account for thinner borders.

### Patch Changes

- Updated dependencies [313f8c0]
  - @guardian/source-foundations@11.0.0
  - @guardian/source-react-components@14.0.0

## 11.0.0

### Major Changes

- Update React to v18

### Patch Changes

- Updated dependencies
  - @guardian/source-react-components@13.0.0

## 10.0.1

### Patch Changes

- 0d092ef: Tabs should fit their content rather than be a fixed height

## 10.0.0

### Major Changes

- Now requires TypeScript ~4.9.5 (if you use it with TypeScript).

### Patch Changes

- Updated dependencies
  - @guardian/libs@14.0.0
  - @guardian/source-foundations@10.0.0
  - @guardian/source-react-components@12.0.0

## 9.2.1

### Patch Changes

- b1dd060: `ToggleSwitch` is now perfectly aligned.

## 9.2.0

### Minor Changes

- 7f01b52: Allow tab titles to be nodes or text

## 9.1.0

### Minor Changes

- d7684da: Update the styling of the Expanding Wrapper

## 9.0.0

### Major Changes

- c6366dd: Add `tslib@^2.4.1` to peerDependencies

## 8.2.6

### Patch Changes

- 05e2e44: Updates the tab styling so that single tabs get 2 rounded corners

## 8.2.5

### Patch Changes

- 7cd6f21: Bump tslib to v2.4.1

## 8.2.4

### Patch Changes

- cf437f9: Bump @guardian/source-foundations to v8
- Updated dependencies [cf437f9]
  - @guardian/source-react-components@10.0.1

## 8.2.3

### Patch Changes

- d742b50: Bump @guardian/libs to 12.0.0

## 8.2.2

### Patch Changes

- 0fcf574: ExpandingWrapper - update styling and allow cssOverrides

## 8.2.1

### Patch Changes

- c882f90: Update styling for expanding wrapper
- 6ae535a: Update fileinput styling and add hover styling

## 8.2.0

### Minor Changes

- dd7d638: Add a new tab component

### Patch Changes

- dc6ab65: Update styling of FileInput after UX review

## 8.1.0

### Minor Changes

- d098baa: Add the FileInput component

## 8.0.0

### Major Changes

- eb65fde: Add `typescript@^4.3.2` to `peerDependecies` (`optional`).

  This should mean you get a warning if you're using an incompatible version of typescript, but not if you aren't using it at all.

### Patch Changes

- Updated dependencies [eb65fde]
  - @guardian/libs@11.0.0
  - @guardian/source-foundations@8.0.0
  - @guardian/source-react-components@10.0.0

## 7.1.2

### Patch Changes

- c616be8: Links in docs updated to point at csnx instead of the archived Source repo

## 7.1.1

### Patch Changes

- 6d06f5b: Export AgeWarning component

## 7.1.0

### Minor Changes

- c4e1b7f: Adding AgeWarning component in kitchen which inserts a yellow warning banner on the page showing how old the content is

## 7.0.2

### Patch Changes

- a442275: Declare compatability with `@guardian/libs@^10.0.0`

## 7.0.1

### Patch Changes

- 2033774: No op to test release process

## 7.0.0

### Major Changes

- f83640ca: Visually hide StarRating's `<figcaption>` element

### Minor Changes

- f83640ca: Remove aria-role=complementary from StarRating

### Patch Changes

- 28af724b: The expanding wrapper should manage the tabIndex of child nodes when the wrapper is collapsed
- f83640ca: Change StarRating caption for 0 stars from 'zero star' to 'zero stars'

## 6.1.2

### Patch Changes

- fada52db: Add theming and a dark theme to the Expanding Wrapper

## 6.1.1

### Patch Changes

- c6e1a9b9: Export the Expanding Wrapper

## 6.1.0

### Minor Changes

- febd9d2c: Adds an expanding wrapper component

## 6.0.3

### Patch Changes

- 11333bf1: fix issue with error and success state display on NumericInput component

## 6.0.2

### Patch Changes

- 1143ed83: Fix bug with `ToggleSwitch` useEffect browser check

## 6.0.1

### Patch Changes

- 1f218bf6: Update focus styles for `ToggleSwitch`

## 6.0.0

### Major Changes

- aa4c2caa: Bump @guardian/libs to `^9.0.0`

## 5.0.0

### Major Changes

- Updated `peerDependencies` [905c5148]
  - @guardian/source-foundations@7.0.0
  - @guardian/source-react-components@9.0.0
- d9e94ef1: `ToggleSwitch` no longer contains iOS and Android versions
  - adds a new `ToggleSwitchApps` component to use instead
- 7b99c758:
  - passing a `format` prop to `ToggleSwitch` renders an alternative colour scheme suitable for use on coloured backgrounds
  - `FontWeight` in `ToggleSwitch` is now limited to `regular` and `bold` and controlled via a `fontWeight` prop
  - `FontSize` in `ToggleSwitch` is now limited to `small` and regular and controlled via a `fontSize` prop
  - adds a new `labelBorder` prop to `ToggleSwitch`
- 676f6f07: Removes unused 'tooltip' prop from `ToggleSwitch` component.

### Minor Changes

- 4cdc3016: Add `NumericInput` component.

### Patch Changes

- 2010337c: Show a focus ring when tabbing to a `ToggleSwitch`

## 4.0.1

### Patch Changes

- 40e41a43: **No changes**: Patch bump to fix deploy to npm due to the major version already having been published and deleted

## 4.0.0

### Patch Changes

- Updated dependencies [3823490a]
  - @guardian/source-foundations@6.0.0
  - @guardian/source-react-components@8.0.0

## 3.1.10

### Patch Changes

- bbbe1e3e: make BackToTop an explicit export of source-react-components so it can be used in the FooterWithContents dev kitchen component

## 3.1.9

### Patch Changes

- 4ef91d3c: noop - ignore this

## 3.1.8

### Patch Changes

- e1524b0b: noop - ignore this safely

## 3.1.7

### Patch Changes

- 6e1958c7: Noop - this can be ignored

## 3.1.6

### Patch Changes

- e45b80b1: noop to test release - you can ignore this

## 3.1.5

### Patch Changes

- e6d86ab6: noop to test release again - you can ignore this release

## 3.1.4

### Patch Changes

- f4522bd4: noop to test release again - you can ignore this release

## 3.1.3

### Patch Changes

- e3a3c742: noop to test releases – you can ignore this version

## 3.1.2

### Patch Changes

- 6ff6fede: noop to test pipeline - ignore this release

## 3.1.1

### Patch Changes

- 430276ce: Noop to test release pipeline

## 3.1.0

### Minor Changes

- c7afdedb: add FooterWithContents and FooterLinks components

## 3.0.0

### Patch Changes

- Updated dependencies [12a9fce5]
- Updated dependencies [8e8535ba]
  - @guardian/source-react-components@7.0.0

## 2.0.0

### Patch Changes

- Updated dependencies [07bfaf1b]
- Updated dependencies [78ff24be]
- Updated dependencies [fd69cf60]
  - @guardian/source-react-components@6.0.0

## 1.0.1

### Patch Changes

- 32ca5c1e: Add tooltip to ToggleSwitch

## 1.0.0

Contributions to this package have stabilised, and the release process seems like it will fit a standard semver pattern.

So to accompany the major version releases to its peer deps, the dev kitchen is also moving to v1.

### Patch Changes

- Updated dependencies [b87baf5c]
- Updated dependencies [94a6de68]
- Updated dependencies [1e129d0b]
- Updated dependencies [d55bc4b6]
- Updated dependencies [ef458f83]
- Updated dependencies [8bd1adce]
- Updated dependencies [a5a14a49]
- Updated dependencies [51f8737e]
- Updated dependencies [f6865ac5]
- Updated dependencies [c37e5be9]
- Updated dependencies [34ec716d]
  - @guardian/source-foundations@5.0.0
  - @guardian/source-react-components@5.0.0

## 0.0.36

### Patch Changes

- 0dc5d08e: Empty release to test release process

## 0.0.35

### Patch Changes

- 56471081: Use an SVG to render straight lines, too.
- 96510c75: StarRating uses pure SVG instead of a background-image.
- 56471081: Drop the background-image repeating css rules in favour of pure SVG patterns that can fill up to our largest breakpoint of 1300px.

## 0.0.34

### Patch Changes

- 0e938355: Add optional id prop on ToggleSwitch
- 742bd7c2: Add optional LabelPosition prop to Toggle Switch

## 0.0.33

### Patch Changes

- 7fbe272a: Remove margin from ToggleSwitch component

## 0.0.32

### Patch Changes

- 45d4d8df: React minimum version is 17.0.1 (instead of 17.0.0)
- 71148ecf: Stop publishing packages as single files, so they can be properly tree-shaken.
- 5935b4fe: Fixes styling on toggle switch and adds clickable label
- Updated dependencies [45d4d8df]
- Updated dependencies [71148ecf]
  - @guardian/source-react-components@4.0.2
  - @guardian/source-foundations@4.0.3

## 0.0.31

### Patch Changes

- 29b6a907: No-op to test changesets again

## 0.0.30

### Patch Changes

- c0967fb6: No-op to test changesets
