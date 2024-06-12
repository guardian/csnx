import { palette } from '../../foundations';

export type ThemeSpinner = {
	background: string;
	color: string;
};

export const themeSpinner: ThemeSpinner = {
	background: palette.brand[800],
	color: palette.brand[400],
};
