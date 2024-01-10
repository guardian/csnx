import { palette } from '@guardian/source-foundations';
import { userFeedbackThemeDefault } from '../user-feedback/theme';

export const choiceCardThemeDefault = {
	choiceCard: {
		textUnSelected: palette.neutral[46],
		textSelected: palette.brand[500],
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
	},
	...userFeedbackThemeDefault,
};

export const choiceCardThemeDark = {
	choiceCard: {
		textUnSelected: palette.neutral[20],
		textSelected: palette.brand[800],
		textHover: palette.brand[800],
		textError: palette.error[500],
		borderUnSelected: palette.neutral[86],
		borderSelected: palette.brand[800],
		borderHover: palette.brand[800],
		borderError: palette.error[500],
		backgroundUnSelected: palette.neutral[86],
		backgroundHover: palette.neutral[20],
		backgroundSelected: palette.neutral[20],
		backgroundTick: palette.brand[500],
	},
	...userFeedbackThemeDefault,
};
