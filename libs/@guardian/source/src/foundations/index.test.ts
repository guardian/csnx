import * as pkgExports from './index';

// this makes sure no type exports have been removed
// it won't catch that new ones have been added, but can anyone?
export type {
	Breakpoint,
	ScaleUnit,
	Category,
	LineHeight,
	FontWeight,
	FontStyle,
	FontWeightDefinition,
	Option,
	TypographyStyles,
	TypographySizes,
	TitlepieceSizes,
	HeadlineSizes,
	BodySizes,
	TextSansSizes,
	Fs,
	FontScaleFunction,
	FontScaleFunctionStr,
	FontScaleArgs,
} from './index';

it('Should have exactly these exports', () => {
	expect(Object.keys(pkgExports).sort()).toEqual([
		'FocusStyleManager',
		'appearance',
		'article15',
		'article15Object',
		'article17',
		'article17Object',
		'articleBold15',
		'articleBold15Object',
		'articleBold17',
		'articleBold17Object',
		'articleBoldItalic15',
		'articleBoldItalic15Object',
		'articleBoldItalic17',
		'articleBoldItalic17Object',
		'articleItalic15',
		'articleItalic15Object',
		'articleItalic17',
		'articleItalic17Object',
		'background',
		'between',
		'body',
		'bodyObjectStyles',
		'bodySizes',
		'border',
		'brand',
		'brandAlt',
		'brandAltBackground',
		'brandAltBorder',
		'brandAltLine',
		'brandAltText',
		'brandBackground',
		'brandBorder',
		'brandLine',
		'brandText',
		'breakpoints',
		'culture',
		'descriptionId',
		'error',
		'focus',
		'focusHalo',
		'focusHaloSpaced',
		'fontWeights',
		'fonts',
		'from',
		'generateSourceId',
		'headline',
		'headlineBold14',
		'headlineBold14Object',
		'headlineBold15',
		'headlineBold15Object',
		'headlineBold17',
		'headlineBold17Object',
		'headlineBold20',
		'headlineBold20Object',
		'headlineBold24',
		'headlineBold24Object',
		'headlineBold28',
		'headlineBold28Object',
		'headlineBold34',
		'headlineBold34Object',
		'headlineBold42',
		'headlineBold42Object',
		'headlineBold50',
		'headlineBold50Object',
		'headlineBold64',
		'headlineBold64Object',
		'headlineLight14',
		'headlineLight14Object',
		'headlineLight15',
		'headlineLight15Object',
		'headlineLight17',
		'headlineLight17Object',
		'headlineLight20',
		'headlineLight20Object',
		'headlineLight24',
		'headlineLight24Object',
		'headlineLight28',
		'headlineLight28Object',
		'headlineLight34',
		'headlineLight34Object',
		'headlineLight42',
		'headlineLight42Object',
		'headlineLight50',
		'headlineLight50Object',
		'headlineLight64',
		'headlineLight64Object',
		'headlineLightItalic14',
		'headlineLightItalic14Object',
		'headlineLightItalic15',
		'headlineLightItalic15Object',
		'headlineLightItalic17',
		'headlineLightItalic17Object',
		'headlineLightItalic20',
		'headlineLightItalic20Object',
		'headlineLightItalic24',
		'headlineLightItalic24Object',
		'headlineLightItalic28',
		'headlineLightItalic28Object',
		'headlineLightItalic34',
		'headlineLightItalic34Object',
		'headlineLightItalic42',
		'headlineLightItalic42Object',
		'headlineLightItalic50',
		'headlineLightItalic50Object',
		'headlineLightItalic64',
		'headlineLightItalic64Object',
		'headlineMedium14',
		'headlineMedium14Object',
		'headlineMedium15',
		'headlineMedium15Object',
		'headlineMedium17',
		'headlineMedium17Object',
		'headlineMedium20',
		'headlineMedium20Object',
		'headlineMedium24',
		'headlineMedium24Object',
		'headlineMedium28',
		'headlineMedium28Object',
		'headlineMedium34',
		'headlineMedium34Object',
		'headlineMedium42',
		'headlineMedium42Object',
		'headlineMedium50',
		'headlineMedium50Object',
		'headlineMedium64',
		'headlineMedium64Object',
		'headlineMediumItalic14',
		'headlineMediumItalic14Object',
		'headlineMediumItalic15',
		'headlineMediumItalic15Object',
		'headlineMediumItalic17',
		'headlineMediumItalic17Object',
		'headlineMediumItalic20',
		'headlineMediumItalic20Object',
		'headlineMediumItalic24',
		'headlineMediumItalic24Object',
		'headlineMediumItalic28',
		'headlineMediumItalic28Object',
		'headlineMediumItalic34',
		'headlineMediumItalic34Object',
		'headlineMediumItalic42',
		'headlineMediumItalic42Object',
		'headlineMediumItalic50',
		'headlineMediumItalic50Object',
		'headlineMediumItalic64',
		'headlineMediumItalic64Object',
		'headlineObjectStyles',
		'headlineSizes',
		'height',
		'iconSize',
		'labs',
		'lifestyle',
		'line',
		'lineHeights',
		'neutral',
		'news',
		'opinion',
		'palette',
		'pxToRem',
		'remBodySizes',
		'remHeadlineSizes',
		'remHeight',
		'remSpace',
		'remTextSansSizes',
		'remTitlepieceSizes',
		'remWidth',
		'resets',
		'rootPixelFontSize',
		'size',
		'space',
		'specialReport',
		'sport',
		'success',
		'svgBackgroundImage',
		'text',
		'textEgyptian14',
		'textEgyptian14Object',
		'textEgyptian15',
		'textEgyptian15Object',
		'textEgyptian17',
		'textEgyptian17Object',
		'textEgyptianBold14',
		'textEgyptianBold14Object',
		'textEgyptianBold15',
		'textEgyptianBold15Object',
		'textEgyptianBold17',
		'textEgyptianBold17Object',
		'textEgyptianBoldItalic14',
		'textEgyptianBoldItalic14Object',
		'textEgyptianBoldItalic15',
		'textEgyptianBoldItalic15Object',
		'textEgyptianBoldItalic17',
		'textEgyptianBoldItalic17Object',
		'textEgyptianItalic14',
		'textEgyptianItalic14Object',
		'textEgyptianItalic15',
		'textEgyptianItalic15Object',
		'textEgyptianItalic17',
		'textEgyptianItalic17Object',
		'textSans',
		'textSans12',
		'textSans12Object',
		'textSans14',
		'textSans14Object',
		'textSans15',
		'textSans15Object',
		'textSans17',
		'textSans17Object',
		'textSans20',
		'textSans20Object',
		'textSans24',
		'textSans24Object',
		'textSans28',
		'textSans28Object',
		'textSans34',
		'textSans34Object',
		'textSansBold12',
		'textSansBold12Object',
		'textSansBold14',
		'textSansBold14Object',
		'textSansBold15',
		'textSansBold15Object',
		'textSansBold17',
		'textSansBold17Object',
		'textSansBold20',
		'textSansBold20Object',
		'textSansBold24',
		'textSansBold24Object',
		'textSansBold28',
		'textSansBold28Object',
		'textSansBold34',
		'textSansBold34Object',
		'textSansItalic12',
		'textSansItalic12Object',
		'textSansItalic14',
		'textSansItalic14Object',
		'textSansItalic15',
		'textSansItalic15Object',
		'textSansItalic17',
		'textSansItalic17Object',
		'textSansItalic20',
		'textSansItalic20Object',
		'textSansItalic24',
		'textSansItalic24Object',
		'textSansItalic28',
		'textSansItalic28Object',
		'textSansItalic34',
		'textSansItalic34Object',
		'textSansObjectStyles',
		'textSansSizes',
		'titlepiece',
		'titlepiece42',
		'titlepiece42Object',
		'titlepiece50',
		'titlepiece50Object',
		'titlepiece70',
		'titlepiece70Object',
		'titlepieceObjectStyles',
		'titlepieceSizes',
		'transitions',
		'until',
		'visuallyHidden',
		'width',
	]);
});
