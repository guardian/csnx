import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useContext,
	useState,
} from 'react';

export type Controls = {
	showAnagramHelper?: boolean;
};

type Context = {
	currentControls: Controls;
	setCurrentControls: Dispatch<SetStateAction<Controls>>;
};

const ControlsContext = createContext<Context | undefined>(undefined);

export const ControlsProvider = ({ children }: { children: ReactNode }) => {
	const [currentControls, setCurrentControls] = useState<Controls>({});

	return (
		<ControlsContext.Provider value={{ currentControls, setCurrentControls }}>
			{children}
		</ControlsContext.Provider>
	);
};

export const useCurrentControls = () => {
	const context = useContext(ControlsContext);

	if (!context) {
		throw new Error(
			'ControlsContext does not exist. Have you used a Crossword subcomponent outside a Crossword component?',
		);
	}

	return context;
};
