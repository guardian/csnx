import type {
	bodySizes,
	fontWeights,
	headlineSizes,
	lineHeights,
	remBodySizes,
	remHeadlineSizes,
	remTextSansSizes,
	remTitlepieceSizes,
	textSansSizes,
	titlepieceSizes,
} from './data';

/** @deprecated This type will be removed in a future major release */
export type ScaleUnit = 'rem' | 'px';
/** @deprecated This type will be removed in a future major release */
export type LineHeight = keyof typeof lineHeights;
/** @deprecated This type will be removed in a future major release */
export type FontWeight = 'light' | 'regular' | 'medium' | 'bold';
/** @deprecated This type will be removed in a future major release */
export type FontStyle = 'normal' | 'italic';
/** @deprecated This type will be removed in a future major release */
export type FontWeightDefinition = { hasItalic: boolean };
/** @deprecated This type will be removed in a future major release */
export type Option<A> = A | null;

/** @deprecated This type will be removed in a future major release */
export type TypographyStyles<Unit extends ScaleUnit = ScaleUnit> = {
	fontFamily: string;
	fontSize: Unit extends 'px' ? number : `${number}rem`;
	lineHeight: string | number;
	fontWeight?: (typeof fontWeights)[keyof typeof fontWeights] | FontWeight;
	fontStyle?: 'normal' | 'italic';
	textDecorationThickness?: number;
};

/** @deprecated This type will be removed in a future major release */
export type TitlepieceSizes =
	| typeof titlepieceSizes
	| typeof remTitlepieceSizes;
/** @deprecated This type will be removed in a future major release */
export type HeadlineSizes = typeof headlineSizes | typeof remHeadlineSizes;
/** @deprecated This type will be removed in a future major release */
export type BodySizes = typeof bodySizes | typeof remBodySizes;
/** @deprecated This type will be removed in a future major release */
export type TextSansSizes = typeof textSansSizes | typeof remTextSansSizes;
/** @deprecated This type will be removed in a future major release */
export type AvailableSizes =
	| TitlepieceSizes
	| HeadlineSizes
	| BodySizes
	| TextSansSizes;

/** @deprecated This type will be removed in a future major release */
export type Categories = {
	titlepiece: TitlepieceSizes;
	headline: HeadlineSizes;
	body: BodySizes;
	textSans: TextSansSizes;
};

/** @deprecated This type will be removed in a future major release */
export type Category = keyof Categories;

/** @deprecated This type will be removed in a future major release */
export type AvailableFontWeights = {
	[cat in Category]?: { [weight in FontWeight]?: boolean };
};

/** @deprecated This type will be removed in a future major release */
export type ItalicsFontWeights = {
	[cat in Category]?: { [weight in FontWeight]?: boolean };
};

/** @deprecated This type will be removed in a future major release */
export type TypographyConfiguration = {
	lineHeight: LineHeight;
	fontWeight: FontWeight;
	fontStyle: Option<FontStyle>;
	unit: ScaleUnit;
};

/** @deprecated This type will be removed in a future major release */
export type FontScaleArgs = Partial<
	Pick<TypographyConfiguration, 'fontWeight' | 'lineHeight' | 'unit'>
> & {
	fontStyle?: FontStyle;
};

/** @deprecated This type will be removed in a future major release */
export type FontScaleFunction = (options?: FontScaleArgs) => TypographyStyles;

// returns styles as a template literal
/** @deprecated This type will be removed in a future major release */
export type FontScaleFunctionStr = (options?: FontScaleArgs) => string;

/** @deprecated This type will be removed in a future major release */
export type TypographyStrFunctions<Sizes extends AvailableSizes> = {
	[key in keyof Sizes]: FontScaleFunctionStr;
};

/** @deprecated This type will be removed in a future major release */
export type TypographyFunctions<Sizes extends AvailableSizes> = {
	[key in keyof Sizes]: FontScaleFunction;
};

/**
 * This is left over from the refactor of the font style method.
 * It is exported from source/foundations but has now been replaced
 * by the fontStyleFunction method type definition.
 *
 * Before we remove it, we need to determine if it is being used.
 *
 * @deprecated This type will be removed in a future major release
 */
export type Fs = <
	Category extends keyof Categories,
	Level extends keyof Categories[Category],
>(
	category: Category,
) => (
	level: Level,
	{
		lineHeight,
		fontWeight,
		fontStyle,
		unit,
	}: {
		lineHeight: LineHeight;
		fontWeight: FontWeight;
		fontStyle: Option<FontStyle>;
		unit: ScaleUnit;
	},
) => TypographyStyles;

/** @deprecated This type will be removed in a future major release */
export type TypographySizes = {
	[key in string]: number;
};
