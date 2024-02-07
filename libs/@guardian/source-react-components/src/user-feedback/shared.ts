import type { Theme } from '../@types/Theme';
import type { ThemeUserFeedback } from './theme';
import { themeUserFeedback as defaultTheme } from './theme';

export const combineUserFeedbackThemes = (
	providerTheme: Theme['userFeedback'],
	themeProp?: Partial<ThemeUserFeedback>,
): ThemeUserFeedback => {
	return {
		...defaultTheme,
		...providerTheme,
		...themeProp,
	};
};
