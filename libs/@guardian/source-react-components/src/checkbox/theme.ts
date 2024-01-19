import { palette } from '@guardian/source-foundations';
import { labelThemeBrand, labelThemeDefault } from '../label/theme';
import {
	userFeedbackThemeBrand,
	userFeedbackThemeDefault,
} from '../user-feedback/theme';

export type CheckboxTheme = {
	borderUnselected: string;
	borderHover: string;
	borderSelected: string;
	borderError: string;
	backgroundTick: string;
	backgroundUnselected: string;
	textLabel: string;
	textLabelSupporting: string;
	textIndeterminate: string;
};
/** @deprecated Use `checkboxTheme` and component `theme` prop instead of emotion's `ThemeProvider` */

export const checkboxThemeDefault = {
	checkbox: {
		border: palette.neutral[46],
		borderHover: palette.brand[500],
		borderChecked: palette.brand[500],
		borderError: palette.error[400],
		backgroundChecked: palette.brand[500],
		textLabel: palette.neutral[7],
		textLabelSupporting: palette.neutral[46],
		textIndeterminate: palette.neutral[46],
	},
	...userFeedbackThemeDefault,
	...labelThemeDefault,
};
/** @deprecated Use `checkboxBrandTheme` and component `theme` prop instead of emotion's `ThemeProvider` */
export const checkboxThemeBrand = {
	checkbox: {
		border: palette.brand[800],
		borderHover: palette.neutral[100],
		borderChecked: palette.neutral[100],
		borderError: palette.error[500],
		backgroundChecked: palette.neutral[100],
		textLabel: palette.neutral[100],
		textLabelSupporting: palette.brand[800],
		textIndeterminate: palette.brand[800],
	},
	...userFeedbackThemeBrand,
	...labelThemeBrand,
};

export const checkboxTheme: CheckboxTheme = {
	borderUnselected: palette.neutral[46],
	borderHover: palette.brand[500],
	borderSelected: palette.brand[500],
	borderError: palette.error[400],
	backgroundTick: palette.brand[500],
	backgroundUnselected: 'transparent',
	textLabel: palette.neutral[7],
	textLabelSupporting: palette.neutral[46],
	textIndeterminate: palette.neutral[46],
};

export const checkboxBrandTheme: CheckboxTheme = {
	borderUnselected: palette.brand[800],
	borderSelected: palette.neutral[100],
	borderHover: palette.neutral[100],
	borderError: palette.error[500],
	backgroundTick: palette.neutral[100],
	backgroundUnselected: 'transparent',
	textLabel: palette.neutral[100],
	textLabelSupporting: palette.brand[800],
	textIndeterminate: palette.brand[800],
};
