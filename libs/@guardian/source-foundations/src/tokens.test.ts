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

describe('Transition tokens', () => {
	it('should match expected output', () => {
		expect(transitions).toEqual({
			long: '.65s ease-in-out',
			medium: '.3s ease-in-out',
			short: '.2s cubic-bezier(.64, .57, .67, 1.53)',
		});
	});
});

describe('Breakpoint tokens', () => {
	it('should match expected output', () => {
		expect(breakpoints).toEqual({
			desktop: 980,
			leftCol: 1140,
			mobile: 320,
			mobileLandscape: 480,
			mobileMedium: 375,
			phablet: 660,
			tablet: 740,
			wide: 1300,
		});
	});
});

describe('Palette tokens', () => {
	it('should match expected output', () => {
		expect(palette).toEqual({
			brand: {
				'100': '#001536',
				'300': '#041F4A',
				'400': '#052962',
				'500': '#0077B6',
				'600': '#506991',
				'800': '#C1D8FC',
			},
			brandAlt: {
				'200': '#F3C100',
				'300': '#FFD900',
				'400': '#FFE500',
			},
			culture: {
				'100': '#3E3323',
				'200': '#574835',
				'300': '#6B5840',
				'400': '#866D50',
				'450': '#A1845C',
				'50': '#2B2625',
				'500': '#EACCA0',
				'600': '#E7D4B9',
				'700': '#EFE8DD',
				'800': '#FBF6EF',
			},
			error: {
				'400': '#C70000',
				'500': '#FF9081',
			},
			focus: {
				'400': '#0077B6',
			},
			labs: {
				'200': '#0C7A73',
				'300': '#65A897',
				'400': '#69D1CA',
			},
			lifestyle: {
				'100': '#510043',
				'200': '#650054',
				'300': '#7D0068',
				'400': '#BB3B80',
				'450': '#F37ABC',
				'500': '#FFABDB',
				'600': '#FEC8D3',
				'800': '#FEEEF7',
			},
			neutral: {
				'0': '#000000',
				'10': '#1A1A1A',
				'100': '#FFFFFF',
				'20': '#333333',
				'38': '#606060',
				'46': '#707070',
				'60': '#999999',
				'7': '#121212',
				'86': '#DCDCDC',
				'93': '#EDEDED',
				'97': '#F6F6F6',
			},
			news: {
				'100': '#660505',
				'200': '#8B0000',
				'300': '#AB0613',
				'400': '#C70000',
				'500': '#FF5943',
				'550': '#FF9081',
				'600': '#FFBAC8',
				'800': '#FFF4F2',
			},
			opinion: {
				'100': '#672005',
				'200': '#8D2700',
				'400': '#C74600',
				'450': '#E05E00',
				'500': '#FF7F0F',
				'550': '#FF9941',
				'600': '#F9B376',
				'800': '#FEF9F5',
			},
			specialReport: {
				'100': '#222527',
				'200': '#303538',
				'300': '#3F464A',
				'400': '#595C5F',
				'450': '#9DA0A2',
				'500': '#ABC2C9',
				'700': '#E4E5E8',
				'800': '#EFF1F2',
			},
			specialReportAlt: {
				'100': '#2B2B2A',
				'200': '#B9300A',
				'300': '#FF663D',
				'700': '#EBE6E1',
				'800': '#F5F0EB',
			},
			sport: {
				'100': '#003C60',
				'200': '#004E7C',
				'300': '#005689',
				'400': '#0077B6',
				'500': '#00B2FF',
				'600': '#90DCFF',
				'800': '#F1F8FC',
			},
			success: {
				'400': '#22874D',
				'500': '#58D08B',
			},
		});
	});
});

