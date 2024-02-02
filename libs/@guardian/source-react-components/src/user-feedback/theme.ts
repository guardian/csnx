import { palette } from '@guardian/source-foundations';

export type ThemeUserFeedback = {
	textSuccess: string;
	textError: string;
};
export const userFeedbackThemeDefault = {
	userFeedback: {
		textSuccess: palette.success[400],
		textError: palette.error[400],
	},
};

export const userFeedbackThemeBrand = {
	userFeedback: {
		textSuccess: palette.success[500],
		textError: palette.error[500],
	},
};

export const themeUserFeedback = {
	textSuccess: palette.success[400],
	textError: palette.error[400],
};
