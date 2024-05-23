import {
	bodyObjectStyles,
	headlineObjectStyles,
	textSansObjectStyles,
	titlepieceObjectStyles,
} from './api';
import { fontStyleToStringFunction } from './font-styles';
import type {
	BodySizes,
	HeadlineSizes,
	TextSansSizes,
	TitlepieceSizes,
	TypographyStrFunctions,
} from './types';

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/docs/source_foundations-typography--titlepiece) •
 * [Design System](https://theguardian.design/2a1e5182b/p/602314-typography/t/358767)
 *
 * ```
 * font-family: 'GT Guardian Titlepiece';
 * ```
 *
 * @deprecated Use web typography presets instead
 * https://guardian.github.io/storybooks/?path=/docs/source_foundations-typography--docs
 */
export const titlepiece: TypographyStrFunctions<TitlepieceSizes> = {
	small: fontStyleToStringFunction(titlepieceObjectStyles.small),
	medium: fontStyleToStringFunction(titlepieceObjectStyles.medium),
	large: fontStyleToStringFunction(titlepieceObjectStyles.large),
};

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/docs/source_foundations-typography--headline) •
 * [Design System](https://theguardian.design/2a1e5182b/p/602314-typography/t/7310bd)
 *
 * ```
 * font-family: 'GH Guardian Headline';
 * ```
 *
 * @deprecated Use web typography presets instead
 * https://guardian.github.io/storybooks/?path=/docs/source_foundations-typography--docs
 */
export const headline: TypographyStrFunctions<HeadlineSizes> = {
	xxxsmall: fontStyleToStringFunction(headlineObjectStyles.xxxsmall),
	xxsmall: fontStyleToStringFunction(headlineObjectStyles.xxsmall),
	xsmall: fontStyleToStringFunction(headlineObjectStyles.xsmall),
	small: fontStyleToStringFunction(headlineObjectStyles.small),
	medium: fontStyleToStringFunction(headlineObjectStyles.medium),
	large: fontStyleToStringFunction(headlineObjectStyles.large),
	xlarge: fontStyleToStringFunction(headlineObjectStyles.xlarge),
};

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/docs/source_foundations-typography--body) •
 * [Design System](https://theguardian.design/2a1e5182b/p/602314-typography/t/88cd8e)
 *
 * ```
 * font-family: 'GuardianTextEgyptian';
 * ```
 *
 * @deprecated Use web typography presets instead
 * https://guardian.github.io/storybooks/?path=/docs/source_foundations-typography--docs
 */
export const body: TypographyStrFunctions<BodySizes> = {
	xsmall: fontStyleToStringFunction(bodyObjectStyles.xsmall),
	small: fontStyleToStringFunction(bodyObjectStyles.small),
	medium: fontStyleToStringFunction(bodyObjectStyles.medium),
};

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/docs/source_foundations-typography--text-sans) •
 * [Design System](https://theguardian.design/2a1e5182b/p/602314-typography/t/076605)
 *
 * ```
 * font-family: 'GuardianTextSans';
 * ```
 *
 * @deprecated Use web typography presets instead
 * https://guardian.github.io/storybooks/?path=/docs/source_foundations-typography--docs
 */
export const textSans: TypographyStrFunctions<TextSansSizes> = {
	xxsmall: fontStyleToStringFunction(textSansObjectStyles.xxsmall),
	xsmall: fontStyleToStringFunction(textSansObjectStyles.xsmall),
	small: fontStyleToStringFunction(textSansObjectStyles.small),
	medium: fontStyleToStringFunction(textSansObjectStyles.medium),
	large: fontStyleToStringFunction(textSansObjectStyles.large),
	xlarge: fontStyleToStringFunction(textSansObjectStyles.xlarge),
	xxlarge: fontStyleToStringFunction(textSansObjectStyles.xxlarge),
	xxxlarge: fontStyleToStringFunction(textSansObjectStyles.xxxlarge),
};

export {
	bodySizes,
	headlineSizes,
	remBodySizes,
	remHeadlineSizes,
	remTextSansSizes,
	remTitlepieceSizes,
	textSansSizes,
	titlepieceSizes,
	fonts,
	lineHeights,
	fontWeights,
} from './data';

export type {
	ScaleUnit,
	Category,
	LineHeight,
	FontWeight,
	FontStyle,
	FontWeightDefinition,
} from './types';
