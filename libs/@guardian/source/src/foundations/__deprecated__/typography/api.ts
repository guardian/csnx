import { fontStyleFunction } from './font-styles';
import type {
	BodySizes,
	HeadlineSizes,
	TextSansSizes,
	TitlepieceSizes,
	TypographyConfiguration,
	TypographyFunctions,
} from './types';

const titlepieceDefaults: TypographyConfiguration = {
	lineHeight: 'tight',
	fontWeight: 'bold',
	fontStyle: null,
	unit: 'rem',
};

/**
 * @deprecated Use web typography presets instead
 * https://guardian.github.io/storybooks/?path=/docs/source_foundations-typography--docs
 */
export const titlepieceObjectStyles: TypographyFunctions<TitlepieceSizes> = {
	small: fontStyleFunction('titlepiece', 'small', titlepieceDefaults),
	medium: fontStyleFunction('titlepiece', 'medium', titlepieceDefaults),
	large: fontStyleFunction('titlepiece', 'large', titlepieceDefaults),
};

const headlineDefaults: TypographyConfiguration = {
	lineHeight: 'tight',
	fontWeight: 'medium',
	fontStyle: null,
	unit: 'rem',
};

/**
 * @deprecated Use web typography presets instead
 * https://guardian.github.io/storybooks/?path=/docs/source_foundations-typography--docs
 */
export const headlineObjectStyles: TypographyFunctions<HeadlineSizes> = {
	xxxsmall: fontStyleFunction('headline', 'xxxsmall', headlineDefaults),
	xxsmall: fontStyleFunction('headline', 'xxsmall', headlineDefaults),
	xsmall: fontStyleFunction('headline', 'xsmall', headlineDefaults),
	small: fontStyleFunction('headline', 'small', headlineDefaults),
	medium: fontStyleFunction('headline', 'medium', headlineDefaults),
	large: fontStyleFunction('headline', 'large', headlineDefaults),
	xlarge: fontStyleFunction('headline', 'xlarge', headlineDefaults),
};

const bodyDefaults: TypographyConfiguration = {
	lineHeight: 'loose',
	fontWeight: 'regular',
	fontStyle: null,
	unit: 'rem',
};

/**
 * @deprecated Use web typography presets instead
 * https://guardian.github.io/storybooks/?path=/docs/source_foundations-typography--docs
 */
export const bodyObjectStyles: TypographyFunctions<BodySizes> = {
	xsmall: fontStyleFunction('body', 'xsmall', bodyDefaults),
	small: fontStyleFunction('body', 'small', bodyDefaults),
	medium: fontStyleFunction('body', 'medium', bodyDefaults),
};

const textSansDefaults: TypographyConfiguration = {
	lineHeight: 'regular',
	fontWeight: 'regular',
	fontStyle: null,
	unit: 'rem',
};

/**
 * @deprecated Use web typography presets instead
 * https://guardian.github.io/storybooks/?path=/docs/source_foundations-typography--docs
 */
export const textSansObjectStyles: TypographyFunctions<TextSansSizes> = {
	xxsmall: fontStyleFunction('textSans', 'xxsmall', textSansDefaults),
	xsmall: fontStyleFunction('textSans', 'xsmall', textSansDefaults),
	small: fontStyleFunction('textSans', 'small', textSansDefaults),
	medium: fontStyleFunction('textSans', 'medium', textSansDefaults),
	large: fontStyleFunction('textSans', 'large', textSansDefaults),
	xlarge: fontStyleFunction('textSans', 'xlarge', textSansDefaults),
	xxlarge: fontStyleFunction('textSans', 'xxlarge', textSansDefaults),
	xxxlarge: fontStyleFunction('textSans', 'xxxlarge', textSansDefaults),
};
