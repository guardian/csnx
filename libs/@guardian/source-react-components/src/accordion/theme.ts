import { palette } from '@guardian/source-foundations';

export type ThemeAccordion = {
	text: string;
	border: string;
	label: string;
	ctaText: string;
};
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