describe('Size tokens', () => {
	it('should match expected output', () => {
		expect(size).toEqual({
			xsmall: 24,
			small: 36,
			medium: 44,
		});
		expect(iconSize).toEqual({
			xsmall: 20,
			small: 26,
			medium: 30,
		});
		expect(height).toEqual({
			ctaXsmall: 24,
			ctaSmall: 36,
			ctaMedium: 44,
			iconXsmall: 20,
			iconSmall: 26,
			iconMedium: 30,
			inputXsmall: 24,
			inputMedium: 44,
		});
		expect(remHeight).toEqual({
			ctaXsmall: 1.5,
			ctaSmall: 2.25,
			ctaMedium: 2.75,
			iconXsmall: 1.25,
			iconSmall: 1.625,
			iconMedium: 1.875,
			inputXsmall: 1.5,
			inputMedium: 2.75,
		});
		expect(width).toEqual({
			ctaXsmall: 24,
			ctaSmall: 36,
			ctaMedium: 44,
			iconXsmall: 20,
			iconSmall: 26,
			iconMedium: 30,
			inputXsmall: 24,
		});
		expect(remWidth).toEqual({
			ctaXsmall: 1.5,
			ctaSmall: 2.25,
			ctaMedium: 2.75,
			iconXsmall: 1.25,
			iconSmall: 1.625,
			iconMedium: 1.875,
			inputXsmall: 1.5,
		});
	});
});

describe('Space tokens', () => {
	it('should match expected output', () => {
		expect(space).toEqual({
			'0': 2,
			'1': 4,
			'2': 8,
			'3': 12,
			'4': 16,
			'5': 20,
			'6': 24,
			'8': 32,
			'9': 36,
			'10': 40,
			'12': 48,
			'14': 56,
			'16': 64,
			'18': 72,
			'24': 96,
		});
		expect(remSpace).toEqual({
			'0': '0.125rem',
			'1': '0.25rem',
			'2': '0.5rem',
			'3': '0.75rem',
			'4': '1rem',
			'5': '1.25rem',
			'6': '1.5rem',
			'8': '2rem',
			'9': '2.25rem',
			'10': '2.5rem',
			'12': '3rem',
			'14': '3.5rem',
			'16': '4rem',
			'18': '4.5rem',
			'24': '6rem',
		});
	});
});

