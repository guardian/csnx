import { isUndefined, log } from '@guardian/libs';
import type { Dispatch, SetStateAction } from 'react';
import { createContext, type ReactNode, useCallback, useContext } from 'react';
import type { CAPICrossword } from '../@types/CAPI';
import type { Coords, Dimensions, Progress } from '../@types/crossword';
import { useStoredState } from '../hooks/useStoredState';

const getNewProgress = (dimensions: Dimensions): Progress => {
	return Array.from({ length: dimensions.cols }, () =>
		Array.from({ length: dimensions.rows }, () => ''),
	);
};

const isValid = (
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
	userProgress,
	dimensions,
}: {
	id: CAPICrossword['id'];
	dimensions: Dimensions;
	userProgress?: Progress;
}) => {
	if (isValid(userProgress, { dimensions })) {
		return userProgress;
	}

	return getNewProgress(dimensions);
};

type Context = {
	progress: Progress;
	setProgress: Dispatch<SetStateAction<Progress | undefined>>;
	setCellProgress: ({ x, y, value }: Coords & { value: string }) => void;
	clearProgress: () => void;
	isStored: boolean;
};

const ProgressContext = createContext<Context | undefined>(undefined);

export const ProgressProvider = ({
	children,
	id,
	dimensions,
	progress: userProgress,
}: {
	id: CAPICrossword['id'];
	dimensions: Dimensions;
	progress?: Progress;
	children: ReactNode;
}) => {
	const [progress, setProgress, { isPersistent }] = useStoredState(id, {
		defaultValue: getInitialProgress({ id, dimensions, userProgress }),
		validator: (progress: unknown) => isValid(progress, { dimensions }),
	});

	const clearProgress = useCallback(() => {
		setProgress(getNewProgress(dimensions));
	}, [dimensions, setProgress]);

	const setCellProgress = useCallback(
		({ x, y, value }: Coords & { value: string }) => {
			const newProgress = [...progress];

			if (isUndefined(newProgress[x])) {
				throw new Error('Invalid x coordinate');
			}

			if (isUndefined(newProgress[x][y])) {
				throw new Error('Invalid y coordinate');
			}

			newProgress[x][y] = value;

			setProgress(newProgress);
		},
		[progress, setProgress],
	);

	return (
		<ProgressContext.Provider
			value={{
				progress,
				setProgress,
				setCellProgress,
				clearProgress,
				isStored: isPersistent,
			}}
		>
			{children}
		</ProgressContext.Provider>
	);
};

export const useProgress = () => {
	const context = useContext(ProgressContext);

	if (!context) {
		throw new Error(
			'ProgressContext does not exist. Have you used a Crossword subcomponent outside a Crossword component?',
		);
	}

	return context;
};
