import type { CAPIEntry } from '../@types/CAPI';
import type { Progress } from '../@types/crossword';

export type AnagramHelperLetter = {
	progressValue: string;
	isProgress: boolean;
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

	// Map progress to Anagram helper letters
	const progressLetters: AnagramHelperLetters = getProgressForEntry(
		entry,
		progress,
	).map((progress) => {
		const isWrong = !!progress && !lettersArray.includes(progress);
		if (!isWrong && progress) {
			lettersArray.splice(lettersArray.indexOf(progress), 1); // Remove matched letter
		}
		return { progressValue: progress, isProgress: !!progress, isWrong };
	});

	// Fill blanks with remaining letters
	const filledBlanks = progressLetters.map((letter) =>
		letter.progressValue
			? letter
			: {
					progressValue: lettersArray.shift() ?? '',
					isProgress: false,
					isWrong: false,
				},
	);

	// Add backup letters to incorrect guesses
	return filledBlanks.map((letter) => {
		// If the letter is not a guess, or there are no letters left, or the letter is not wrong no backup
		if (!letter.isProgress || !lettersArray.length || !letter.isWrong) {
			return letter;
		}
		const backupLetter = lettersArray.shift();
		return { ...letter, backupLetter };
	});
};