describe('Typography tokens', () => {
	it('should match expected output', () => {
		expect(pxTextSizes).toEqual({
			body: {
				xsmall: 14,
				small: 15,
				medium: 17,
			},
			headline: {
				xxxsmall: 17,
				xxsmall: 20,
				xsmall: 24,
				small: 28,
				medium: 34,
				large: 42,
				xlarge: 50,
			},
			textSans: {
				xxsmall: 12,
				xsmall: 14,
				small: 15,
				medium: 17,
				large: 20,
				xlarge: 24,
				xxlarge: 28,
				xxxlarge: 34,
			},
			titlepiece: {
				small: 42,
				medium: 50,
				large: 70,
			},
		});
		expect(remTextSizes).toEqual({
			body: {
				xsmall: 0.875,
				small: 0.9375,
				medium: 1.0625,
			},
			headline: {
				xxxsmall: 1.0625,
				xxsmall: 1.25,
				xsmall: 1.5,
				small: 1.75,
				medium: 2.125,
				large: 2.625,
				xlarge: 3.125,
			},
			textSans: {
				xxsmall: 0.75,
				xsmall: 0.875,
				small: 0.9375,
				medium: 1.0625,
				large: 1.25,
				xlarge: 1.5,
				xxlarge: 1.75,
				xxxlarge: 2.125,
			},
			titlepiece: {
				small: 2.625,
				medium: 3.125,
				large: 4.375,
			},
		});
		expect(fonts).toEqual({
			body: 'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			headline:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			textSans:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			titlepiece: '"GT Guardian Titlepiece", Georgia, serif',
		});
		expect(lineHeights).toEqual({
			tight: 1.15,
			regular: 1.3,
			loose: 1.4,
		});
		expect(fontWeights).toEqual({
			light: 300,
			regular: 400,
			medium: 500,
			bold: 700,
		});
		expect(availableFontWeights).toEqual({
			body: {
				regular: true,
				bold: true,
			},
			headline: {
				light: true,
				medium: true,
				bold: true,
			},
			textSans: {
				regular: true,
				bold: true,
			},
			titlepiece: {
				bold: true,
			},
		});
		expect(italicsFontWeights).toEqual({
			body: {
				regular: true,
				bold: true,
			},
			headline: {
				light: true,
				medium: true,
				bold: false,
			},
			textSans: {
				regular: true,
				bold: false,
			},
			titlepiece: {
				bold: false,
			},
		});
		expect(underlineThickness).toEqual({
			body: {
				xsmall: 2,
				small: 2,
				medium: 2,
			},
			headline: {
				xxxsmall: 2,
				xxsmall: 3,
				xsmall: 3,
				small: 3,
				medium: 4,
				large: 5,
				xlarge: 6,
			},
			textSans: {
				xxsmall: 2,
				xsmall: 2,
				small: 2,
				medium: 2,
				large: 3,
				xlarge: 3,
				xxlarge: 3,
				xxxlarge: 4,
			},
			titlepiece: {
				small: 5,
				medium: 6,
				large: 6,
			},
		});
		expect(textSansSizes).toEqual({
			xxsmall: 12,
			xsmall: 14,
			small: 15,
			medium: 17,
			large: 20,
			xlarge: 24,
			xxlarge: 28,
			xxxlarge: 34,
		});
		expect(bodySizes).toEqual({
			xsmall: 14,
			small: 15,
			medium: 17,
		});
		expect(headlineSizes).toEqual({
			xxxsmall: 17,
			xxsmall: 20,
			xsmall: 24,
			small: 28,
			medium: 34,
			large: 42,
			xlarge: 50,
		});
		expect(titlepieceSizes).toEqual({
			small: 42,
			medium: 50,
			large: 70,
		});
		expect(remTextSansSizes).toEqual({
			xxsmall: 0.75,
			xsmall: 0.875,
			small: 0.9375,
			medium: 1.0625,
			large: 1.25,
			xlarge: 1.5,
			xxlarge: 1.75,
			xxxlarge: 2.125,
		});
		expect(remBodySizes).toEqual({
			xsmall: 0.875,
			small: 0.9375,
			medium: 1.0625,
		});
		expect(remHeadlineSizes).toEqual({
			xxxsmall: 1.0625,
			xxsmall: 1.25,
			xsmall: 1.5,
			small: 1.75,
			medium: 2.125,
			large: 2.625,
			xlarge: 3.125,
		});
		expect(remTitlepieceSizes).toEqual({
			small: 2.625,
			medium: 3.125,
			large: 4.375,
		});
	});
});

