import { isUndefined } from '@guardian/libs';
import type { CAPIEntry } from '../@types/CAPI';
import type { Coords, Entries, Progress } from '../@types/crossword';

export type GroupProgress = {
	coords: Coords;
	progress: string;
};

export const getProgressForGroup = (
	entry: CAPIEntry,
	entries: Entries,
	progress: Progress,
) => {
	const groupProgress: GroupProgress[] = [];
	for (const entryId of entry.group) {
		const entry = entries.get(entryId);
		if (!isUndefined(entry)) {
			groupProgress.push(...getProgressForEntry(entry, progress));
		}
	}
	return groupProgress;
};
export const getProgressForEntry = (
	entry: CAPIEntry,
	progress: Progress,
): GroupProgress[] => {
	return Array.from({ length: entry.length }, (_, i) => {
		const x =
			entry.direction === 'across' ? entry.position.x + i : entry.position.x;
		const y =
			entry.direction === 'across' ? entry.position.y : entry.position.y + i;
		return { coords: { x, y }, progress: progress.at(x)?.[y] ?? '' };
	});
};

export const getSeparatorFromEntry = (
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
