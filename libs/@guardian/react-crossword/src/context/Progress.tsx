import { log } from '@guardian/libs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createContext, type ReactNode, useContext } from 'react';
import type { LocalStorageOptions } from 'use-local-storage-state';
import useLocalStorageState from 'use-local-storage-state';
import type { CAPICrossword } from '../@types/CAPI';
import type { Dimensions, Progress } from '../@types/crossword';
import { getNewProgress } from '../utils/getNewProgress';

export const serializer: LocalStorageOptions<unknown>['serializer'] = {
	stringify: (_) => JSON.stringify({ value: _ }),
	parse: (_) => (JSON.parse(_) as { value: unknown }).value,
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
	updateProgress: (newProgress: Progress) => void;
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
	const defaultValue = getInitialProgress({ id, dimensions, userProgress });

	// The localStorage state (managed by useLocalStorageState) does not use React state
	// so updates to it do not always trigger a re-render - this behavior is particularly noticeable in Preact.
	// To ensure the UI is kept up-to-date, we maintain a separate React state (`progress`) that mirrors
	// the localStorage state and forces the necessary re-renders.
	const [progress, setProgress] = useState(defaultValue);
	// Make local storage compatible with prev versions
	const [storedProgress, setStoredProgress, rest] =
		useLocalStorageState<Progress>(`crosswords.${id}`, {
			defaultValue,
			serializer,
		});

	const updateProgress = useCallback(
		(newProgress: Progress) => {
			setStoredProgress(newProgress);
			setProgress(newProgress);
		},
		[setStoredProgress],
	);

	useEffect(() => {
		if (isValid(storedProgress, { dimensions })) {
			// eslint-disable-next-line react-hooks/set-state-in-effect -- TODO: investigate how to fix this
			setProgress(storedProgress);
		} else {
			updateProgress(defaultValue);
		}
	}, [defaultValue, dimensions, storedProgress, updateProgress]);

	const contextValue = useMemo(
		() => ({
			progress,
			updateProgress,
			isStored: rest.isPersistent,
		}),
		[progress, updateProgress, rest.isPersistent],
	);

	return (
		<ProgressContext.Provider value={contextValue}>
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
