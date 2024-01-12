import { tokens } from '@csnx/design-tokens';
import { palette } from '@guardian/source-foundations';
import { userFeedbackThemeDefault } from '../user-feedback/theme';

export interface ChoiceCardTheme {
	textUnselected?: string;
	textSelected?: string;
	textHover?: string;
	textError?: string;
	borderUnselected?: string;
	borderSelected?: string;
	borderHover?: string;
	borderError?: string;
	backgroundUnselected?: string;
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

const { choiceCard } = tokens;

export const choiceCardTheme: ChoiceCardFullTheme = {
	textUnselected: choiceCard.color.text.unselected,
	textSelected: choiceCard.color.text.selected,
	textHover: choiceCard.color.text.hover,
	textError: choiceCard.color.text.error,
	borderUnselected: choiceCard.color.border.unselected,
	borderSelected: choiceCard.color.border.selected,
	borderHover: choiceCard.color.border.hover,
	borderError: choiceCard.color.border.error,
	backgroundUnselected: choiceCard.color.background.unselected,
	backgroundHover: choiceCard.color.background.hover,
	backgroundSelected: choiceCard.color.background.selected,
	backgroundTick: choiceCard.color.background.tick,
};
