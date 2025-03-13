---
'@guardian/react-crossword': major
---

Extends theme to support additional elements and renames some existing keys for consistency and clarity:

- Adds `gridTextColor` to theme to allow text in the grid to be themed independently of other text
- Explicitly applies `textColor` to other elements rather than rely on inheritance or `currentColor`
- Renames `selectedColor` and `connectedColor` to make it clear they apply to background colours
- Renames `focusedClueBackgroundColour` to standardise spelling as `color`
