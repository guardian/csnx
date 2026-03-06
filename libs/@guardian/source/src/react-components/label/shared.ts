import type { Theme } from '../@types/Theme';
import { mergeThemes } from '../utils/themes';
import { themeLabel as defaultTheme, type ThemeLabel } from './theme';

export const mergedTheme = (
	providerTheme: Theme['label'],
	themeProp?: Partial<ThemeLabel>,
): ThemeLabel =>
	mergeThemes<ThemeLabel, Theme['label']>(
		defaultTheme,
		themeProp,
		providerTheme,
	);
