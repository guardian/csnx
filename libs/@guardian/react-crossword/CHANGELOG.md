# @guardian/react-crossword

## 9.0.0

### Patch Changes

- Updated dependencies [559d04f]
  - @guardian/libs@24.0.0

## 8.0.0

### Patch Changes

- Updated dependencies [bef13f1]
- Updated dependencies [f1248c7]
  - @guardian/libs@23.0.0
  - @guardian/source@11.0.0

## 7.0.1

### Patch Changes

- 1bfe15f: fix for moving down with arrow keys

## 7.0.0

### Major Changes

- 3f1442d: Bump @emotion/react to 11.11.4

### Patch Changes

- Updated dependencies [3f1442d]
  - @guardian/source@10.0.0

## 6.3.0

### Minor Changes

- 37cfbcf: Add sunday-quick support to crossword player

## 6.2.0

### Minor Changes

- 728e454: Add the ability to move through the clues using the `[` and `]` keys

## 6.1.0

### Minor Changes

- 4f604da: Bundles `use-local-storage-state` package to enable consumers of the crossword package to transpile if required in order to support older browsers

## 6.0.1

### Patch Changes

- 86eeb73: fix for navigation in small crosswords, when moving down or across the working direction now changes to the direction you move in

## 6.0.0

### Major Changes

- 3125a18: improve accessibility of crossword

## 5.0.0

### Major Changes

- d9fe8b2: remove usage of Array.at() - it is not supported in older browser versions.
- Updated dependencies [29e58ba]
  - @guardian/source@9.0.0

## 4.1.0

### Minor Changes

- 37baa6e: restore "check word" feature to remove incorrect letters from grid

## 4.0.0

### Major Changes

- aeb7ed2: Extends theme to support additional elements and renames some existing keys for consistency and clarity:

  - Adds `gridTextColor` to theme to allow text in the grid to be themed independently of other text
  - Explicitly applies `textColor` to other elements rather than rely on inheritance or `currentColor`
  - Renames `selectedColor` and `connectedColor` to make it clear they apply to background colours
  - Renames `focusedClueBackgroundColour` to standardise spelling as `color`

## 3.0.0

### Major Changes

- 586ab4a: This is a complete rebuild of the React crossword player.

  It includes the following feature:

  - Renders crossword grid and clues
  - Supports hyphenated and multiple-word answers
  - Supports grouped clues that span multiple columns or rows
  - Layout is responsive (and customisable via the `Layout` prop)
  - Progress is automatically saved to local storage
  - Answers can be checked and revealed
  - Smart clearing when checking answers that strikes through incorrect letters
  - Includes an anagram helper
  - Crossword is accessible by default: elements in the crossword are clearly labelled to communicate context and state to assistive technology
  - Fully keyboard accessible: users can tab between the grid, clues and controls, and navigate around these with the arrow keys
  - Includes print styles
  - Supports theming and custom colour schemes

## 2.0.2

### Patch Changes

- dd9390a: Remove bean and update fastdom usages

## 2.0.1

### Patch Changes

- e272e51: Tackled all remaining dependabot issues
- 0a5d815: Swap sass-lint for stylelint to remove a critical vulnerability

## 2.0.0

### Major Changes

- cc1e576: Makes Fastdom work again and makes a styling change that may break non Edition styling

## 1.3.1

### Patch Changes

- 1573a38: add quick-cryptic grid size value
- 7544959: Display multiline instructions on multiple lines
- 3142d50: Support formatted instructions
- 1ecbf7f: Fix SVG import and ref usage

## 1.3.0

### Minor Changes

- 91dec91: Run build script before publishing

## 1.2.0

### Minor Changes

- c18ce10: Update to all dependencies

### Patch Changes

- c298d6a: Fixing the release process

## 1.1.0

### Minor Changes

- 6f71ddc: Update to all dependencies and moving across to Parcel from Webpack
