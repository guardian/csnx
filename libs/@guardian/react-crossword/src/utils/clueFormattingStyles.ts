import { css } from '@emotion/react';

// CSS reset removes clue formatting styles.
export const restoreClueFormattingStyles = css`
	& > sub {
		vertical-align: sub;
	}
	& > sup {
		vertical-align: super;
	}
	& > b {
		font-weight: bold;
	}
	& > i {
		font-style: italic;
	}
`;
