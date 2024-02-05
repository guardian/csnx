import { palette } from '@guardian/source-foundations';
import type { ThemeLabel } from '../label/theme';
import { labelThemeBrand, labelThemeDefault, themeLabel } from '../label/theme';
import type { ThemeUserFeedback } from '../user-feedback/theme';
import {
	themeUserFeedback,
	userFeedbackThemeBrand,
	userFeedbackThemeDefault,
} from '../user-feedback/theme';

export type ThemeCheckboxGroup = {
	label: Partial<ThemeLabel>;
	userFeedback: Partial<ThemeUserFeedback>;
};
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

export const themeCheckbox = {
	label: themeLabel,
	userFeedback: themeUserFeedback,
};
