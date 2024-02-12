import { palette } from '@guardian/source-foundations';
import type { Theme } from '../@types/Theme';
import { userFeedbackThemeDefault } from '../user-feedback/theme';

export type ThemeTextInput = {
	text: string;
	textLabel: string;
	textOptional: string;
	textSupporting: string;
	textError: string;
	textSuccess: string;
	background: string;
	border: string;
	borderError: string;
	borderSuccess: string;
};

export const themeTextInput: ThemeTextInput = {
	text: palette.neutral[7],
	textLabel: palette.neutral[7],
	textOptional: palette.neutral[46],
	textSupporting: palette.neutral[46],
	textError: palette.neutral[7],
	textSuccess: palette.success[400],
	background: palette.neutral[100],
	border: palette.neutral[46],
	borderError: palette.error[400],
	borderSuccess: palette.success[400],
} as const;

export const transformProviderTheme = (
	providerTheme: Theme['textInput'],
): Partial<ThemeTextInput> => {
	const transformedTheme: Partial<ThemeTextInput> = {};
	if (providerTheme?.textUserInput) {
		transformedTheme.text = providerTheme.textUserInput;
	}
	if (providerTheme?.backgroundInput) {
		transformedTheme.background = providerTheme.backgroundInput;
	}
	return { ...transformedTheme, ...providerTheme };
};

/** @deprecated Use `themeTextInput` and component `theme` prop instead of emotion's `ThemeProvider` */

export const textInputThemeDefault = {
	textInput: {
		textUserInput: palette.neutral[7],
		textLabel: palette.neutral[7],
		textLabelOptional: palette.neutral[46],
		textLabelSupporting: palette.neutral[46],
		textError: palette.neutral[7],
		textSuccess: palette.success[400],
		backgroundInput: palette.neutral[100],
		border: palette.neutral[46],
		borderActive: palette.focus[400],
		borderError: palette.error[400],
		borderSuccess: palette.success[400],
	},
	...userFeedbackThemeDefault,
};
