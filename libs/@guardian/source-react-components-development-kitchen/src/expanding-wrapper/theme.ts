import type { Theme as EmotionTheme } from '@emotion/react';
import { palette } from '@guardian/source-foundations';

export const expandingWrapperThemeDefault = {
	expander: {
		background: palette.neutral[97],
		horizontalRules: palette.neutral[86],
		border: palette.neutral[7],
		expandBackground: palette.neutral[7],
		expandBackgroundHover: '#454545', // One-off colour  to match the primary button hover
		expandText: palette.neutral[100],
		collapseBackground: palette.neutral[100],
		collapseBackgroundHover: '#E5E5E5', // One-off colour variant to match tertiary button hover
		collapseText: palette.neutral[7],
		collapseTextHover: palette.neutral[7],
	},
};
export const expandingWrapperDarkTheme = {
	expander: {
		background: palette.neutral[20],
		horizontalRules: palette.neutral[60],
		border: palette.neutral[60],
		expandBackground: palette.neutral[86],
		expandBackgroundHover: palette.neutral[100],
		expandText: palette.neutral[7],
		collapseBackground: palette.neutral[10],
		collapseText: palette.neutral[86],
		collapseBackgroundHover: palette.neutral[86],
		collapseTextHover: palette.neutral[7],
	},
};

export interface Theme extends EmotionTheme {
	expander?: typeof expandingWrapperThemeDefault.expander;
}
