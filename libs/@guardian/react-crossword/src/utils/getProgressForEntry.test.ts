import {
	emptyProgress,
	progress,
} from '../../stories/formats/word-wheel.progress';
import type { CAPIEntry } from '../@types/CAPI';
import { getAnagramHelperLetters } from './getProgressForEntry';

const mockEntry: CAPIEntry = {
	humanNumber: '1',
	separatorLocations: { '-': [1], and: [3] },
	id: '1-across',
	number: 1,
	clue: 'A test clue',
	solution: 'OLIVE',
	length: 5,
	group: ['1-across'],
	position: { x: 0, y: 0 },
	direction: 'across',
};

describe('getAnagramHelperLetters', () => {
	it('should map guesses correctly and identify wrong letters', () => {
		const result = getAnagramHelperLetters(mockEntry, progress, '');
		expect(result).toEqual([
			{ progressValue: 'F', isProgress: true, isWrong: true },
			{ progressValue: 'S', isProgress: true, isWrong: true, separator: '-' },
			{ progressValue: '', isProgress: false, isWrong: false },
			{ progressValue: 'A', isProgress: true, isWrong: true, separator: ',' },
			{ progressValue: 'A', isProgress: true, isWrong: true },
		]);
	});

	it('should map guesses correctly and identify correct letters', () => {
		const result = getAnagramHelperLetters(mockEntry, progress, 'SF');
		expect(result).toEqual([
			{ progressValue: 'F', isProgress: true, isWrong: false },
			{ progressValue: 'S', isProgress: true, isWrong: false, separator: '-' },
			{ progressValue: '', isProgress: false, isWrong: false },
			{ progressValue: 'A', isProgress: true, isWrong: true, separator: ',' },
			{ progressValue: 'A', isProgress: true, isWrong: true },
		]);
	});

	it('should map guesses correctly and add backup letters', () => {
		const result = getAnagramHelperLetters(mockEntry, progress, 'XXSF');
		expect(result).toEqual([
			{ progressValue: 'F', isProgress: true, isWrong: false },
			{ progressValue: 'S', isProgress: true, isWrong: false, separator: '-' },
			{ progressValue: 'X', isProgress: false, isWrong: false },
			{
				progressValue: 'A',
				isProgress: true,
				isWrong: true,
				separator: ',',
				backupLetter: 'X',
			},
			{ progressValue: 'A', isProgress: true, isWrong: true },
		]);
	});

	it('should map guesses correctly and handle multiple extra letters FS', () => {
		const result = getAnagramHelperLetters(mockEntry, progress, 'XXXXXXSF');
		expect(result).toEqual([
			{ progressValue: 'F', isProgress: true, isWrong: false },
			{ progressValue: 'S', isProgress: true, isWrong: false, separator: '-' },
			{ progressValue: 'X', isProgress: false, isWrong: false },
			{
				progressValue: 'A',
				isProgress: true,
				isWrong: true,
				separator: ',',
				backupLetter: 'X',
			},
			{
				progressValue: 'A',
				isProgress: true,
				isWrong: true,
				backupLetter: 'X',
			},
		]);
	});

	it('should map guesses correctly and handle multiple extra letters FA', () => {
		const result = getAnagramHelperLetters(mockEntry, progress, 'XXXXXXXFA');
		expect(result).toEqual([
			{ progressValue: 'F', isProgress: true, isWrong: false },
			{
				progressValue: 'S',
				isProgress: true,
				isWrong: true,
				backupLetter: 'X',
				separator: '-',
			},
			{ progressValue: 'X', isProgress: false, isWrong: false },
			{ progressValue: 'A', isProgress: true, isWrong: false, separator: ',' },
			{
				progressValue: 'A',
				isProgress: true,
				isWrong: true,
				backupLetter: 'X',
			},
		]);
	});

	it('should map separators correctly and handle multiple extra letters FA', () => {
		const result = getAnagramHelperLetters(mockEntry, emptyProgress, '');
		expect(result).toEqual([
			{ progressValue: '', isProgress: false, isWrong: false },
			{ progressValue: '', isProgress: false, isWrong: false, separator: '-' },
			{ progressValue: '', isProgress: false, isWrong: false },
			{ progressValue: '', isProgress: false, isWrong: false, separator: ',' },
			{ progressValue: '', isProgress: false, isWrong: false },
		]);
	});
});
