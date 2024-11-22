import type { CAPIEntry } from '../@types/CAPI';
import type { Progress } from '../@types/crossword';

export type AnagramHelperLetter = {
	value: string;
	isGuess: boolean;
	isWrong: boolean;
	backupLetter?: string;
};

export type AnagramHelperLetters = AnagramHelperLetter[];

export const getProgressForEntry = (entry: CAPIEntry, progress: Progress) => {
	return Array.from({ length: entry.length }, (_, i) => {
		const x =
			entry.direction === 'across' ? entry.position.x + i : entry.position.x;
		const y =
			entry.direction === 'across' ? entry.position.y : entry.position.y + i;
		return progress.at(x)?.[y] ?? '';
	});
};

export const getAnagramHelperLetters = (
	entry: CAPIEntry,
	progress: Progress,
	letters: string,
): AnagramHelperLetters => {
	const lettersArray = letters.toUpperCase().split('');

	// Map guesses to Anagram helper letters
	const guessLetters: AnagramHelperLetters = getProgressForEntry(
		entry,
		progress,
	).map((guess) => {
		const isWrong = !!guess && !lettersArray.includes(guess);
		if (!isWrong && guess) {
			lettersArray.splice(lettersArray.indexOf(guess), 1); // Remove matched letter
		}
		return { value: guess, isGuess: !!guess, isWrong };
	});

	// Fill blanks with remaining letters
	const filledBlanks = guessLetters.map((letter) =>
		letter.value
			? letter
			: { value: lettersArray.shift() ?? '', isGuess: false, isWrong: false },
	);

	// Add backup letters to guesses
	return filledBlanks.map((letter) => {
		if (!letter.isGuess) {
			return letter;
		}
		const backupLetter = lettersArray.shift();
		return { ...letter, backupLetter };
	});
};
