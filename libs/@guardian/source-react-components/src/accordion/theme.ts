import { palette } from '@guardian/source-foundations';

export type ThemeAccordion = {
	text: string;
	border: string;
	label: string;
	ctaText: string;
};
export const accordionThemeDefault = {
	accordion: {
		textPrimary: palette.opinion[400],
		borderPrimary: palette.opinion[400],
	},
};

export const themeAccordion: ThemeAccordion = {
	label: palette.neutral[7],
	text: palette.neutral[7],
	border: palette.neutral[60],
	ctaText: palette.neutral[7],
};
