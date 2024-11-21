import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { useContext } from 'react';
import type { CAPIEntry } from '../@types/CAPI';
import { ProgressContext } from '../context/ProgressContext';

type SolutionLetter = {
	value: string;
	isGuess: boolean;
	isWrong: boolean;
};

export const SolutionDisplay = ({
	entry,
	letters,
}: {
	entry: CAPIEntry;
	letters: string;
}) => {
	const { progress } = useContext(ProgressContext);
	const lettersArray = letters.toUpperCase().split('');

	// Get guesses from progress based on direction
	const guesses = Array.from({ length: entry.length }, (_, i) => {
		const x =
			entry.direction === 'across' ? entry.position.x + i : entry.position.x;
		const y =
			entry.direction === 'across' ? entry.position.y : entry.position.y + i;
		return progress.at(x)?.[y] ?? '';
	});

	// Map guesses to solution letters
	const guessLetters: SolutionLetter[] = guesses.map((guess) => {
		const isWrong = !!guess && !lettersArray.includes(guess);
		if (!isWrong && guess) {
			lettersArray.splice(lettersArray.indexOf(guess), 1); // Remove matched letter
		}
		return { value: guess, isGuess: !!guess, isWrong };
	});

	// Fill blanks with remaining letters
	const solutionLetters: SolutionLetter[] = guessLetters.map((letter) =>
		letter.value
			? letter
			: { value: lettersArray.shift() ?? '', isGuess: false, isWrong: false },
	);

	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
				margin-top: ${space[4]}px;
				gap: ${space[1]}px;
			`}
		>
			{solutionLetters.map((guess) => (
				<span
					css={css`
						border: 1px solid ${guess.isWrong ? 'red' : 'black'};
						background-color: ${guess.isGuess ? 'lightgrey' : 'white'};
						width: 25px;
						height: 25px;
						text-align: center;
						align-content: center;
						text-transform: uppercase;
						user-select: none;
					`}
				>
					{guess.value}
				</span>
			))}
		</div>
	);
};
