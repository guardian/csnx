import type { Theme } from '../@types/Theme';
import type { ThemeLabel } from './theme';
import { themeLabel as defaultTheme } from './theme';

export const combineLabelThemes = (
	providerTheme: Theme['label'],
	themeProp?: Partial<ThemeLabel>,
): ThemeLabel => {
	return {
		...defaultTheme,
		...providerTheme,
		...themeProp,
	};
};
