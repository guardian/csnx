import { palette } from '@guardian/source-foundations';
import { userFeedbackThemeDefault } from '../user-feedback/theme';

export const choiceCardThemeDefault = {
	choiceCard: {
		textUnSelected: palette.neutral[46],
		textSelected: palette.brand[400],
		textHover: palette.brand[400],
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
		textUnSelected: palette.neutral[0],
		textSelected: palette.brand[400],
		textHover: palette.brand[400],
		textError: palette.error[400],
		borderUnSelected: palette.neutral[46],
		borderSelected: palette.brand[500],
		borderHover: palette.brand[500],
		borderError: palette.error[400],
		backgroundUnSelected: 'hotpink',
		backgroundHover: 'transparent',
		backgroundSelected: '#E3F6FF',
		backgroundTick: palette.brand[500],
	},
	...userFeedbackThemeDefault,
};
