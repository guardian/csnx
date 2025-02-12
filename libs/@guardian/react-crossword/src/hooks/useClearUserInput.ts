import { useCallback } from 'react';
import { useData } from '../context/Data';
import { useProgress } from '../context/Progress';
import { useValidAnswers } from '../context/ValidAnswers';
import { getNewProgress } from '../utils/getNewProgress';

export const useClearUserInput = () => {
	const { setProgress } = useProgress();
	const { dimensions } = useData();
	const { setValidAnswers, setInvalidCellAnswers } = useValidAnswers();

	const clearUserInput = useCallback(() => {
		setProgress(getNewProgress(dimensions));
		setValidAnswers(new Set());
		setInvalidCellAnswers(new Set());
	}, [setProgress, dimensions, setValidAnswers, setInvalidCellAnswers]);
	return { clearUserInput };
};
