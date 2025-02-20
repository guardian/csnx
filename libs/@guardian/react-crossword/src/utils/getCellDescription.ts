import { isUndefined } from '@guardian/libs';
import type { CAPIEntry } from '../@types/CAPI';
import type { Cell, Entries } from '../@types/crossword';
import { formatClueForScreenReader } from './formatClueForScreenReader';

/**
 * Get the description of a cell in the format
 * in the format " 4-across: Life is in a mess (5 letters)."
 */
export const getCellDescription = (cell: Cell, entries: Entries) => {
	const cellEntryIds = cell.group ?? [];
	const cellNumber = cell.number;
	if (isUndefined(cellNumber)) {
		return undefined;
	}
	const cellRelevantEntryIds = cellEntryIds.filter((id) =>
		id.startsWith(cellNumber.toString()),
	);
	if (cellRelevantEntryIds.length === 0) {
		return undefined;
	}
	return cellRelevantEntryIds
		.map((entryId) => {
			const entry = entries.get(entryId);
			if (entry) {
				return getReadableLabelForCellAndEntry({ entry, cell });
			}
			return undefined;
		})
		.join(' Also, ');
};

/**
 * get the readable label for a cell and entry combination
 * in the format " 4-across: Life is in a mess (5 letters)."
 */
const getReadableLabelForCellAndEntry = ({
	entry,
}: {
	entry: CAPIEntry;
	cell: Cell;
}): string => {
	return `${entry.id}: ${formatClueForScreenReader(entry.clue)}`;
};
