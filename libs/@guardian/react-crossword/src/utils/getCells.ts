import type { CAPICrossword, CAPIEntry } from '../@types/CAPI';
import type { Cell } from '../@types/crossword';

export const getCells = (capiCrossword: CAPICrossword): Cell[] => {
	const cellsMap = getCellsMap(capiCrossword);

	return Array.from(cellsMap, ([, cell]) => cell);
};

export const getCellsMap = ({
	entries,
	dimensions,
}: CAPICrossword): Map<string, Cell> => {
	const cells: Map<string, Cell> = getCellForEntry(entries);
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
	cells: Map<string, Cell>;
	rows: number;
	cols: number;
}): Map<string, Cell> => {
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
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

const getCellForEntry = (entries: CAPIEntry[]): Map<string, Cell> => {
	// cells array key "x1y1" value Cell
	const cellMap: Map<string, Cell> = new Map<string, Cell>();
	entries.forEach((entry) => {
		for (let i = 0; i < entry.length; i += 1) {
			const across = entry.direction === 'across';
			const col = across ? entry.position.x + i : entry.position.x;
			const row = across ? entry.position.y : entry.position.y + i;

			const currentCell = cellMap.get(`x${col}y${row}`);

			if (currentCell === undefined) {
				// add cell
				const newCell: Cell = {
					group: [entry.id],
					number: i === 0 ? entry.number : undefined,
					x: col,
					y: row,
					solution: entry.solution?.[i],
				};
				cellMap.set(`x${col}y${row}`, newCell);
			} else {
				currentCell.number = i === 0 ? entry.number : currentCell.number;
				if (currentCell.group) {
					currentCell.group = [...currentCell.group, entry.id];
				}
			}
		}
	});
	return cellMap;
};
