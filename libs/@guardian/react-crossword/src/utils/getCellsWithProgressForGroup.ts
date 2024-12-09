import { isUndefined } from '@guardian/libs';
import type { CAPIEntry } from '../@types/CAPI';
import type { Cell, Cells, Entries, Progress } from '../@types/crossword';

export type CellWithProgress = Cell & {
	progress: string;
	separator?: ',' | '-';
};
export type CellsWithProgress = CellWithProgress[];

export const getCellsWithProgressForGroup = ({
	entry,
	entries,
	cells,
	progress,
}: {
	entry?: CAPIEntry;
	entries: Entries;
	cells: Cells;
	progress: Progress;
}) => {
	const groupProgress: CellsWithProgress = [];
	if (isUndefined(entry)) {
		return groupProgress;
	}
	for (const entryId of entry.group) {
		const entry = entries.get(entryId);
		if (!isUndefined(entry)) {
			groupProgress.push(
				...getCellsWithProgressForEntry({ entry, cells, progress }),
			);
		}
	}
	return groupProgress;
};

export const getCellsWithProgressForEntry = ({
	entry,
	cells,
	progress,
}: {
	entry: CAPIEntry;
	cells: Cells;
	progress: Progress;
}): CellsWithProgress => {
	const cellsWithProgress: CellsWithProgress = [];
	for (let i = 0; i < entry.length; i++) {
		const x =
			entry.direction === 'across' ? entry.position.x + i : entry.position.x;
		const y =
			entry.direction === 'across' ? entry.position.y : entry.position.y + i;

		const cell = cells.getByCoords({ x, y });
		if (cell) {
			cellsWithProgress.push({
				...cell,
				progress: progress.at(x)?.[y] ?? '',
				separator: getSeparatorFromEntry(entry, i),
			});
		}
	}

	return cellsWithProgress;
};

const getSeparatorFromEntry = (
	entry: CAPIEntry,
	index: number,
): ',' | '-' | undefined => {
	const separators = entry.separatorLocations;
	for (const [separator, locations] of Object.entries(separators)) {
		if (locations.includes(index + 1)) {
			return separator === '-' ? '-' : ',';
		}
	}
	return undefined;
};
