---
'@guardian/react-crossword': major
---

This is a complete rebuild of the React crossword player.

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
