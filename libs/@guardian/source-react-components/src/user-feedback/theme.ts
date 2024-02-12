import { palette } from '@guardian/source-foundations';

export type ThemeUserFeedback = {
	textSuccess: string;
	textError: string;
};

/** @deprecated Use `themeUserFeedback` and component `theme` prop instead of emotion's `ThemeProvider` */
export const userFeedbackThemeDefault = {
	userFeedback: {
		textSuccess: palette.success[400],
		textError: palette.error[400],
	},
};
/** @deprecated Use `themeUserFeedbackBrand` and component `theme` prop instead of emotion's `ThemeProvider` */
export const userFeedbackThemeBrand = {
	userFeedback: {
		textSuccess: palette.success[500],
		textError: palette.error[500],
	},
};

export const themeUserFeedback = {
	textSuccess: palette.success[400],
	textError: palette.error[400],
} as const;

export const themeUserFeedbackBrand = {
	textSuccess: palette.success[500],
	textError: palette.error[500],
} as const;
