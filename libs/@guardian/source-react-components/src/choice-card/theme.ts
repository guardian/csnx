import { palette } from '@guardian/source-foundations';
import { userFeedbackThemeDefault } from '../user-feedback/theme';

export interface ChoiceCardTheme {
	textUnSelected?: string;
	textSelected?: string;
	textHover?: string;
	textError?: string;
	borderUnSelected?: string;
	borderSelected?: string;
	borderHover?: string;
	borderError?: string;
	backgroundUnSelected?: string;
	backgroundHover?: string;
	backgroundSelected?: string;
	backgroundTick?: string;
}

export type ChoiceCardFullTheme = {
	[P in keyof ChoiceCardTheme]-?: ChoiceCardTheme[P];
};
/** @deprecated Use `choiceCardThemeLight` and `theme` prop instead of `ThemeProvider` **/
export const choiceCardThemeDefault = {
	choiceCard: {
		textLabel: palette.neutral[46],
		textLabelSupporting: palette.neutral[46],
		textGroupLabel: palette.neutral[7],
		textGroupLabelSupporting: palette.neutral[46],
		border: palette.neutral[46],
		textChecked: palette.brand[400],
		backgroundChecked: '#E3F6FF',
		backgroundTick: palette.brand[500],
		borderChecked: palette.brand[500],
		textHover: palette.brand[500],
		borderHover: palette.brand[500],
		textError: palette.error[400],
		borderError: palette.error[400],
	},
	...userFeedbackThemeDefault,
};

export const choiceCardTheme: ChoiceCardFullTheme = {
	textUnSelected: palette.neutral[46],
	textSelected: palette.brand[400],
	textHover: palette.brand[500],
	textError: palette.error[400],
	borderUnSelected: palette.neutral[46],
	borderSelected: palette.brand[500],
	borderHover: palette.brand[500],
	borderError: palette.error[400],
	backgroundUnSelected: 'transparent',
	backgroundHover: 'transparent',
	backgroundSelected: '#E3F6FF',
	backgroundTick: palette.brand[500],
};
