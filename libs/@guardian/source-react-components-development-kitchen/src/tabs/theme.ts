import type { Theme as EmotionTheme } from '@emotion/react';
import { palette } from '@guardian/source-foundations';

export const tabsThemeDefault = {
	tabs: {
		background: palette.neutral[97],
		text: palette.neutral[7],
		border: palette.neutral[60],
		inactiveBackground: palette.neutral[86],
	},
};
export const tabsDarkTheme = {
	tabs: {
		background: palette.neutral[20],
		text: palette.neutral[97],
		border: palette.neutral[60],
		inactiveBackground: palette.neutral[7],
	},
};

export interface Theme extends EmotionTheme {
	tabs?: typeof tabsThemeDefault.tabs;
}
