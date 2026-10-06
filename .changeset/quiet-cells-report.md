---
'@guardian/react-crossword': minor
---

Add an optional `onProgressChange` prop to `Crossword`. It is called each time the reader changes the grid with the new `progress`, the number of `filledCells`, the `totalCells` and whether the puzzle `isComplete` (every cell holds its solution, always `false` when solutions are not available). It is not called when saved progress is restored on load. The `ProgressChange` type is exported.
