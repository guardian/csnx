import { typography } from '@guardian/design-tokens';
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
 * @deprecated Use typography presets rather than setting individual values
 * https://guardian.github.io/storybooks/?path=/docs/source-foundations_typography--docs
 */
export const pxTextSizes = {
	textSans: {
		xxsmall: pxStringToNumber(typography.textSans.xxSmall.fontSize),
		xsmall: pxStringToNumber(typography.textSans.xSmall.fontSize),
		small: pxStringToNumber(typography.textSans.small.fontSize),
		medium: pxStringToNumber(typography.textSans.medium.fontSize),
		large: pxStringToNumber(typography.textSans.large.fontSize),
		xlarge: pxStringToNumber(typography.textSans.xLarge.fontSize),
		xxlarge: pxStringToNumber(typography.textSans.xxLarge.fontSize),
		xxxlarge: pxStringToNumber(typography.textSans.xxxLarge.fontSize),
	},
	body: {
		xsmall: pxStringToNumber(typography.body.xSmall.fontSize),
		small: pxStringToNumber(typography.body.small.fontSize),
		medium: pxStringToNumber(typography.body.medium.fontSize),
	},
	headline: {
		xxxsmall: pxStringToNumber(typography.headline.xxxSmall.fontSize),
		xxsmall: pxStringToNumber(typography.headline.xxSmall.fontSize),
		xsmall: pxStringToNumber(typography.headline.xSmall.fontSize),
		small: pxStringToNumber(typography.headline.small.fontSize),
		medium: pxStringToNumber(typography.headline.medium.fontSize),
		large: pxStringToNumber(typography.headline.large.fontSize),
		xlarge: pxStringToNumber(typography.headline.xLarge.fontSize),
	},
	titlepiece: {
		small: pxStringToNumber(typography.titlepiece.small.fontSize),
		medium: pxStringToNumber(typography.titlepiece.medium.fontSize),
		large: pxStringToNumber(typography.titlepiece.large.fontSize),
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
 * @deprecated Use typography presets rather than setting individual values
 * https://guardian.github.io/storybooks/?path=/docs/source-foundations_typography--docs
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
 * @deprecated Use typography presets rather than setting individual values
 * https://guardian.github.io/storybooks/?path=/docs/source-foundations_typography--docs
 */
export const fonts = {
	titlepiece: fontArrayToString(typography.fontFamily.titlepiece),
	headline: fontArrayToString(typography.fontFamily.headline),
	body: fontArrayToString(typography.fontFamily.body),
	textSans: fontArrayToString(typography.fontFamily.textSans),
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
 * @deprecated Use typography presets rather than setting individual values
 * https://guardian.github.io/storybooks/?path=/docs/source-foundations_typography--docs
 */
export const lineHeights = {
	tight: typography.lineHeight.tight,
	regular: typography.lineHeight.regular,
	loose: typography.lineHeight.loose,
} as const;

/**
 * @deprecated Use typography presets rather than setting individual values
 * https://guardian.github.io/storybooks/?path=/docs/source-foundations_typography--docs
 */
export const fontWeights = {
	light: typography.fontWeight.light,
	regular: typography.fontWeight.regular,
	medium: typography.fontWeight.medium,
	bold: typography.fontWeight.bold,
} as const;

/**
 * @deprecated Use typography presets rather than setting individual values
 * https://guardian.github.io/storybooks/?path=/docs/source-foundations_typography--docs
 */
export const availableFontWeights = {
	titlepiece: { bold: true },
	headline: { light: true, medium: true, bold: true },
	body: { regular: true, bold: true },
	textSans: { regular: true, bold: true },
} as AvailableFontWeights;

/**
 * @deprecated Use typography presets rather than setting individual values
 * https://guardian.github.io/storybooks/?path=/docs/source-foundations_typography--docs
 */
export const italicsFontWeights = {
	titlepiece: { bold: false },
	headline: { light: true, medium: true, bold: false },
	body: { regular: true, bold: true },
	textSans: { regular: true, bold: false },
} as ItalicsFontWeights;

/**
 * @deprecated Use typography presets rather than setting individual values
 * https://guardian.github.io/storybooks/?path=/docs/source-foundations_typography--docs
 */
export const underlineThickness = {
	textSans: {
		xxsmall: pxStringToNumber(
			typography.textDecorationThicknessForFontSize[12],
		),
		xsmall: pxStringToNumber(typography.textDecorationThicknessForFontSize[14]),
		small: pxStringToNumber(typography.textDecorationThicknessForFontSize[15]),
		medium: pxStringToNumber(typography.textDecorationThicknessForFontSize[17]),
		large: pxStringToNumber(typography.textDecorationThicknessForFontSize[20]),
		xlarge: pxStringToNumber(typography.textDecorationThicknessForFontSize[24]),
		xxlarge: pxStringToNumber(
			typography.textDecorationThicknessForFontSize[28],
		),
		xxxlarge: pxStringToNumber(
			typography.textDecorationThicknessForFontSize[34],
		),
	},
	body: {
		xsmall: pxStringToNumber(typography.textDecorationThicknessForFontSize[14]),
		small: pxStringToNumber(typography.textDecorationThicknessForFontSize[15]),
		medium: pxStringToNumber(typography.textDecorationThicknessForFontSize[17]),
	},
	headline: {
		xxxsmall: pxStringToNumber(
			typography.textDecorationThicknessForFontSize[17],
		),
		xxsmall: pxStringToNumber(
			typography.textDecorationThicknessForFontSize[20],
		),
		xsmall: pxStringToNumber(typography.textDecorationThicknessForFontSize[24]),
		small: pxStringToNumber(typography.textDecorationThicknessForFontSize[28]),
		medium: pxStringToNumber(typography.textDecorationThicknessForFontSize[34]),
		large: pxStringToNumber(typography.textDecorationThicknessForFontSize[42]),
		xlarge: pxStringToNumber(typography.textDecorationThicknessForFontSize[50]),
	},
	titlepiece: {
		small: pxStringToNumber(typography.textDecorationThicknessForFontSize[42]),
		medium: pxStringToNumber(typography.textDecorationThicknessForFontSize[50]),
		large: pxStringToNumber(typography.textDecorationThicknessForFontSize[70]),
	},
} as const;

// Pixel font size exports

/**
 * @deprecated Use typography presets rather than setting individual values
 * https://guardian.github.io/storybooks/?path=/docs/source-foundations_typography--docs
 */
export const textSansSizes = pxTextSizes.textSans;

/**
 * @deprecated Use typography presets rather than setting individual values
 * https://guardian.github.io/storybooks/?path=/docs/source-foundations_typography--docs
 */
export const bodySizes = pxTextSizes.body;

/**
 * @deprecated Use typography presets rather than setting individual values
 * https://guardian.github.io/storybooks/?path=/docs/source-foundations_typography--docs
 */
export const headlineSizes = pxTextSizes.headline;

/**
 * @deprecated Use typography presets rather than setting individual values
 * https://guardian.github.io/storybooks/?path=/docs/source-foundations_typography--docs
 */
export const titlepieceSizes = pxTextSizes.titlepiece;

// Computed rem font size exports

/**
 * @deprecated Use typography presets rather than setting individual values
 * https://guardian.github.io/storybooks/?path=/docs/source-foundations_typography--docs
 */
export const remBodySizes = remTextSizes.body;

/**
 * @deprecated Use typography presets rather than setting individual values
 * https://guardian.github.io/storybooks/?path=/docs/source-foundations_typography--docs
 */
export const remTitlepieceSizes = remTextSizes.titlepiece;

/**
 * @deprecated Use typography presets rather than setting individual values
 * https://guardian.github.io/storybooks/?path=/docs/source-foundations_typography--docs
 */
export const remHeadlineSizes = remTextSizes.headline;

/**
 * @deprecated Use typography presets rather than setting individual values
 * https://guardian.github.io/storybooks/?path=/docs/source-foundations_typography--docs
 */
export const remTextSansSizes = remTextSizes.textSans;
