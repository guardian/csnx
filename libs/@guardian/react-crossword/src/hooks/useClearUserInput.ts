import { useCallback } from 'react';
import { useData } from '../context/Data';
import { useProgress } from '../context/Progress';
import { useValidAnswers } from '../context/ValidAnswers';
import { getNewProgress } from '../utils/getNewProgress';

export const useClearUserInput = () => {
	const { updateProgress } = useProgress();
	const { dimensions } = useData();
	const { setValidAnswers } = useValidAnswers();

	const clearUserInput = useCallback(() => {
		updateProgress(getNewProgress(dimensions));
		setValidAnswers(new Set());
	}, [dimensions, setValidAnswers, updateProgress]);
	return { clearUserInput };
};
