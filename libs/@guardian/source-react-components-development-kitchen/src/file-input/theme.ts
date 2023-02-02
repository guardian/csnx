import type { Theme as EmotionTheme } from '@emotion/react';
import { palette } from '@guardian/source-foundations';

export const fileInputThemeDefault = {
	fileInput: {
		text: palette.brand[400],
		supporting: palette.neutral[46],
		primary: palette.brand[400],
		error: palette.error[400],
		backgroundHover: '#E5E5E5', // One-off colour variant to match tertiary button
		textHover: palette.brand[400],
	},
};

export const fileInputDarkTheme = {
	fileInput: {
		text: palette.neutral[86],
		supporting: palette.neutral[60],
		primary: palette.neutral[86],
		error: palette.error[500],
		backgroundHover: palette.neutral[86],
		textHover: palette.neutral[7],
	},
};

export interface Theme extends EmotionTheme {
	fileInput?: typeof fileInputThemeDefault.fileInput;
}
