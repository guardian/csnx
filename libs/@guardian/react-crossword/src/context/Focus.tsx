import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useState,
} from 'react';
import type { Direction } from '../@types/Direction';

export type FocusTarget = Direction | 'grid' | 'controls' | 'application';

type Context = {
	currentFocus?: FocusTarget;
	focusOn: (target: FocusTarget) => void;
};

export const focusTargets: FocusTarget[] = [
	'application',
	'across',
	'grid',
	'down',
	'controls',
] as const;

const FocusContext = createContext<Context | undefined>(undefined);

export const FocusProvider = ({ children }: { children: ReactNode }) => {
	const [currentFocus, setCurrentFocus] = useState<FocusTarget | undefined>(
		undefined,
	);

	const focusOn = useCallback((target: FocusTarget) => {
		setCurrentFocus(target);
	}, []);

	return (
		<FocusContext.Provider value={{ currentFocus, focusOn }}>
			{children}
		</FocusContext.Provider>
	);
};

export const useFocus = () => {
	const context = useContext(FocusContext);

	if (!context) {
		throw new Error(
			'FocusContext does not exist. Have you used a Crossword subcomponent outside a Crossword component?',
		);
	}

	return context;
};
