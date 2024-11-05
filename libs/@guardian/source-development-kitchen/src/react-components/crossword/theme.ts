import type { Theme } from './@types/crossword';
import { palette } from '@guardian/source/foundations';

export const defaultTheme: Theme = {
	background: palette.neutral[7],
	text: palette.neutral[7],
	foreground: palette.neutral[100],
	gutter: 1,
};
