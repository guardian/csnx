import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { useContext } from 'react';
import type { CAPIEntry } from '../@types/CAPI';
import { ProgressContext } from '../context/ProgressContext';
import { ThemeContext } from '../context/ThemeContext';
import {
	getProgressForEntry,
	getSeparatorFromEntry,
} from '../utils/getProgressForEntry';

export type SolutionDisplayLetter = {
	displayValue: string;
	source: 'progress' | 'candidate';
	progressInvalid: boolean;
	separator?: ',' | '-';
};

export type SolutionDisplayLetters = SolutionDisplayLetter[];

export const SolutionDisplay = ({
	entry,
	letters,
}: {
	entry: CAPIEntry;
	letters: string;
}) => {
	const { progress } = useContext(ProgressContext);

	const lettersArray = letters.toUpperCase().split('');

	const getSolutionDisplayLetters = (): SolutionDisplayLetters => {
		// Get the progress letters with associated properties
		const progressLetters = getProgressForEntry(entry, progress).map(
			(progress, index): SolutionDisplayLetter => {
				const isInvalidProgress =
					!!progress && !lettersArray.includes(progress);

				// If valid progress, remove it from lettersArray
				if (!isInvalidProgress && progress) {
					lettersArray.splice(lettersArray.indexOf(progress), 1);
				}

				return {
					displayValue: progress,
					source: progress ? 'progress' : 'candidate',
					progressInvalid: isInvalidProgress,
					separator: getSeparatorFromEntry(entry, index),
				};
			},
		);

		// Fill in missing display values with candidates from lettersArray
		return progressLetters.map((letter): SolutionDisplayLetter => {
			if (letter.displayValue) {
				return letter;
			}

			return {
				...letter,
				displayValue: lettersArray.shift() ?? '',
				source: 'candidate',
				progressInvalid: false,
			};
		});
	};

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
			{getSolutionDisplayLetters().map((anagramHelperLetter) => (
				<span
					css={css`
						border: 1px solid
							${anagramHelperLetter.progressInvalid
								? 'red'
								: anagramHelperLetter.source === 'progress'
									? 'black'
									: 'darkgrey'};
						background-color: ${anagramHelperLetter.source === 'progress'
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
					{anagramHelperLetter.displayValue} {anagramHelperLetter.separator}
				</span>
			))}
		</div>
	);
};
