import type { Dispatch, SetStateAction } from 'react';
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useState,
} from 'react';

type Context = {
	showAnagramHelper: boolean;
	setShowAnagramHelper: Dispatch<SetStateAction<boolean>>;
	toggleAnagramHelper: () => void;
};

const UIStateContext = createContext<Context | undefined>(undefined);

export const UIStateProvider = ({ children }: { children: ReactNode }) => {
	const [showAnagramHelper, setShowAnagramHelper] = useState(false);

	const toggleAnagramHelper = useCallback(() => {
		setShowAnagramHelper((prev) => !prev);
	}, [setShowAnagramHelper]);

	return (
		<UIStateContext.Provider
			value={{ showAnagramHelper, setShowAnagramHelper, toggleAnagramHelper }}
		>
			{children}
		</UIStateContext.Provider>
	);
};

export const useUIState = () => {
	const context = useContext(UIStateContext);

	if (!context) {
		throw new Error(
			'UIStateContext does not exist. Have you used a Crossword subcomponent outside a Crossword component?',
		);
	}

	return context;
};
