import { palette } from '@guardian/source-foundations';

export type ThemeTextArea = {
	textUserInput: string;
	textLabel: string;
	textOptional: string;
	textSupporting: string;
	textError: string;
	textSuccess: string;
	backgroundInput: string;
	border: string;
	borderError: string;
	borderSuccess: string;
};

export const themeTextArea: ThemeTextArea = {
	textUserInput: palette.neutral[7],
	textLabel: palette.neutral[7],
	textOptional: palette.neutral[46],
	textSupporting: palette.neutral[46],
	textError: palette.neutral[7],
	textSuccess: palette.success[400],
	backgroundInput: palette.neutral[100],
	border: palette.neutral[46],
	borderError: palette.error[400],
	borderSuccess: palette.success[400],
} as const;
