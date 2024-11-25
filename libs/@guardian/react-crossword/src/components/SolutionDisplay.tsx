import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import type { AnagramHelperLetters } from '../utils/getProgressForEntry';

export const SolutionDisplay = ({
	anagramHelperLetters,
}: {
	anagramHelperLetters: AnagramHelperLetters;
}) => {
	const theme = useContext(ThemeContext);
	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				max-width: 90%;
				margin-top: ${space[4]}px;
				gap: ${space[1]}px;
			`}
		>
			{anagramHelperLetters.map((anagramHelperLetter) => (
				<span
					css={css`
						border: 1px solid
							${anagramHelperLetter.isWrong
								? 'red'
								: anagramHelperLetter.isProgress
									? 'black'
									: 'darkgrey'};
						background-color: ${anagramHelperLetter.isProgress
							? 'lightgrey'
							: 'white'};
						width: ${theme.cellSize}px;
						height: ${theme.cellSize}px;
						text-align: center;
						align-content: center;
						text-transform: uppercase;
						user-select: none;
					`}
				>
					{anagramHelperLetter.progressValue} {anagramHelperLetter.separator}
				</span>
			))}
		</div>
	);
};
