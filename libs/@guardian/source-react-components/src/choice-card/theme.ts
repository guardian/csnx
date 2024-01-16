import { palette } from '@guardian/source-foundations';
import { userFeedbackThemeDefault } from '../user-feedback/theme';
import type { ChoiceCardTheme } from './ChoiceCard';

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
} as const;

export const choiceCardTheme: ChoiceCardTheme = {
	textUnselected: palette.neutral[46],
	textSelected: palette.brand[400],
	textHover: palette.brand[500],
	textError: palette.error[400],
	borderUnselected: palette.neutral[46],
	borderSelected: palette.brand[500],
	borderHover: palette.brand[500],
	borderError: palette.error[400],
	backgroundUnselected: 'transparent',
	backgroundHover: 'transparent',
	backgroundSelected: '#E3F6FF',
	backgroundTick: palette.brand[500],
} as const;
