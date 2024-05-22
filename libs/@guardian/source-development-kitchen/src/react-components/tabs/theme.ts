import { palette } from '@guardian/source-foundations';

export const tabsThemeDefault = {
	['--background']: palette.neutral[97],
	['--text']: palette.neutral[7],
	['--border']: palette.neutral[60],
	['--inactiveBackground']: palette.neutral[86],
};
export const tabsDarkTheme = {
	['--background']: palette.neutral[20],
	['--text']: palette.neutral[97],
	['--border']: palette.neutral[60],
	['--inactiveBackground']: palette.neutral[7],
};

/** enforce valid custom properties for this component */
export const tabThemeColour = (key: keyof typeof tabsThemeDefault) =>
	`var(${key})`;

export type Theme = Record<keyof typeof tabsThemeDefault, string>;
