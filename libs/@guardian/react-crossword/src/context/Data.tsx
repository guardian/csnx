import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useMemo } from 'react';
import type { CAPICrossword } from '../@types/CAPI';
import type {
	Cells,
	CrosswordEntry,
	Dimensions,
	Entries,
	Separators,
} from '../@types/crossword';
import { parseCrosswordData } from '../utils/parseCrosswordData';

type Context = {
	entries: Entries;
	cells: Cells;
	separators: Separators;
	solutionAvailable: boolean;
	dimensions: Dimensions;
	getId: (id: string) => string;
};

const DataContext = createContext<Context | undefined>(undefined);

export const DataProvider = ({
	entries: CAPIEntries,
	solutionAvailable,
	id,
	dimensions,
	children,
}: {
	solutionAvailable: CAPICrossword['solutionAvailable'];
	id: CAPICrossword['id'];
	dimensions: Dimensions;
	entries: CrosswordEntry[];
	children: ReactNode;
}) => {
	const { entries, cells, separators } = useMemo(
		() => parseCrosswordData({ dimensions, entries: CAPIEntries }),
		[dimensions, CAPIEntries],
	);

	// Utility function to generate unique IDs in the context of a single crossword.
	const getId = useCallback((_: string) => `${_}-${id}`, [id]);

	return (
		<DataContext.Provider
			value={{
				solutionAvailable,
				entries,
				cells,
				separators,
				getId,
				dimensions,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export const useData = () => {
	const context = useContext(DataContext);

	if (!context) {
		throw new Error(
			'DataContext does not exist. Have you used a Crossword subcomponent outside a Crossword component?',
		);
	}

	return context;
};
