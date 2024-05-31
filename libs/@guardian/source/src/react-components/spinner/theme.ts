import { palette } from '../../foundations';

export type ThemeSpinner = {
	fillBackground: string;
	strokeBackground: string;
	fillForeground: string;
	strokeForeground: string;
};

export const themeSpinner: ThemeSpinner = {
	fillBackground: 'transparent',
	strokeBackground: palette.brand[800],
	fillForeground: 'transparent',
	strokeForeground: palette.brand[400],
};
