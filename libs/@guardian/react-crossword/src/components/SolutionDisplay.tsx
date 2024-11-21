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

	// returns an array of strings with blank strings in the blank spaces
	const guesses = () => {
		const result = [];
		for (let i = 0; i < entry.length; i++) {
			if (entry.direction === 'across') {
				const currentX = progress.at(entry.position.x + i);
				if (currentX) {
					result.push(currentX[entry.position.y] ?? '');
				}
			} else {
				const currentX = progress.at(entry.position.x);
				if (currentX) {
					result.push(currentX[entry.position.y + i] ?? '');
				}
			}
		}
		return result;
	};

	// check if guess is correct
	const solutionLetters = (): SolutionLetter[] => {
		const guessesArray = guesses();
		const solutionLettersFromGuesses = guessesArray.map((guess) => {
			const isWrong = !lettersArray.includes(guess);
			if (!isWrong) {
				lettersArray.splice(lettersArray.indexOf(guess), 1);
			}
			return { value: guess, isGuess: !!guess, isWrong };
		});
		return solutionLettersFromGuesses.map((guess) => {
			if (guess.value === '') {
				const inputLetter = lettersArray.shift();
				return { value: inputLetter ?? '', isGuess: false, isWrong: false };
			}
			return guess;
		});
	};

	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
				margin-top: ${space[4]}px;
				gap: ${space[1]}px;
			`}
		>
			{solutionLetters().map((guess) => (
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
