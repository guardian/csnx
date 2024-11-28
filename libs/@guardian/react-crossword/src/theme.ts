import { palette } from '@guardian/source/foundations';
import type { Theme } from './@types/crossword';

export const defaultTheme: Theme = {
	background: palette.neutral[7],
	text: palette.neutral[10],
	foreground: palette.neutral[100],
	gutter: 1,
	highlight: 'lightpink',
	focus: 'lime',
	active: 'deeppink',
	cellSize: 32,
	buttonBackground: 'hotpink',
	buttonBackgroundHover: 'lightpink',
	border: 'orchid',
	clueMinWidth: 240,
	clueMaxWidth: 480,
};
