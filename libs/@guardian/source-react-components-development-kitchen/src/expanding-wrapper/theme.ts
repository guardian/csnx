import type { Theme as EmotionTheme } from '@emotion/react';
import { palette } from '@guardian/source-foundations';

export const expandingWrapperThemeDefault = {
	expander: {
		horizontalRules: palette.neutral[86],
		border: palette.brand[400],
		expandBackground: palette.brand[400],
		expandBackgroundHover: '#234B8A', // One-off colour  to match the primary button hover
		expandText: palette.neutral[100],
		collapseBackground: palette.neutral[100],
		collapseBackgroundHover: '#E5E5E5', // One-off colour variant to match tertiary button hover
		collapseText: palette.brand[400],
	},
};
export const expandingWrapperDarkTheme = {
	expander: {
		horizontalRules: palette.neutral[60],
		border: palette.neutral[60],
		expandBackground: palette.neutral[86],
		expandBackgroundHover: palette.neutral[60],
		expandText: palette.neutral[7],
		collapseBackground: palette.neutral[10],
		collapseBackgroundHover: palette.neutral[20],
		collapseText: palette.neutral[86],
	},
};

export interface Theme extends EmotionTheme {
	expander?: typeof expandingWrapperThemeDefault.expander;
}