describe('Typography API CSS output', () => {
	it('should match expected output', () => {
		expect(textSans.xxsmall()).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 0.75rem;
			line-height: 1.3;
			font-weight: 400;
			--source-text-decoration-thickness: 2px;
		`,
			{ isFragment: true },
		);
		expect(textSans.xsmall()).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 0.875rem;
			line-height: 1.3;
			font-weight: 400;
			--source-text-decoration-thickness: 2px;
		`,
			{ isFragment: true },
		);
		expect(textSans.small()).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 0.9375rem;
			line-height: 1.3;
			font-weight: 400;
			--source-text-decoration-thickness: 2px;
		`,
			{ isFragment: true },
		);
		expect(textSans.medium()).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 1.0625rem;
			line-height: 1.3;
			font-weight: 400;
			--source-text-decoration-thickness: 2px;
		`,
			{ isFragment: true },
		);
		expect(textSans.large()).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 1.25rem;
			line-height: 1.3;
			font-weight: 400;
			--source-text-decoration-thickness: 3px;
		`,
			{ isFragment: true },
		);
		expect(textSans.xlarge()).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 1.5rem;
			line-height: 1.3;
			font-weight: 400;
			--source-text-decoration-thickness: 3px;
		`,
			{ isFragment: true },
		);
		expect(textSans.xxlarge()).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 1.75rem;
			line-height: 1.3;
			font-weight: 400;
			--source-text-decoration-thickness: 3px;
		`,
			{ isFragment: true },
		);
		expect(textSans.xxxlarge()).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 2.125rem;
			line-height: 1.3;
			font-weight: 400;
			--source-text-decoration-thickness: 4px;
		`,
			{ isFragment: true },
		);
		expect(body.xsmall()).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 0.875rem;
			line-height: 1.4;
			font-weight: 400;
			--source-text-decoration-thickness: 2px;
		`,
			{ isFragment: true },
		);
		expect(body.small()).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 0.9375rem;
			line-height: 1.4;
			font-weight: 400;
			--source-text-decoration-thickness: 2px;
		`,
			{ isFragment: true },
		);
		expect(body.medium()).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 1.0625rem;
			line-height: 1.4;
			font-weight: 400;
			--source-text-decoration-thickness: 2px;
		`,
			{ isFragment: true },
		);
		expect(headline.xxxsmall()).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.0625rem;
			line-height: 1.15;
			font-weight: 500;
			--source-text-decoration-thickness: 2px;
		`,
			{ isFragment: true },
		);
		expect(headline.xxsmall()).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.25rem;
			line-height: 1.15;
			font-weight: 500;
			--source-text-decoration-thickness: 3px;
		`,
			{ isFragment: true },
		);
		expect(headline.xsmall()).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.5rem;
			line-height: 1.15;
			font-weight: 500;
			--source-text-decoration-thickness: 3px;
		`,
			{ isFragment: true },
		);
		expect(headline.small()).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.75rem;
			line-height: 1.15;
			font-weight: 500;
			--source-text-decoration-thickness: 3px;
		`,
			{ isFragment: true },
		);
		expect(headline.medium()).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 2.125rem;
			line-height: 1.15;
			font-weight: 500;
			--source-text-decoration-thickness: 4px;
		`,
			{ isFragment: true },
		);
		expect(headline.large()).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 2.625rem;
			line-height: 1.15;
			font-weight: 500;
			--source-text-decoration-thickness: 5px;
		`,
			{ isFragment: true },
		);
		expect(headline.xlarge()).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 3.125rem;
			line-height: 1.15;
			font-weight: 500;
			--source-text-decoration-thickness: 6px;
		`,
			{ isFragment: true },
		);
		expect(titlepiece.small()).toMatchCSS(
			`
			font-family: "GT Guardian Titlepiece", Georgia, serif;
			font-size: 2.625rem;
			line-height: 1.15;
			font-weight: 700;
			--source-text-decoration-thickness: 5px;
		`,
			{ isFragment: true },
		);
		expect(titlepiece.medium()).toMatchCSS(
			`
			font-family: "GT Guardian Titlepiece", Georgia, serif;
			font-size: 3.125rem;
			line-height: 1.15;
			font-weight: 700;
			--source-text-decoration-thickness: 6px;
		`,
			{ isFragment: true },
		);
		expect(titlepiece.large()).toMatchCSS(
			`
			font-family: "GT Guardian Titlepiece", Georgia, serif;
			font-size: 4.375rem;
			line-height: 1.15;
			font-weight: 700;
			--source-text-decoration-thickness: 6px;
		`,
			{ isFragment: true },
		);
	});
});

