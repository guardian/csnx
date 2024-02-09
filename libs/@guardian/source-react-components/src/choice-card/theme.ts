import { palette } from '@guardian/source-foundations';
import type { Theme } from '../@types/Theme';
import type { ThemeLabel } from '../label/theme';
import type { ThemeUserFeedback } from '../user-feedback/theme';
import { userFeedbackThemeDefault } from '../user-feedback/theme';

export type ThemeChoiceCard = {
	textUnselected: string;
	textSelected: string;
	textHover: string;
	textError: string;
	borderUnselected: string;
	borderSelected: string;
	borderHover: string;
	borderError: string;
	backgroundUnselected: string;
	backgroundHover: string;
	backgroundSelected: string;
	backgroundTick: string;
};

/** @deprecated Use `choiceCardTheme` and component `theme` prop instead of emotion's `ThemeProvider` */
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

export const themeChoiceCard: ThemeChoiceCard = {
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

export type ThemeChoiceCardGroup = ThemeLabel & ThemeUserFeedback;
export const transformProviderTheme = (
	providerTheme: Theme['choiceCard'],
): Partial<ThemeChoiceCard> => {
	const transformedTheme: Partial<ThemeChoiceCard> = {};

	if (providerTheme?.textLabel) {
		transformedTheme.textUnselected = providerTheme.textLabel;
	}
	if (providerTheme?.textChecked) {
		transformedTheme.textSelected = providerTheme.textChecked;
	}
	if (providerTheme?.border) {
		transformedTheme.borderUnselected = providerTheme.border;
	}
	if (providerTheme?.borderChecked) {
		transformedTheme.borderSelected = providerTheme.borderChecked;
	}
	if (providerTheme?.backgroundChecked) {
		transformedTheme.backgroundSelected = providerTheme.backgroundChecked;
	}
	return { ...transformedTheme, ...providerTheme };
};
