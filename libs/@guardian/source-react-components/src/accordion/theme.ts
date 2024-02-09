import { palette } from '@guardian/source-foundations';
import type { Theme } from '../@types/Theme';

export const transformProviderTheme = (
	providerTheme: Theme['accordion'],
): Partial<ThemeAccordion> => {
	const transformedTheme: Partial<ThemeAccordion> = {};

	if (providerTheme?.textPrimary) {
		transformedTheme.label = providerTheme.textPrimary;
	}
	if (providerTheme?.borderPrimary) {
		transformedTheme.border = providerTheme.borderPrimary;
	}

	return transformedTheme;
};

export type ThemeAccordion = {
	text: string;
	border: string;
	label: string;
	ctaText: string;
};

/** @deprecated Use `themeAccordion` and component `theme` prop instead of emotion's `ThemeProvider` */
export const accordionThemeDefault = {
	accordion: {
		textPrimary: palette.neutral[7],
		borderPrimary: palette.neutral[60],
	},
};

export const themeAccordion: ThemeAccordion = {
	label: palette.neutral[7],
	text: palette.neutral[7],
	border: palette.neutral[60],
	ctaText: palette.neutral[7],
};
