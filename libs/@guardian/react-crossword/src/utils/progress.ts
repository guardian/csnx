import { isString, log, storage } from '@guardian/libs';
import type { Dimensions, Progress } from '../@types/crossword';

export type GetStoredProgressProps = {
	dimensions: Dimensions;
	id: string;
};

export const getEmptyProgress = (dimensions: Dimensions): Progress => {
	return Array.from({ length: dimensions.cols }, () =>
		Array.from({ length: dimensions.rows }, () => ''),
	);
};

export const saveProgress = ({
	id,
	progress,
}: {
	id: string;
	progress: Progress;
}) => {
	storage.local.set(id, JSON.stringify(progress));
};

export const getStoredProgress = ({
	id,
	dimensions,
}: GetStoredProgressProps): Progress | undefined => {
	const storedProgress = storage.local.get(id);
	if (isString(storedProgress)) {
		const parsedProgress = JSON.parse(storedProgress) as unknown;
		if (isValidProgress(parsedProgress, dimensions)) {
			return parsedProgress;
		}
	}
	return undefined;
};

export const isValidProgress = (
	progress: unknown,
	dimensions: Dimensions,
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
