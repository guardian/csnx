# @guardian/react-crossword

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
