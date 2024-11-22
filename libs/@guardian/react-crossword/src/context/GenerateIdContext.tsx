import { createContext, useCallback } from 'react';
import type { Crossword } from '../@types/crossword';

export const GenerateIdContext = createContext((_: string) => _);

export const GenerateIdProvider = ({
	id,
	children,
}: {
	id: Crossword['id'];
	children: React.ReactNode;
}) => {
	const generateId = useCallback((_: string) => `${_}-${id}`, [id]);

	return (
		<GenerateIdContext.Provider value={generateId}>
			{children}
		</GenerateIdContext.Provider>
	);
};
