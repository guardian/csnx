import { formatClueForScreenReader } from './formatClueForScreenReader';

describe('formatClueForScreenReader', () => {
	it('should add punctuation to a clue without it', () => {
		const input = 'Writer in retreat welcomed by fat cat (7)';
		// The clue doesn't end with punctuation, so a full stop should be added.
		const expected = 'Writer in retreat welcomed by fat cat. 7 letters.';
		expect(formatClueForScreenReader(input)).toBe(expected);
	});

	it('should preserve existing punctuation in the clue', () => {
		const input = 'Eagle not the last for Gary Player? (4)';
		// The clue already ends with a question mark, so we don't add any other punctuation.
		const expected = 'Eagle not the last for Gary Player? 4 letters.';
		expect(formatClueForScreenReader(input)).toBe(expected);
	});

	it('should handle clues with multiple lengths', () => {
		const input = 'Rain in Spain (4,5)';
		// Two lengths should be joined by "and" before the last length.
		const expected = 'Rain in Spain. 4 letters and 5 letters.';
		expect(formatClueForScreenReader(input)).toBe(expected);
	});

	it('should handle clues with three or more lengths', () => {
		const input = 'A classic phrase (3,4,3,5)';
		// With four lengths, the output should have commas and then "and" before the last one.
		const expected =
			'A classic phrase. 3 letters, 4 letters, 3 letters and 5 letters.';
		expect(formatClueForScreenReader(input)).toBe(expected);
	});

	it('should trim whitespace from the input clue', () => {
		const input = '   Mind the gap   (4) ';
		// Whitespace around the clue and lengths should be ignored.
		const expected = 'Mind the gap. 4 letters.';
		expect(formatClueForScreenReader(input)).toBe(expected);
	});

	it('should return the original string (with punctuation fix) if it cannot parse lengths', () => {
		const input = 'Feline prowler';
		// No `(N)` pattern found, so it should just add punctuation if needed.
		const expected = 'Feline prowler.';
		expect(formatClueForScreenReader(input)).toBe(expected);
	});

	it('should handle unusual punctuation correctly', () => {
		const input = 'Cryptic clue… (7)';
		// Ellipses should be preserved. Just add the length detail after.
		const expected = 'Cryptic clue… 7 letters.';
		expect(formatClueForScreenReader(input)).toBe(expected);
	});

	it('should handle comma-separated lengths with extra spaces', () => {
		const input = 'Mixed fruit (2,  2, 3)';
		// Spaces in lengths should be trimmed and the result should be formatted properly.
		const expected = 'Mixed fruit. 2 letters, 2 letters and 3 letters.';
		expect(formatClueForScreenReader(input)).toBe(expected);
	});

	it('should handle a clue with brackets ', () => {
		// Maybe a malformed clue that has brackets but doesn't conform to the pattern.
		const input = 'Not really a (clue)(4)';
		// Since it can't parse a number from `( )`, it should just treat it like no match found.
		const expected = 'Not really a (clue). 4 letters.';
		expect(formatClueForScreenReader(input)).toBe(expected);
	});

	it('should handle a clue with brackets but does not conform to the pattern', () => {
		// Maybe a malformed clue that has brackets but doesn't conform to the pattern.
		const input = 'Not really a clue ( )';
		// Since it can't parse a number from `( )`, it should just treat it like no match found.
		const expected = 'Not really a clue ( ).';
		expect(formatClueForScreenReader(input)).toBe(expected);
	});
	it('should handle a clue with brackets but does not conform to the pattern', () => {
		// Maybe a malformed clue that has brackets but doesn't conform to the pattern.
		const input = 'Not really a (clue)';
		// Since it can't parse a number from `(clue)`, it should just treat it like no match found.
		const expected = 'Not really a (clue).';
		expect(formatClueForScreenReader(input)).toBe(expected);
	});
});
