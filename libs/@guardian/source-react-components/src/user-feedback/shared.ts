import type { Theme } from '../@types/Theme';
import { mergeThemes } from '../utils/themes';
import type { ThemeUserFeedback } from './theme';
import { themeUserFeedback as defaultTheme } from './theme';

export const mergedTheme = (
	providerTheme: Theme['userFeedback'],
	themeProp?: Partial<ThemeUserFeedback>,
): ThemeUserFeedback =>
	mergeThemes<ThemeUserFeedback, Theme['userFeedback']>(
		defaultTheme,
		themeProp,
		providerTheme,
	);
