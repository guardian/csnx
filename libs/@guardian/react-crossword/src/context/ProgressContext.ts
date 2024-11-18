import { createContext } from 'react';
import type { useProgress } from '../hooks/useProgress';

type Hook = ReturnType<typeof useProgress>;

type Context = {
	progress: Hook[0];
	setProgress: Hook[1];
	updateProgress: Hook[2];
	clearProgress: Hook[3];
};

export const ProgressContext = createContext<Context>({
	progress: [],
	setProgress: () => console.log('setProgress not provided to context!!'),
	updateProgress: () => console.log('updateProgress not provided to context!!'),
	clearProgress: () => console.log('clearProgress not provided to context!!'),
});
