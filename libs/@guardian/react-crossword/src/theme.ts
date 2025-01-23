import { palette } from '@guardian/source/foundations';
import type { Theme } from './@types/crossword';

export const defaultTheme: Theme = {
	gridBackgroundColor: palette.neutral[7],
	gridForegroundColor: palette.neutral[100],
	gridGutterSize: 1,
	gridCellSize: 32,

	textColor: palette.neutral[7],
	focusColor: palette.focus[400],
	selectedColor: palette.brandAlt[400],
	connectedColor: '#fff7b2', // One-off colour generated from brandAlt.400

	buttonBackgroundColor: palette.lifestyle[400],
	buttonBackgroundHoverColor: '#942f65', // One-off colour generated from lifestyle.400

	borderColor: 'red', //palette.neutral[86],

	clueMinWidth: 240,
	clueMaxWidth: 480,

	anagramHelperBackgroundColor: palette.neutral[97],
	anagramHelperCandidateTextColor: palette.neutral[60],
};
