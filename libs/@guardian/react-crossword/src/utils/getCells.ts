import type { CAPICrossword, CAPIEntry } from '../@types/CAPI';
import type { Cell, Cells } from '../@types/crossword';

export const getCells = ({ entries, dimensions }: CAPICrossword): Cells => {
	const cells: Cells = getCellForEntry(entries);
	// add cells for separators
	return fillSeparatorCells({
		cells,
		rows: dimensions.rows,
		cols: dimensions.cols,
	});
};

const fillSeparatorCells = ({
	cells,
	rows,
	cols,
}: {
	cells: Cells;
	rows: number;
	cols: number;
}): Cells => {
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			const currentCell = cells.get(`x${i}y${j}`);
			if (currentCell === undefined) {
				const newCell: Cell = {
					x: i,
					y: j,
				};
				cells.set(`x${i}y${j}`, newCell);
			}
		}
	}
	return cells;
};

const getCellForEntry = (entries: CAPIEntry[]): Cells => {
	const cells: Cells = new Map();
	entries.forEach((entry) => {
		for (let i = 0; i < entry.length; i += 1) {
			const across = entry.direction === 'across';
			const col = across ? entry.position.x + i : entry.position.x;
			const row = across ? entry.position.y : entry.position.y + i;

			const currentCell = cells.get(`x${col}y${row}`);

			if (currentCell === undefined) {
				// add cell
				const newCell: Cell = {
					group: [entry.id],
					number: i === 0 ? entry.number : undefined,
					x: col,
					y: row,
					solution: entry.solution?.[i],
				};
				cells.set(`x${col}y${row}`, newCell);
			} else {
				currentCell.number = i === 0 ? entry.number : currentCell.number;
				if (currentCell.group) {
					currentCell.group = [...currentCell.group, entry.id];
				}
			}
		}
	});
	return cells;
};
