import type { Theme as EmotionTheme } from '@emotion/react';
import { palette } from '@guardian/source-foundations';

export const fileInputThemeDefault = {
	fileInput: {
		text: palette.neutral[7],
		supporting: palette.neutral[60],
		primary: palette.brand[300],
		error: palette.error[400],
	},
};

export const fileInputDarkTheme = {
	fileInput: {
		text: palette.neutral[86],
		supporting: palette.neutral[86],
		primary: palette.neutral[86],
		error: palette.error[500],
	},
};

export interface Theme extends EmotionTheme {
	fileInput?: typeof fileInputThemeDefault.fileInput;
}
