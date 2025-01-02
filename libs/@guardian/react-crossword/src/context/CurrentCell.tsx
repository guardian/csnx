import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { createContext, type ReactNode, useContext } from 'react';
import type { Cell } from '../@types/crossword';

type Context = {
	currentCell?: Cell;
	setCurrentCell: Dispatch<SetStateAction<Cell | undefined>>;
};

const CurrentCellContext = createContext<Context | undefined>(undefined);

export const CurrentCellProvider = ({ children }: { children: ReactNode }) => {
	const [currentCell, setCurrentCell] = useState<Cell | undefined>(undefined);

	return (
		<CurrentCellContext.Provider value={{ currentCell, setCurrentCell }}>
			{children}
		</CurrentCellContext.Provider>
	);
};

export const useCurrentCell = () => {
	const context = useContext(CurrentCellContext);

	if (!context) {
		throw new Error(
			'CurrentCellContext does not exist. Have you used a Crossword subcomponent outside a Crossword component?',
		);
	}

	return context;
};
