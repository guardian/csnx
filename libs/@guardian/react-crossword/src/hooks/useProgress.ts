import { isString, log, storage } from '@guardian/libs';
import { useCallback, useEffect, useState } from 'react';
import type { CAPICrossword } from '../@types/CAPI';
import type { Dimensions, Progress } from '../@types/crossword';

const getEmptyProgress = (dimensions: Dimensions): Progress => {
	return Array.from({ length: dimensions.cols }, () =>
		Array.from({ length: dimensions.rows }, () => ''),
	);
};

const getStoredProgress = ({
	id,
	dimensions,
}: {
	dimensions: Dimensions;
	id: string;
}): Progress | undefined => {
	const storedProgress = storage.local.get(id);
	if (isString(storedProgress)) {
		const parsedProgress = JSON.parse(storedProgress) as unknown;
		if (isValidProgress(parsedProgress, { dimensions })) {
			return parsedProgress;
		}
	}
	return undefined;
};

const isValidProgress = (
	progress: unknown,
	{ dimensions }: { dimensions: Dimensions },
): progress is Progress => {
	//check if progress is an array
	if (!Array.isArray(progress)) {
		log('dotcom', 'Invalid crossword progress - progress is not an array');
		return false;
	}

	//check if progress is an array of length dimensions.cols
	if (progress.length !== dimensions.cols) {
		log(
			'dotcom',
			'Invalid crossword progress - progress is not an array of length dimensions.cols',
		);
		return false;
	}

	//check if each row is an array
	if (!progress.every((row) => Array.isArray(row))) {
		log('dotcom', 'Invalid crossword progress - each row is not an array');
		return false;
	}

	//check if each row is of length dimensions.rows
	if (!progress.every((row) => row.length === dimensions.rows)) {
		log(
			'dotcom',
			'Invalid crossword progress - each row is not of length dimensions.rows',
		);
		return false;
	}

	return true;
};

/**
 * Gets a valid `Progress` instance for a crossword.
 *
 * Return the first of the following that validates:
 * - a user-provided `progress`
 * - a saved instance from local storage
 * - a fresh, empty one
 */
const getInitialProgress = ({
	id,
	userProgress,
	dimensions,
}: {
	id: CAPICrossword['id'];
	dimensions: Dimensions;
	userProgress?: Progress;
}) => {
	if (isValidProgress(userProgress, { dimensions })) {
		return userProgress;
	}

	return (
		getStoredProgress({
			id,
			dimensions,
		}) ?? getEmptyProgress(dimensions)
	);
};

export const useProgress = (data: CAPICrossword, userProgress?: Progress) => {
	const { id, dimensions } = data;

	const [progress, setProgress] = useState<Progress>(
		getInitialProgress({ id, dimensions, userProgress }),
	);

	const clearProgress = useCallback(() => {
		setProgress(getEmptyProgress(dimensions));
	}, [dimensions]);

	const updateProgress = useCallback(
		({ x, y, value }: { x: number; y: number; value: string }) => {
			// call `setProgress` using callback method to make sure the new
			// `progress` state is derived from the current state
			setProgress((progress) => {
				const currentX = progress.at(x);
				if (currentX) {
					const newX = currentX.with(y, value);
					return progress.with(x, newX);
				}
				return progress;
			});
		},
		[setProgress],
	);

	// Keep local storage in sync with progress state
	useEffect(() => {
		storage.local.set(id, JSON.stringify(progress));
	}, [id, progress]);

	// Storage event listener to update progress when another instance of the
	// crossword is updated 'storage' event is fired when localStorage is
	// updated in another tab or window
	const handleLocalStorageEvent = useCallback(
		(event: StorageEvent) => {
			if (event.key === id) {
				const storedProgress = getStoredProgress({
					id,
					dimensions,
				});
				if (storedProgress) {
					setProgress(storedProgress);
				}
			}
		},
		[dimensions, id],
	);

	useEffect(() => {
		window.addEventListener('storage', handleLocalStorageEvent);

		return () => {
			window.removeEventListener('storage', handleLocalStorageEvent);
		};
	}, [handleLocalStorageEvent]);

	return [progress, setProgress, updateProgress, clearProgress] as const;
};
