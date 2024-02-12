import { palette } from '@guardian/source-foundations';
import type { Theme } from '../@types/Theme';

export type ThemeAccordion = {
	textLabel: string;
	textBody: string;
	textCta: string;
	border: string;
	iconFill: string;
};

export const themeAccordion: ThemeAccordion = {
	textLabel: palette.neutral[7],
	textBody: palette.neutral[7],
	textCta: palette.neutral[7],
	border: palette.neutral[60],
	iconFill: palette.neutral[7],
} as const;

/** @deprecated Use `themeAccordion` and component `theme` prop instead of emotion's `ThemeProvider` */
export const accordionThemeDefault = {
	accordion: {
		textPrimary: palette.neutral[7],
		borderPrimary: palette.neutral[60],
	},
};

export const transformProviderTheme = (
	providerTheme: Theme['accordion'],
): Partial<ThemeAccordion> => {
	const transformedTheme: Partial<ThemeAccordion> = {};

	if (providerTheme?.textPrimary) {
		transformedTheme.textLabel = providerTheme.textPrimary;
		transformedTheme.textBody = providerTheme.textPrimary;
		transformedTheme.textCta = providerTheme.textPrimary;
	}
	if (providerTheme?.borderPrimary) {
		transformedTheme.border = providerTheme.borderPrimary;
	}

	return transformedTheme;
};