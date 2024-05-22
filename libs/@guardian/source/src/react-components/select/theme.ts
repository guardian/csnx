import { palette } from '@guardian/source-foundations';
import type { Theme } from '../@types/Theme';
import { userFeedbackThemeDefault } from '../user-feedback/theme';

export type ThemeSelect = {
	textUserInput: string;
	textLabel: string;
	textOptional: string;
	textSupporting: string;
	textError: string;
	textSuccess: string;
	backgroundInput: string;
	border: string;
	borderActive: string;
	borderError: string;
	borderSuccess: string;
	iconFill: string;
};

/** @deprecated Use `themeSelect` and component `theme` prop instead of emotion's `ThemeProvider` */
export const selectThemeDefault = {
	select: {
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

export const themeSelect: ThemeSelect = {
	textUserInput: palette.neutral[7],
	textLabel: palette.neutral[7],
	textOptional: palette.neutral[46],
	textSupporting: palette.neutral[46],
	textError: palette.neutral[7],
	textSuccess: palette.success[400],
	backgroundInput: palette.neutral[100],
	border: palette.neutral[46],
	borderActive: palette.focus[400],
	borderError: palette.error[400],
	borderSuccess: palette.success[400],
	iconFill: palette.neutral[7],
} as const;

export const transformProviderTheme = (
	providerTheme: Theme['select'],
): Partial<ThemeSelect> => {
	const transformedTheme: Partial<ThemeSelect> = {};
	if (providerTheme?.textLabelSupporting) {
		transformedTheme.textSupporting = providerTheme.textLabelSupporting;
	}
	if (providerTheme?.textLabelOptional) {
		transformedTheme.textOptional = providerTheme.textLabelOptional;
	}
	if (providerTheme?.textUserInput) {
		transformedTheme.iconFill = providerTheme.textUserInput;
	}
	return { ...transformedTheme, ...providerTheme };
};
