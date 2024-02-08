import type { Theme } from '../@types/Theme';
import { mergeThemes } from '../utils/themes';
import type { ThemeLabel } from './theme';
import { themeLabel as defaultTheme } from './theme';

export const mergedThemes = (
	providerTheme: Theme['label'],
	themeProp?: Partial<ThemeLabel>,
): ThemeLabel =>
	mergeThemes<ThemeLabel, Theme['label']>(
		defaultTheme,
		themeProp,
		providerTheme,
	);
