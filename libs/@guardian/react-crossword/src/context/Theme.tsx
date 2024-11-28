import { createContext, type ReactNode, useContext, useMemo } from 'react';
import type { Theme } from '../@types/crossword';
import { defaultTheme } from '../theme';

const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider = ({
	theme,
	children,
}: {
	theme?: Partial<Theme>;
	children: ReactNode;
}) => {
	const finalTheme = useMemo<Theme>(
		() => ({ ...defaultTheme, ...theme }),
		[theme],
	);

	return (
		<ThemeContext.Provider value={finalTheme}>{children}</ThemeContext.Provider>
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