describe('Typography API object style output', () => {
	it('should match expected output', () => {
		expect(textSansObjectStyles.xxsmall()).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '0.75rem',
			fontStyle: undefined,
			fontWeight: 400,
			lineHeight: 1.3,
			textDecorationThickness: 2,
		});
		expect(textSansObjectStyles.xsmall()).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '0.875rem',
			fontStyle: undefined,
			fontWeight: 400,
			lineHeight: 1.3,
			textDecorationThickness: 2,
		});
		expect(textSansObjectStyles.small()).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '0.9375rem',
			fontStyle: undefined,
			fontWeight: 400,
			lineHeight: 1.3,
			textDecorationThickness: 2,
		});
		expect(textSansObjectStyles.medium()).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.0625rem',
			fontStyle: undefined,
			fontWeight: 400,
			lineHeight: 1.3,
			textDecorationThickness: 2,
		});
		expect(textSansObjectStyles.large()).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.25rem',
			fontStyle: undefined,
			fontWeight: 400,
			lineHeight: 1.3,
			textDecorationThickness: 3,
		});
		expect(textSansObjectStyles.xlarge()).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.5rem',
			fontStyle: undefined,
			fontWeight: 400,
			lineHeight: 1.3,
			textDecorationThickness: 3,
		});
		expect(textSansObjectStyles.xxlarge()).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.75rem',
			fontStyle: undefined,
			fontWeight: 400,
			lineHeight: 1.3,
			textDecorationThickness: 3,
		});
		expect(textSansObjectStyles.xxxlarge()).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '2.125rem',
			fontStyle: undefined,
			fontWeight: 400,
			lineHeight: 1.3,
			textDecorationThickness: 4,
		});
		expect(bodyObjectStyles.xsmall()).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '0.875rem',
			fontStyle: undefined,
			fontWeight: 400,
			lineHeight: 1.4,
			textDecorationThickness: 2,
		});
		expect(bodyObjectStyles.small()).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '0.9375rem',
			fontStyle: undefined,
			fontWeight: 400,
			lineHeight: 1.4,
			textDecorationThickness: 2,
		});
		expect(bodyObjectStyles.medium()).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '1.0625rem',
			fontStyle: undefined,
			fontWeight: 400,
			lineHeight: 1.4,
			textDecorationThickness: 2,
		});
		expect(headlineObjectStyles.xxxsmall()).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.0625rem',
			fontStyle: undefined,
			fontWeight: 500,
			lineHeight: 1.15,
			textDecorationThickness: 2,
		});
		expect(headlineObjectStyles.xxsmall()).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.25rem',
			fontStyle: undefined,
			fontWeight: 500,
			lineHeight: 1.15,
			textDecorationThickness: 3,
		});
		expect(headlineObjectStyles.xsmall()).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.5rem',
			fontStyle: undefined,
			fontWeight: 500,
			lineHeight: 1.15,
			textDecorationThickness: 3,
		});
		expect(headlineObjectStyles.small()).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.75rem',
			fontStyle: undefined,
			fontWeight: 500,
			lineHeight: 1.15,
			textDecorationThickness: 3,
		});
		expect(headlineObjectStyles.medium()).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.125rem',
			fontStyle: undefined,
			fontWeight: 500,
			lineHeight: 1.15,
			textDecorationThickness: 4,
		});
		expect(headlineObjectStyles.large()).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.625rem',
			fontStyle: undefined,
			fontWeight: 500,
			lineHeight: 1.15,
			textDecorationThickness: 5,
		});
		expect(headlineObjectStyles.xlarge()).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '3.125rem',
			fontStyle: undefined,
			fontWeight: 500,
			lineHeight: 1.15,
			textDecorationThickness: 6,
		});
		expect(titlepieceObjectStyles.small()).toEqual({
			fontFamily: '"GT Guardian Titlepiece", Georgia, serif',
			fontSize: '2.625rem',
			fontStyle: undefined,
			fontWeight: 700,
			lineHeight: 1.15,
			textDecorationThickness: 5,
		});
		expect(titlepieceObjectStyles.medium()).toEqual({
			fontFamily: '"GT Guardian Titlepiece", Georgia, serif',
			fontSize: '3.125rem',
			fontStyle: undefined,
			fontWeight: 700,
			lineHeight: 1.15,
			textDecorationThickness: 6,
		});
		expect(titlepieceObjectStyles.large()).toEqual({
			fontFamily: '"GT Guardian Titlepiece", Georgia, serif',
			fontSize: '4.375rem',
			fontStyle: undefined,
			fontWeight: 700,
			lineHeight: 1.15,
			textDecorationThickness: 6,
		});
	});
});

