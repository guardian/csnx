import type { Cells, Progress } from '../@types/crossword';

export type ProgressSummary = {
	/** Number of answer cells that contain a letter */
	filledCells: number;
	/** Number of cells that are part of an answer */
	totalCells: number;
	/**
	 * Whether every answer cell contains its solution.
	 *
	 * Always `false` when the solutions are not available, because there is
	 * nothing to compare the grid with.
	 */
	isComplete: boolean;
};

/**
 * Summarises how far the reader has got, comparing each cell with its
 * solution in the same way as the "check" controls do.
 */
export const getProgressSummary = ({
	cells,
	progress,
	solutionAvailable,
}: {
	cells: Cells;
	progress: Progress;
	solutionAvailable: boolean;
}): ProgressSummary => {
	let totalCells = 0;
	let filledCells = 0;
	let correctCells = 0;

	for (const cell of cells.values()) {
		// blank (black) cells have no group and are not part of an answer
		if (cell.group === undefined) {
			continue;
		}

		totalCells += 1;

		const value = progress[cell.x]?.[cell.y];
		if (value !== undefined && value !== '') {
			filledCells += 1;
			if (value === cell.solution) {
				correctCells += 1;
			}
		}
	}

	return {
		filledCells,
		totalCells,
		isComplete:
			solutionAvailable && totalCells > 0 && correctCells === totalCells,
	};
};
