import { calculateHoverColour, palette } from '@guardian/source/foundations';
import type { PopoverProps } from './Popover';

export type ThemePopover = {
	background: string;
	text: string;
	dismissButtonText: string;
	dismissButtonBackground: string;
	dismissButtonBackgroundHover: string;
};

const defaultTheme: ThemePopover = {
	background: palette.neutral[93],
	text: palette.neutral[7],
	dismissButtonText: palette.neutral[0],
	dismissButtonBackground: palette.neutral[86],
	dismissButtonBackgroundHover: palette.neutral[73],
};

export const getThemeColours = (theme: PopoverProps['theme']): ThemePopover => {
	const mergedTheme: ThemePopover = {
		...defaultTheme,
		...theme,
	};

	/**
	 * If a hover colour has been provided in the theme, use that
	 * If not, try to calculate the appropriate hover colour based on the background colour
	 * Otherwise, use the default value for the button background hover
	 */
	const dismissButtonBackgroundHover = (): string => {
		if (theme?.dismissButtonBackgroundHover) {
			return theme.dismissButtonBackgroundHover;
		} else if (theme?.dismissButtonBackground) {
			return calculateHoverColour(theme.dismissButtonBackground);
		} else {
			return defaultTheme.dismissButtonBackgroundHover;
		}
	};

	return {
		text: mergedTheme.text,
		background: mergedTheme.background,
		dismissButtonText: mergedTheme.dismissButtonText,
		dismissButtonBackground: mergedTheme.dismissButtonBackground,
		dismissButtonBackgroundHover: dismissButtonBackgroundHover(),
	};
};
