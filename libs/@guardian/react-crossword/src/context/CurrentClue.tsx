import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { createContext, type ReactNode, useContext } from 'react';
import type { CAPICrossword } from '../@types/CAPI';
import type { EntryID } from '../@types/Entry';

type Context = {
	currentEntryId?: EntryID;
	setCurrentEntryId: Dispatch<SetStateAction<EntryID | undefined>>;
};

const CurrentClueContext = createContext<Context | undefined>(undefined);

export const CurrentClueProvider = ({
	children,
	entries,
}: {
	entries: CAPICrossword['entries'];
	children: ReactNode;
}) => {
	const [currentEntryId, setCurrentEntryId] = useState<EntryID | undefined>(
		entries[0].id,
	);

	return (
		<CurrentClueContext.Provider value={{ currentEntryId, setCurrentEntryId }}>
			{children}
		</CurrentClueContext.Provider>
	);
};

export const useCurrentClue = () => {
	const context = useContext(CurrentClueContext);

	if (!context) {
		throw new Error(
			'CurrentClueContext does not exist. Have you used a Crossword subcomponent outside a Crossword component?',
		);
	}

	return context;
};
