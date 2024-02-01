import { palette } from '@guardian/source-foundations';
import { labelThemeBrand, labelThemeDefault } from '../label/theme';
import {
	userFeedbackThemeBrand,
	userFeedbackThemeDefault,
} from '../user-feedback/theme';

export type ThemeRadio = {
	borderSelected: string;
	borderUnselected: string;
	borderHover: string;
	borderError: string;
	fillSelected: string;
	fillUnselected: string;
	textLabel: string;
	textSupporting: string;
};

export const themeRadio: ThemeRadio = {
	borderSelected: palette.brand[500],
	borderUnselected: palette.neutral[46],
	borderHover: palette.brand[500],
	borderError: palette.error[400],
	fillSelected: palette.brand[500],
	fillUnselected: 'transparent',
	textLabel: palette.neutral[7],
	textSupporting: palette.neutral[46],
};

export const themeRadioBrand: ThemeRadio = {
	borderSelected: palette.neutral[100],
	borderUnselected: palette.brand[800],
	borderHover: palette.neutral[100],
	borderError: palette.error[500],
	fillSelected: palette.neutral[100],
	fillUnselected: 'transparent',
	textLabel: palette.neutral[100],
	textSupporting: palette.brand[800],
};

/** @deprecated Use `themeRadio` and component `theme` prop instead of emotion's `ThemeProvider` */

export const radioThemeDefault = {
	radio: {
		borderHover: palette.focus[400],
		border: palette.neutral[60],
		backgroundChecked: palette.focus[400],
		textLabel: palette.neutral[7],
		textLabelSupporting: palette.neutral[46],
		borderError: palette.error[400],
	},
	...labelThemeDefault,
	...userFeedbackThemeDefault,
};

/** @deprecated Use `themeRadioBrand` and component `theme` prop instead of emotion's `ThemeProvider` */

export const radioThemeBrand = {
	radio: {
		borderHover: palette.neutral[100],
		border: palette.brand[800],
		backgroundChecked: palette.neutral[100],
		textLabel: palette.neutral[100],
		textLabelSupporting: palette.brand[800],
		borderError: palette.error[500],
	},
	...labelThemeBrand,
	...userFeedbackThemeBrand,
};