/**
 * Deprecated tokens
 */

describe('Palette theme tokens (deprecated)', () => {
	it('should match expected output', () => {
		expect(background).toEqual({
			ctaPrimary: '#052962',
			ctaPrimaryHover: '#234B8A',
			ctaSecondary: '#C1D8FC',
			ctaSecondaryHover: '#ACC9F7',
			ctaTertiaryHover: '#E5E5E5',
			input: '#FFFFFF',
			inputChecked: '#0077B6',
			inverse: '#1A1A1A',
			primary: '#FFFFFF',
			secondary: '#F6F6F6',
		});
		expect(brandBackground).toEqual({
			ctaPrimary: '#FFFFFF',
			ctaPrimaryHover: '#E0E0E0',
			ctaSecondary: '#506991',
			ctaSecondaryHover: '#234B8A',
			ctaTertiaryHover: '#041F4A',
			inputChecked: '#FFFFFF',
			primary: '#052962',
		});
		expect(brandAltBackground).toEqual({
			ctaPrimary: '#121212',
			ctaPrimaryHover: '#454545',
			ctaSecondary: '#F3C100',
			ctaSecondaryHover: '#F2AE00',
			ctaTertiaryHover: '#FFD213',
			primary: '#FFE500',
		});
		expect(border).toEqual({
			ctaTertiary: '#052962',
			error: '#C70000',
			focusHalo: '#0077B6',
			input: '#999999',
			inputActive: '#0077B6',
			inputChecked: '#0077B6',
			inputHover: '#0077B6',
			primary: '#999999',
			secondary: '#DCDCDC',
			success: '#22874D',
		});
		expect(brandBorder).toEqual({
			ctaTertiary: '#FFFFFF',
			error: '#FF9081',
			input: '#C1D8FC',
			inputChecked: '#FFFFFF',
			inputHover: '#FFFFFF',
			primary: '#506991',
			secondary: '#506991',
			success: '#58D08B',
		});
		expect(brandAltBorder).toEqual({
			ctaTertiary: '#121212',
		});
		expect(line).toEqual({
			primary: '#DCDCDC',
		});
		expect(brandLine).toEqual({
			primary: '#506991',
		});
		expect(brandAltLine).toEqual({
			primary: '#121212',
		});
		expect(text).toEqual({
			anchorPrimary: '#0077B6',
			anchorSecondary: '#121212',
			ctaPrimary: '#FFFFFF',
			ctaSecondary: '#052962',
			ctaTertiary: '#052962',
			error: '#C70000',
			groupLabel: '#121212',
			groupLabelSupporting: '#707070',
			inputChecked: '#052962',
			inputError: '#121212',
			inputHover: '#052962',
			inputLabel: '#121212',
			inputLabelSupporting: '#707070',
			newsInverse: '#FF9081',
			primary: '#121212',
			success: '#22874D',
			supporting: '#707070',
			userInput: '#121212',
		});
		expect(brandText).toEqual({
			anchorPrimary: '#FFFFFF',
			anchorPrimaryHover: '#FFE500',
			ctaPrimary: '#052962',
			ctaSecondary: '#FFFFFF',
			ctaTertiary: '#FFFFFF',
			error: '#FF9081',
			inputLabel: '#FFFFFF',
			inputLabelSupporting: '#C1D8FC',
			primary: '#FFFFFF',
			success: '#58D08B',
			supporting: '#C1D8FC',
			userInput: '#FFFFFF',
		});
		expect(brandAltText).toEqual({
			anchorPrimary: '#121212',
			ctaPrimary: '#FFFFFF',
			ctaSecondary: '#121212',
			ctaTertiary: '#121212',
			primary: '#121212',
			supporting: '#999999',
		});
	});
});
