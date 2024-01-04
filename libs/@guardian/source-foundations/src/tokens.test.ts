import { transitions } from './animation/transitions';
import { breakpoints } from './breakpoints/breakpoints';
import {
	background,
	border,
	brandAltBackground,
	brandAltBorder,
	brandAltLine,
	brandAltText,
	brandBackground,
	brandBorder,
	brandLine,
	brandText,
	line,
	palette,
	text,
} from './colour/palette';
import {
	height,
	iconSize,
	remHeight,
	remWidth,
	size,
	width,
} from './size/size';
import { remSpace, space } from './space/space';
import { body, headline, textSans, titlepiece } from './typography';
import {
	availableFontWeights,
	bodySizes,
	fonts,
	fontWeights,
	headlineSizes,
	italicsFontWeights,
	lineHeights,
	pxTextSizes,
	remBodySizes,
	remHeadlineSizes,
	remTextSansSizes,
	remTextSizes,
	remTitlepieceSizes,
	textSansSizes,
	titlepieceSizes,
	underlineThickness,
} from './typography/data';
import {
	bodyObjectStyles,
	headlineObjectStyles,
	textSansObjectStyles,
	titlepieceObjectStyles,
} from '.';

/**
 * Verify token output with snapshot tests.
 *
 * This is an additional safety net to catch instances of token values that have
 * been accidentally changed, or tokens that have been removed or missed.
 *
 * If these tests fail, please *do not* automatically update the snapshots
 * without checking that the output matches what you are expecting to see.
 */

describe('transitions', () => {
	it('matches existing token values in snapshot', () => {
		expect(transitions).toMatchSnapshot();
	});
});

describe('breakpoints', () => {
	it('matches existing token values in snapshot', () => {
		expect(breakpoints).toMatchSnapshot();
	});
});

describe('palette', () => {
	it('matches existing token values in snapshot', () => {
		expect(palette).toMatchSnapshot();
		expect(background).toMatchSnapshot();
		expect(brandBackground).toMatchSnapshot();
		expect(brandAltBackground).toMatchSnapshot();
		expect(border).toMatchSnapshot();
		expect(brandBorder).toMatchSnapshot();
		expect(brandAltBorder).toMatchSnapshot();
		expect(line).toMatchSnapshot();
		expect(brandLine).toMatchSnapshot();
		expect(brandAltLine).toMatchSnapshot();
		expect(text).toMatchSnapshot();
		expect(brandText).toMatchSnapshot();
		expect(brandAltText).toMatchSnapshot();
	});
});

describe('size', () => {
	it('matches existing token values in snapshot', () => {
		expect(size).toMatchSnapshot();
		expect(iconSize).toMatchSnapshot();
		expect(height).toMatchSnapshot();
		expect(remHeight).toMatchSnapshot();
		expect(width).toMatchSnapshot();
		expect(remWidth).toMatchSnapshot();
	});
});

describe('space', () => {
	it('matches existing token values in snapshot', () => {
		expect(space).toMatchSnapshot();
		expect(remSpace).toMatchSnapshot();
	});
});

describe('typography', () => {
	/**
	 * Typography tokens
	 */
	it('matches existing token values in snapshot', () => {
		expect(pxTextSizes).toMatchSnapshot();
		expect(remTextSizes).toMatchSnapshot();
		expect(fonts).toMatchSnapshot();
		expect(lineHeights).toMatchSnapshot();
		expect(fontWeights).toMatchSnapshot();
		expect(availableFontWeights).toMatchSnapshot();
		expect(italicsFontWeights).toMatchSnapshot();
		expect(underlineThickness).toMatchSnapshot();
		expect(textSansSizes).toMatchSnapshot();
		expect(bodySizes).toMatchSnapshot();
		expect(headlineSizes).toMatchSnapshot();
		expect(titlepieceSizes).toMatchSnapshot();
		expect(remTextSansSizes).toMatchSnapshot();
		expect(remBodySizes).toMatchSnapshot();
		expect(remHeadlineSizes).toMatchSnapshot();
		expect(remTitlepieceSizes).toMatchSnapshot();
	});

	/**
	 * Typography API CSS property output
	 */
	it('matches existing API CSS output in snapshot', () => {
		expect(textSans.xxsmall()).toMatchSnapshot();
		expect(textSans.xsmall()).toMatchSnapshot();
		expect(textSans.small()).toMatchSnapshot();
		expect(textSans.medium()).toMatchSnapshot();
		expect(textSans.large()).toMatchSnapshot();
		expect(textSans.xlarge()).toMatchSnapshot();
		expect(textSans.xxlarge()).toMatchSnapshot();
		expect(textSans.xxxlarge()).toMatchSnapshot();
		expect(body.xsmall()).toMatchSnapshot();
		expect(body.small()).toMatchSnapshot();
		expect(body.medium()).toMatchSnapshot();
		expect(headline.xxxsmall()).toMatchSnapshot();
		expect(headline.xxsmall()).toMatchSnapshot();
		expect(headline.xsmall()).toMatchSnapshot();
		expect(headline.small()).toMatchSnapshot();
		expect(headline.medium()).toMatchSnapshot();
		expect(headline.large()).toMatchSnapshot();
		expect(headline.xlarge()).toMatchSnapshot();
		expect(titlepiece.small()).toMatchSnapshot();
		expect(titlepiece.medium()).toMatchSnapshot();
		expect(titlepiece.large()).toMatchSnapshot();
	});

	/**
	 * Typography API object style CSS output
	 */
	it('matches existing API object output in snapshot', () => {
		expect(textSansObjectStyles.xxsmall()).toMatchSnapshot();
		expect(textSansObjectStyles.xsmall()).toMatchSnapshot();
		expect(textSansObjectStyles.small()).toMatchSnapshot();
		expect(textSansObjectStyles.medium()).toMatchSnapshot();
		expect(textSansObjectStyles.large()).toMatchSnapshot();
		expect(textSansObjectStyles.xlarge()).toMatchSnapshot();
		expect(textSansObjectStyles.xxlarge()).toMatchSnapshot();
		expect(textSansObjectStyles.xxxlarge()).toMatchSnapshot();
		expect(bodyObjectStyles.xsmall()).toMatchSnapshot();
		expect(bodyObjectStyles.small()).toMatchSnapshot();
		expect(bodyObjectStyles.medium()).toMatchSnapshot();
		expect(headlineObjectStyles.xxxsmall()).toMatchSnapshot();
		expect(headlineObjectStyles.xxsmall()).toMatchSnapshot();
		expect(headlineObjectStyles.xsmall()).toMatchSnapshot();
		expect(headlineObjectStyles.small()).toMatchSnapshot();
		expect(headlineObjectStyles.medium()).toMatchSnapshot();
		expect(headlineObjectStyles.large()).toMatchSnapshot();
		expect(headlineObjectStyles.xlarge()).toMatchSnapshot();
		expect(titlepieceObjectStyles.small()).toMatchSnapshot();
		expect(titlepieceObjectStyles.medium()).toMatchSnapshot();
		expect(titlepieceObjectStyles.large()).toMatchSnapshot();
	});
});
