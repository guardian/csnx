import { tokens } from '@csnx/design-tokens';
import {
	fontArrayToString,
	pxStringToNumber,
	pxToRem,
} from '../utils/convert-value';
import type { AvailableFontWeights, ItalicsFontWeights } from './types';

/**
 * Pixel size values for each font that we use in the design system.
 *
 * We assert that the values match the guardian type scale in our
 * {@link [unit test suite](./typography.test.ts)}.
 */
export const pxTextSizes = {
	textSans: {
		xxsmall: pxStringToNumber(tokens.font.textSans.xxSmall.fontSize!),
		xsmall: pxStringToNumber(tokens.font.textSans.xSmall.fontSize!),
		small: pxStringToNumber(tokens.font.textSans.small.fontSize!),
		medium: pxStringToNumber(tokens.font.textSans.medium.fontSize!),
		large: pxStringToNumber(tokens.font.textSans.large.fontSize!),
		xlarge: pxStringToNumber(tokens.font.textSans.xLarge.fontSize!),
		xxlarge: pxStringToNumber(tokens.font.textSans.xxLarge.fontSize!),
		xxxlarge: pxStringToNumber(tokens.font.textSans.xxxLarge.fontSize!),
	},
	body: {
		xsmall: pxStringToNumber(tokens.font.body.xSmall.fontSize!),
		small: pxStringToNumber(tokens.font.body.small.fontSize!),
		medium: pxStringToNumber(tokens.font.body.medium.fontSize!),
	},
	headline: {
		xxxsmall: pxStringToNumber(tokens.font.headline.xxxSmall.fontSize!),
		xxsmall: pxStringToNumber(tokens.font.headline.xxSmall.fontSize!),
		xsmall: pxStringToNumber(tokens.font.headline.xSmall.fontSize!),
		small: pxStringToNumber(tokens.font.headline.small.fontSize!),
		medium: pxStringToNumber(tokens.font.headline.medium.fontSize!),
		large: pxStringToNumber(tokens.font.headline.large.fontSize!),
		xlarge: pxStringToNumber(tokens.font.headline.xLarge.fontSize!),
	},
	titlepiece: {
		small: pxStringToNumber(tokens.font.titlepiece.small.fontSize!),
		medium: pxStringToNumber(tokens.font.titlepiece.medium.fontSize!),
		large: pxStringToNumber(tokens.font.titlepiece.large.fontSize!),
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

export const fonts = {
	titlepiece: fontArrayToString(tokens.font.family.titlepiece),
	headline: fontArrayToString(tokens.font.family.headline),
	body: fontArrayToString(tokens.font.family.body),
	textSans: fontArrayToString(tokens.font.family.textSans),
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
 */
export const lineHeights = {
	tight: tokens.font.lineHeight.tight,
	regular: tokens.font.lineHeight.regular,
	loose: tokens.font.lineHeight.loose,
} as const;

export const fontWeights = {
	light: tokens.font.weight.light,
	regular: tokens.font.weight.regular,
	medium: tokens.font.weight.medium,
	bold: tokens.font.weight.bold,
} as const;

export const availableFontWeights = {
	titlepiece: { bold: true },
	headline: { light: true, medium: true, bold: true },
	body: { regular: true, bold: true },
	textSans: { regular: true, bold: true },
} as AvailableFontWeights;

export const italicsFontWeights = {
	titlepiece: { bold: false },
	headline: { light: true, medium: true, bold: false },
	body: { regular: true, bold: true },
	textSans: { regular: true, bold: false },
} as ItalicsFontWeights;

export const underlineThickness = {
	textSans: {
		xxsmall: tokens.font.textDecorationThickness[2],
		xsmall: tokens.font.textDecorationThickness[2],
		small: tokens.font.textDecorationThickness[2],
		medium: tokens.font.textDecorationThickness[2],
		large: tokens.font.textDecorationThickness[3],
		xlarge: tokens.font.textDecorationThickness[3],
		xxlarge: tokens.font.textDecorationThickness[3],
		xxxlarge: tokens.font.textDecorationThickness[4],
	},
	body: {
		xsmall: tokens.font.textDecorationThickness[2],
		small: tokens.font.textDecorationThickness[2],
		medium: tokens.font.textDecorationThickness[2],
	},
	headline: {
		xxxsmall: tokens.font.textDecorationThickness[2],
		xxsmall: tokens.font.textDecorationThickness[3],
		xsmall: tokens.font.textDecorationThickness[3],
		small: tokens.font.textDecorationThickness[3],
		medium: tokens.font.textDecorationThickness[4],
		large: tokens.font.textDecorationThickness[5],
		xlarge: tokens.font.textDecorationThickness[6],
	},
	titlepiece: {
		small: tokens.font.textDecorationThickness[5],
		medium: tokens.font.textDecorationThickness[6],
		large: tokens.font.textDecorationThickness[6],
	},
} as const;

// Pixel font size exports
export const textSansSizes = pxTextSizes.textSans;

export const bodySizes = pxTextSizes.body;

export const headlineSizes = pxTextSizes.headline;

export const titlepieceSizes = pxTextSizes.titlepiece;

// Computed rem font size exports
export const remBodySizes = remTextSizes.body;

export const remTitlepieceSizes = remTextSizes.titlepiece;

export const remHeadlineSizes = remTextSizes.headline;

export const remTextSansSizes = remTextSizes.textSans;
