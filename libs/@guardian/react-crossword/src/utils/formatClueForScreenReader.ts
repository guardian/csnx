import { isString } from '@guardian/libs';

const punctuateString = (string: string) => {
	const trimmed = string.trim();
	return /[!?.…]$/.test(trimmed) ? trimmed : `${trimmed}.`;
};

export const formatClueForScreenReader = (clueString: string) => {
	const trimmedClueString = clueString.trim();
	const [, clue, lengths] = /(.+)\((.+?)\)$/gm.exec(trimmedClueString) ?? [];

	// If we can't find the clue or lengths, just return the original string
	if (!isString(clue) || !isString(lengths)) {
		return punctuateString(trimmedClueString);
	}

	// Split lengths, trim them, and validate each as a number
	const splitLengths = lengths.split(',').map((length) => length.trim());
	const areValidNumbers = splitLengths.every((length) => /^\d+$/.test(length));

	// If any length is invalid, fallback to just returning the punctuated clue
	if (!areValidNumbers) {
		return punctuateString(trimmedClueString);
	}

	const [last, ...rest] = lengths
		.split(',')
		.map((_) => _.trim() + ' letters')
		.reverse();

	const lengthsToSentence = [rest.reverse().join(', '), last?.trim()]
		.filter(Boolean)
		.join(' and ');

	const clueWithPunctuation = punctuateString(clue);

	return `${clueWithPunctuation} ${lengthsToSentence}.`;
};
