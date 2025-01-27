import { stripHtmlTags } from './stripHtmlTags';

describe('stripHtmlTags', () => {
	test('removes <b> tags and retains the text content', () => {
		const input = 'This is <b>bold</b> text.';
		const expected = 'This is bold text.';
		expect(stripHtmlTags(input)).toBe(expected);
	});
	test('removes <i> tags and retains the text content', () => {
		const input = 'This is <i>italic</i> text.';
		const expected = 'This is italic text.';
		expect(stripHtmlTags(input)).toBe(expected);
	});

	test('removes <span> tags with attributes and retains the text content', () => {
		const input = 'Here is a <span class="highlight">span element</span>.';
		const expected = 'Here is a span element.';
		expect(stripHtmlTags(input)).toBe(expected);
	});

	test('removes <sup> and <sub> tags and retains the text content', () => {
		const input = 'This is a <sup>superscript</sup> and <sub>subscript</sub>.';
		const expected = 'This is a superscript and subscript.';
		expect(stripHtmlTags(input)).toBe(expected);
	});

	test('handles nested tags properly', () => {
		const input = '<b>This is <i>bold and italic</i></b>.';
		const expected = 'This is bold and italic.';
		expect(stripHtmlTags(input)).toBe(expected);
	});

	test('handles multiple instances of the same tag', () => {
		const input = '<b>Bold</b> and <b>another bold</b>.';
		const expected = 'Bold and another bold.';
		expect(stripHtmlTags(input)).toBe(expected);
	});

	test('handles a mix of allowed and disallowed tags', () => {
		const input = '<b>Bold</b>, <i>italic</i>, and <em>emphasized</em> text.';
		const expected = 'Bold, italic, and <em>emphasized</em> text.';
		expect(stripHtmlTags(input)).toBe(expected);
	});

	test('leaves unmentioned tags untouched', () => {
		const input =
			'Here is <u>underlined</u> and <mark>highlighted</mark> text.';
		const expected =
			'Here is <u>underlined</u> and <mark>highlighted</mark> text.';
		expect(stripHtmlTags(input)).toBe(expected);
	});

	test('handles empty input gracefully', () => {
		const input = '';
		const expected = '';
		expect(stripHtmlTags(input)).toBe(expected);
	});

	test('handles strings without HTML tags', () => {
		const input = 'Plain text with no tags.';
		const expected = 'Plain text with no tags.';
		expect(stripHtmlTags(input)).toBe(expected);
	});

	test('handles strings with other tags', () => {
		const input = '<text> tags.';
		const expected = '<text> tags.';
		expect(stripHtmlTags(input)).toBe(expected);
	});

	test('handles strings < and >', () => {
		const input = 'Plain < text > with no tags.';
		const expected = 'Plain < text > with no tags.';
		expect(stripHtmlTags(input)).toBe(expected);
	});
});
