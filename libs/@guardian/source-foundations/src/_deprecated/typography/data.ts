import { tokens } from '@guardian/design-tokens';
import {
	fontArrayToString,
	pxStringToNumber,
	pxToRem,
} from '../../utils/convert-value';
import type { AvailableFontWeights, ItalicsFontWeights } from './types';

/**
 * Pixel size values for each font that we use in the design system.
 *
 * We assert that the values match the guardian type scale in our
 * {@link [unit test suite](./typography.test.ts)}.
 *
 * @deprecated Please typography presets rather than setting individual values
 */
export const pxTextSizes = {
	textSans: {
		xxsmall: pxStringToNumber(tokens.typography.textSans.xxSmall.fontSize),
		xsmall: pxStringToNumber(tokens.typography.textSans.xSmall.fontSize),
		small: pxStringToNumber(tokens.typography.textSans.small.fontSize),
		medium: pxStringToNumber(tokens.typography.textSans.medium.fontSize),
		large: pxStringToNumber(tokens.typography.textSans.large.fontSize),
		xlarge: pxStringToNumber(tokens.typography.textSans.xLarge.fontSize),
		xxlarge: pxStringToNumber(tokens.typography.textSans.xxLarge.fontSize),
		xxxlarge: pxStringToNumber(tokens.typography.textSans.xxxLarge.fontSize),
	},
	body: {
		xsmall: pxStringToNumber(tokens.typography.body.xSmall.fontSize),
		small: pxStringToNumber(tokens.typography.body.small.fontSize),
		medium: pxStringToNumber(tokens.typography.body.medium.fontSize),
	},
	headline: {
		xxxsmall: pxStringToNumber(tokens.typography.headline.xxxSmall.fontSize),
		xxsmall: pxStringToNumber(tokens.typography.headline.xxSmall.fontSize),
		xsmall: pxStringToNumber(tokens.typography.headline.xSmall.fontSize),
		small: pxStringToNumber(tokens.typography.headline.small.fontSize),
		medium: pxStringToNumber(tokens.typography.headline.medium.fontSize),
		large: pxStringToNumber(tokens.typography.headline.large.fontSize),
		xlarge: pxStringToNumber(tokens.typography.headline.xLarge.fontSize),
	},
	titlepiece: {
		small: pxStringToNumber(tokens.typography.titlepiece.small.fontSize),
		medium: pxStringToNumber(tokens.typography.titlepiece.medium.fontSize),
		large: pxStringToNumber(tokens.typography.titlepiece.large.fontSize),
	},
} as const;

/**
 * Relative font sizes, calculated from the pixel sizes above;
 * using the pxToRem method.
 *
 * We assert that the computed rem values match the expected values
 * in our {@link [unit test suite](./typography.test.ts)}.
 *
 * See {@link [pxToRem](../utils/convert-value.ts)} for more details.
 *
 * @deprecated Please typography presets rather than setting individual values
 */
export const remTextSizes = {
	textSans: {
		xxsmall: pxToRem(pxTextSizes.textSans.xxsmall),
		xsmall: pxToRem(pxTextSizes.textSans.xsmall),
		small: pxToRem(pxTextSizes.textSans.small),
		medium: pxToRem(pxTextSizes.textSans.medium),
		large: pxToRem(pxTextSizes.textSans.large),
		xlarge: pxToRem(pxTextSizes.textSans.xlarge),
		xxlarge: pxToRem(pxTextSizes.textSans.xxlarge),
		xxxlarge: pxToRem(pxTextSizes.textSans.xxxlarge),
	},
	body: {
		xsmall: pxToRem(pxTextSizes.body.xsmall),
		small: pxToRem(pxTextSizes.body.small),
		medium: pxToRem(pxTextSizes.body.medium),
	},
	headline: {
		xxxsmall: pxToRem(pxTextSizes.headline.xxxsmall),
		xxsmall: pxToRem(pxTextSizes.headline.xxsmall),
		xsmall: pxToRem(pxTextSizes.headline.xsmall),
		small: pxToRem(pxTextSizes.headline.small),
		medium: pxToRem(pxTextSizes.headline.medium),
		large: pxToRem(pxTextSizes.headline.large),
		xlarge: pxToRem(pxTextSizes.headline.xlarge),
	},
	titlepiece: {
		small: pxToRem(pxTextSizes.titlepiece.small),
		medium: pxToRem(pxTextSizes.titlepiece.medium),
		large: pxToRem(pxTextSizes.titlepiece.large),
	},
} as const;

/**
 * @deprecated Please typography presets rather than setting individual values
 */
export const fonts = {
	titlepiece: fontArrayToString(tokens.typography.fontFamily.titlepiece),
	headline: fontArrayToString(tokens.typography.fontFamily.headline),
	body: fontArrayToString(tokens.typography.fontFamily.body),
	textSans: fontArrayToString(tokens.typography.fontFamily.textSans),
} as const;

