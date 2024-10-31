import type React from 'react';
import type { ReactElement } from 'react';
import { CellsProvider } from './CellsContext';
import { CluesProvider } from './CluesContext';

// Combined GameProvider to provide both CellsContext and CluesContext
export const GameProvider: React.FC<{ children: ReactElement }> = ({
	children,
}) => {
	return (
		<CellsProvider>
			<CluesProvider>{children}</CluesProvider>
		</CellsProvider>
	);
};
