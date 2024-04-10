import {
	fonts,
	fontWeights,
	headlineObjectStyles,
	headlineSizes,
	lineHeights,
	remHeadlineSizes,
} from './index';

it('should return styles containing the specified font family', () => {
	const mediumHeadlineStyles = headlineObjectStyles.medium();

	expect(mediumHeadlineStyles.fontFamily).toBe(fonts.headline);
});

it('should return styles containing the specified font size', () => {
	const mediumHeadlineStyles = headlineObjectStyles.medium();

	expect(mediumHeadlineStyles.fontSize).toBe(`${remHeadlineSizes.medium}rem`);
});

it('should return styles containing the specified font size in px if requested', () => {
	const mediumHeadlineStyles = headlineObjectStyles.medium({ unit: 'px' });

	expect(mediumHeadlineStyles.fontSize).toBe(headlineSizes.medium);
});

it('should return styles containing the specified font weight', () => {
	const mediumHeadlineStyles = headlineObjectStyles.medium({
		fontWeight: 'bold',
	});

	expect(mediumHeadlineStyles.fontWeight).toBe(fontWeights.bold);
});

it('should return styles containing the specified line height', () => {
	const mediumHeadlineStyles = headlineObjectStyles.medium({
		lineHeight: 'tight',
	});

	expect(mediumHeadlineStyles.lineHeight).toBe(lineHeights.tight);
});

it('should return styles containing the specified line height in px if requested', () => {
	const mediumHeadlineStyles = headlineObjectStyles.medium({
		lineHeight: 'tight',
		unit: 'px',
	});

	expect(mediumHeadlineStyles.lineHeight).toBe(
		`${lineHeights.tight * headlineSizes.medium}px`,
	);
});

it('should return italic styles if specified', () => {
	const mediumHeadlineStyles = headlineObjectStyles.medium({
		fontStyle: 'italic',
	});

	expect(mediumHeadlineStyles.fontStyle).toBe('italic');
});

it('should not include italic font style if it is not available for requested font', () => {
	const mediumHeadlineStyles = headlineObjectStyles.medium({
		fontWeight: 'bold',
		fontStyle: 'italic',
	});

	expect(mediumHeadlineStyles.fontStyle).toBeUndefined();
});
