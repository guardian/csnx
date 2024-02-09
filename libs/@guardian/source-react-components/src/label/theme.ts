import { palette } from '@guardian/source-foundations';

export type ThemeLabel = {
	textLabel: string;
	textOptional: string;
	textSupporting: string;
	textError: string;
	textSuccess: string;
};

/** @deprecated Use `themeLabel` and component `theme` prop instead of emotion's `ThemeProvider` */
export const labelThemeDefault = {
	label: {
		textLabel: palette.neutral[7],
		textOptional: palette.neutral[46],
		textSupporting: palette.neutral[46],
		textError: palette.error[400],
		textSuccess: palette.success[400],
	},
};

/** @deprecated Use `themeLabelBrand` and component `theme` prop instead of emotion's `ThemeProvider` */
export const labelThemeBrand = {
	label: {
		textLabel: palette.neutral[100],
		textOptional: palette.brand[800],
		textSupporting: palette.brand[800],
		textError: palette.error[500],
		textSuccess: palette.success[500],
	},
};

export const themeLabel = {
	textLabel: palette.neutral[7],
	textOptional: palette.neutral[46],
	textSupporting: palette.neutral[46],
	textError: palette.error[400],
	textSuccess: palette.success[400],
};

export const themeBrandLabel = {
	textLabel: palette.neutral[100],
	textOptional: palette.brand[800],
	textSupporting: palette.brand[800],
	textError: palette.error[500],
	textSuccess: palette.success[500],
};
