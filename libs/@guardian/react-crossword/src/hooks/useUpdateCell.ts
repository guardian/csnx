import { isUndefined } from '@guardian/libs';
import { useCallback } from 'react';
import type { Coords } from '../@types/crossword';
import { useData } from '../context/Data';
import { useProgress } from '../context/Progress';
import { useValidAnswers } from '../context/ValidAnswers';

export const useUpdateCell = () => {
	const { progress, updateProgress } = useProgress();
	const { setValidAnswers, validAnswers } = useValidAnswers();

	const { cells } = useData();

	const updateCell = useCallback(
		({ x, y, value }: Coords & { value: string }) => {
			const cell = cells.getByCoords({ x, y });
			const cellGroup = cell?.group;
			// blank cells have no group
			if (isUndefined(cellGroup)) {
				return;
			}
			const newProgress = [...progress];
			if (isUndefined(newProgress[x])) {
				throw new Error('Invalid x coordinate');
			}

			if (isUndefined(newProgress[x][y])) {
				throw new Error('Invalid y coordinate');
			}

			newProgress[x][y] = value;
			updateProgress(newProgress);

			for (const entryId of cellGroup) {
				if (validAnswers.has(entryId)) {
					setValidAnswers((prev) => {
						const newSet = new Set(prev);
						newSet.delete(entryId);
						return newSet;
					});
				}
			}
		},
		[cells, progress, setValidAnswers, updateProgress, validAnswers],
	);
	return { updateCell };
};
