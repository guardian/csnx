import { createContext, type ReactNode, useContext, useState } from 'react';
import type { Direction } from '../@types/Direction';

export type FocusTarget = Direction | 'grid' | 'controls';

type Context = {
	currentFocus?: FocusTarget;
	focusOn: (target: FocusTarget | undefined) => void;
};

export const focusTargets: FocusTarget[] = [
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

	const focusOn = (target: FocusTarget | undefined) => {
		setCurrentFocus(target);
	};

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
