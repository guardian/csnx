import { palette } from '../../foundations';

export type ThemeIcon = {
	fill: string;
};

export type ThemeSpinnerIcon = {
	fillBackground: string;
	strokeBackground: string;
	fillForeground: string;
	strokeForeground: string;
};

export const themeSpinnerIcon: ThemeSpinnerIcon = {
	fillBackground: 'transparent',
	strokeBackground: palette.brand[800],
	fillForeground: 'transparent',
	strokeForeground: palette.brand[400],
};
