import { isString, storage } from '@guardian/libs';
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

const isValidProgress = (
	progress: unknown,
	dimensions: Dimensions,
): progress is Progress => {
	//check if progress is an array
	if (!Array.isArray(progress)) {
		console.log('progress is not an array');
		return false;
	}
	//check if progress is an array of length dimensions.cols
	if (progress.length !== dimensions.cols) {
		console.log('progress is not of length dimensions.cols');
		return false;
	}
	//check if each row is an array
	if (!progress.every((row) => Array.isArray(row))) {
		console.log('each row is not an array');
		return false;
	}
	//check if each row is of length dimensions.rows
	return progress.every((row) => row.length === dimensions.rows);
};
