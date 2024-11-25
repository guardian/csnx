import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { AnagramHelperLetters } from '../utils/getProgressForEntry';

export const SolutionDisplay = ({
	anagramHelperLetters,
}: {
	anagramHelperLetters: AnagramHelperLetters;
}) => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
				margin-top: ${space[4]}px;
				gap: ${space[1]}px;
			`}
		>
			{anagramHelperLetters.map((guess) => (
				<span
					css={css`
						border: 1px solid
							${guess.isWrong ? 'red' : guess.isProgress ? 'black' : 'darkgrey'};
						background-color: ${guess.isProgress ? 'lightgrey' : 'white'};
						width: 25px;
						height: 25px;
						text-align: center;
						align-content: center;
						text-transform: uppercase;
						user-select: none;
					`}
				>
					{guess.progressValue}
				</span>
			))}
		</div>
	);
};
