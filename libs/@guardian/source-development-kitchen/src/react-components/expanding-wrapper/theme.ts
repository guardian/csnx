import { palette } from '@guardian/source-foundations';

export const expandingWrapperThemeDefault = {
	['--text']: palette.neutral[7],
	['--background']: palette.neutral[97],
	['--horizontalRules']: palette.neutral[86],
	['--border']: palette.neutral[7],
	['--expandBackground']: palette.neutral[7],
	['--expandBackgroundHover']: '#454545', // One-off colour  to match the primary button hover
	['--expandText']: palette.neutral[100],
	['--collapseBackground']: palette.neutral[100],
	['--collapseBackgroundHover']: '#E5E5E5', // One-off colour variant to match tertiary button hover
	['--collapseText']: palette.neutral[7],
	['--collapseTextHover']: palette.neutral[7],
};

export const expandingWrapperDarkTheme = {
	['--text']: palette.neutral[86],
	['--background']: palette.neutral[20],
	['--horizontalRules']: palette.neutral[60],
	['--border']: palette.neutral[60],
	['--expandBackground']: palette.neutral[86],
	['--expandBackgroundHover']: palette.neutral[100],
	['--expandText']: palette.neutral[7],
	['--collapseBackground']: palette.neutral[10],
	['--collapseText']: palette.neutral[86],
	['--collapseBackgroundHover']: palette.neutral[86],
	['--collapseTextHover']: palette.neutral[7],
};

/** enforce valid custom properties for this component */
export const themeColour = (key: keyof typeof expandingWrapperThemeDefault) =>
	`var(${key})`;

export type Theme = Record<keyof typeof expandingWrapperThemeDefault, string>;
