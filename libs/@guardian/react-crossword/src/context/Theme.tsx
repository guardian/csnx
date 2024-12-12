import { createContext, type ReactNode, useContext } from 'react';
import type { Theme } from '../@types/crossword';

const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider = ({
	theme,
	children,
}: {
	theme: Theme;
	children: ReactNode;
}) => {
	return (
		<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error(
			'ThemeContext does not exist. Have you used a Crossword subcomponent outside a Crossword component?',
		);
	}

	return context;
};
