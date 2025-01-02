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

const ShowAnagramHelperContext = createContext<Context | undefined>(undefined);

export const ShowAnagramHelperProvider = ({
	children,
	userShowAnagramHelper = false,
}: {
	children: ReactNode;
	userShowAnagramHelper?: boolean;
}) => {
	const [showAnagramHelper, setShowAnagramHelper] = useState(
		userShowAnagramHelper,
	);

	const toggleAnagramHelper = useCallback(() => {
		setShowAnagramHelper((prev) => !prev);
	}, [setShowAnagramHelper]);

	return (
		<ShowAnagramHelperContext.Provider
			value={{ showAnagramHelper, setShowAnagramHelper, toggleAnagramHelper }}
		>
			{children}
		</ShowAnagramHelperContext.Provider>
	);
};

export const useShowAnagramHelper = () => {
	const context = useContext(ShowAnagramHelperContext);

	if (!context) {
		throw new Error(
			'ShowAnagramHelperContext does not exist. Have you used a Crossword subcomponent outside a Crossword component?',
		);
	}

	return context;
};
