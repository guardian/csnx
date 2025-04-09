import type { Dispatch, SetStateAction } from 'react';
import { createContext, type ReactNode, useContext, useState } from 'react';

type Context = {
	focusGrid: boolean;
	setFocusGrid: Dispatch<SetStateAction<boolean>>;
};

const FocusGridContext = createContext<Context | undefined>(undefined);

export const FocusGridProvider = ({ children }: { children: ReactNode }) => {
	const [focusGrid, setFocusGrid] = useState(false);

	return (
		<FocusGridContext.Provider value={{ focusGrid, setFocusGrid }}>
			{children}
		</FocusGridContext.Provider>
	);
};

export const useFocusGrid = () => {
	const context = useContext(FocusGridContext);

	if (!context) {
		throw new Error(
			'FocusGridContext does not exist. Have you used a Crossword subcomponent outside a Crossword component?',
		);
	}

	return context;
};
