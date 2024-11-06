import { palette } from '@guardian/source/foundations';
import type { Theme } from './@types/crossword';

export const defaultTheme: Theme = {
	background: palette.neutral[7],
	text: palette.neutral[7],
	foreground: palette.neutral[100],
	gutter: 1,
	focus: 'hotpink',
};