/**
 * @see https://theguardian.design/2a1e5182b/p/0578f1-typography-presets/b/4704a2
 * @see https://www.figma.com/file/OqhZwB5nboFn33iHLYoc6d/%E2%97%90-Typography?type=design&node-id=384%3A3&t=mYsLeX87mBF2Uw8J-1
 *
 * Relative units ensure users can change their user-agent’s font size
 * and having the line height grow accordingly.
 *
 * We meet the Web Consortium Accessibility Guidelines’
 * success criterion for “Text Spacing” (1.4.12) as these values
 * can be overridden by users.
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/text-spacing
 *
 * @deprecated Please typography presets rather than setting individual values
 */
export const lineHeights = {
	tight: tokens.typography.lineHeight.tight,
	regular: tokens.typography.lineHeight.regular,
	loose: tokens.typography.lineHeight.loose,
} as const;

/** @deprecated Please typography presets rather than setting individual values */
export const fontWeights = {
	light: tokens.typography.fontWeight.light,
	regular: tokens.typography.fontWeight.regular,
	medium: tokens.typography.fontWeight.medium,
	bold: tokens.typography.fontWeight.bold,
} as const;

/** @deprecated Please typography presets rather than setting individual values */
export const availableFontWeights = {
	titlepiece: { bold: true },
	headline: { light: true, medium: true, bold: true },
	body: { regular: true, bold: true },
	textSans: { regular: true, bold: true },
} as AvailableFontWeights;

/** @deprecated Please typography presets rather than setting individual values */
export const italicsFontWeights = {
	titlepiece: { bold: false },
	headline: { light: true, medium: true, bold: false },
	body: { regular: true, bold: true },
	textSans: { regular: true, bold: false },
} as ItalicsFontWeights;

/** @deprecated Please typography presets rather than setting individual values */
export const underlineThickness = {
	textSans: {
		xxsmall: pxStringToNumber(
			tokens.typography.textDecorationThicknessForFontSize[12],
		),
		xsmall: pxStringToNumber(
			tokens.typography.textDecorationThicknessForFontSize[14],
		),
		small: pxStringToNumber(
			tokens.typography.textDecorationThicknessForFontSize[15],
		),
		medium: pxStringToNumber(
			tokens.typography.textDecorationThicknessForFontSize[17],
		),
		large: pxStringToNumber(
			tokens.typography.textDecorationThicknessForFontSize[20],
		),
		xlarge: pxStringToNumber(
			tokens.typography.textDecorationThicknessForFontSize[24],
		),
		xxlarge: pxStringToNumber(
			tokens.typography.textDecorationThicknessForFontSize[28],
		),
		xxxlarge: pxStringToNumber(
			tokens.typography.textDecorationThicknessForFontSize[34],
		),
	},
	body: {
		xsmall: pxStringToNumber(
			tokens.typography.textDecorationThicknessForFontSize[14],
		),
		small: pxStringToNumber(
			tokens.typography.textDecorationThicknessForFontSize[15],
		),
		medium: pxStringToNumber(
			tokens.typography.textDecorationThicknessForFontSize[17],
		),
	},
	headline: {
		xxxsmall: pxStringToNumber(
			tokens.typography.textDecorationThicknessForFontSize[17],
		),
		xxsmall: pxStringToNumber(
			tokens.typography.textDecorationThicknessForFontSize[20],
		),
		xsmall: pxStringToNumber(
			tokens.typography.textDecorationThicknessForFontSize[24],
		),
		small: pxStringToNumber(
			tokens.typography.textDecorationThicknessForFontSize[28],
		),
		medium: pxStringToNumber(
			tokens.typography.textDecorationThicknessForFontSize[34],
		),
		large: pxStringToNumber(
			tokens.typography.textDecorationThicknessForFontSize[42],
		),
		xlarge: pxStringToNumber(
			tokens.typography.textDecorationThicknessForFontSize[50],
		),
	},
	titlepiece: {
		small: pxStringToNumber(
			tokens.typography.textDecorationThicknessForFontSize[42],
		),
		medium: pxStringToNumber(
			tokens.typography.textDecorationThicknessForFontSize[50],
		),
		large: pxStringToNumber(
			tokens.typography.textDecorationThicknessForFontSize[70],
		),
	},
} as const;

// Pixel font size exports

/** @deprecated Please typography presets rather than setting individual values */
export const textSansSizes = pxTextSizes.textSans;

/** @deprecated Please typography presets rather than setting individual values */
export const bodySizes = pxTextSizes.body;

/** @deprecated Please typography presets rather than setting individual values */
export const headlineSizes = pxTextSizes.headline;

/** @deprecated Please typography presets rather than setting individual values */
export const titlepieceSizes = pxTextSizes.titlepiece;

// Computed rem font size exports

/** @deprecated Please typography presets rather than setting individual values */
export const remBodySizes = remTextSizes.body;

/** @deprecated Please typography presets rather than setting individual values */
export const remTitlepieceSizes = remTextSizes.titlepiece;

/** @deprecated Please typography presets rather than setting individual values */
export const remHeadlineSizes = remTextSizes.headline;

/** @deprecated Please typography presets rather than setting individual values */
export const remTextSansSizes = remTextSizes.textSans;
