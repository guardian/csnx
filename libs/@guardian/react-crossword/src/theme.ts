import { palette } from '@guardian/source/foundations';
import type { Theme } from './@types/crossword';

export const defaultTheme: Theme = {
	gridBackgroundColor: palette.neutral[7],
	gridForegroundColor: palette.neutral[100],
	gridGutterSize: 1,
	gridCellSize: 32,

	textColor: palette.neutral[10],
	focusColor: 'lime',
	selectedColor: 'deeppink',
	connectedColor: 'lightpink',

	buttonBackgroundColor: 'hotpink',
	buttonBackgroundHoverColor: 'lightpink',

	borderColor: 'orchid',

	clueMinWidth: 240,
	clueMaxWidth: 480,

	anagramHelperBackgroundColor: 'floralwhite',
	anagramHelperCandidateTextColor: palette.neutral[60],
};
