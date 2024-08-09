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
	text,
} from './__deprecated__/colour/palette';
import {
	body,
	headline,
	textSans,
	titlepiece,
} from './__deprecated__/typography';
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
} from './__deprecated__/typography/data';
import * as typePreset from './__generated__/typography';
import { transitions } from './animation/transitions';
import { breakpoints } from './breakpoints/breakpoints';
import { palette } from './colour/palette';
import {
	height,
	iconSize,
	remHeight,
	remWidth,
	size,
	width,
} from './size/size';
import { remSpace, space } from './space/space';
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
				'350': '#866D50',
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
				'38': '#545454',
				'46': '#707070',
				'60': '#999999',
				'7': '#121212',
				'73': '#BABABA',
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
				'300': '#C74600',
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
				'300': '#185E36',
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

describe('Typography preset CSS output', () => {
	it('should match expected output', () => {
		expect(typePreset.article15).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 0.9375rem;
			line-height: 1.4;
			font-weight: 400;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.article17).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 1.0625rem;
			line-height: 1.4;
			font-weight: 400;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.articleBold15).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 0.9375rem;
			line-height: 1.4;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.articleBold17).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 1.0625rem;
			line-height: 1.4;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.articleBoldItalic15).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 0.9375rem;
			line-height: 1.4;
			font-weight: 700;
			font-style: italic;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.articleBoldItalic17).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 1.0625rem;
			line-height: 1.4;
			font-weight: 700;
			font-style: italic;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.articleItalic15).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 0.9375rem;
			line-height: 1.4;
			font-weight: 400;
			font-style: italic;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.articleItalic17).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 1.0625rem;
			line-height: 1.4;
			font-weight: 400;
			font-style: italic;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineBold14).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 0.875rem;
			line-height: 1.15;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineBold15).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 0.9375rem;
			line-height: 1.15;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineBold17).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.0625rem;
			line-height: 1.15;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineBold20).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.25rem;
			line-height: 1.15;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineBold24).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.5rem;
			line-height: 1.15;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineBold28).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.75rem;
			line-height: 1.15;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineBold34).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 2.125rem;
			line-height: 1.15;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 4px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineBold42).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 2.625rem;
			line-height: 1.15;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 5px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineBold50).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 3.125rem;
			line-height: 1.15;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 6px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineBold64).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 4rem;
			line-height: 1.15;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 6px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineLight14).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 0.875rem;
			line-height: 1.15;
			font-weight: 300;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineLight15).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 0.9375rem;
			line-height: 1.15;
			font-weight: 300;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineLight17).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.0625rem;
			line-height: 1.15;
			font-weight: 300;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineLight20).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.25rem;
			line-height: 1.15;
			font-weight: 300;
			font-style: normal;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineLight24).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.5rem;
			line-height: 1.15;
			font-weight: 300;
			font-style: normal;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineLight28).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.75rem;
			line-height: 1.15;
			font-weight: 300;
			font-style: normal;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineLight34).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 2.125rem;
			line-height: 1.15;
			font-weight: 300;
			font-style: normal;
			--source-text-decoration-thickness: 4px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineLight42).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 2.625rem;
			line-height: 1.15;
			font-weight: 300;
			font-style: normal;
			--source-text-decoration-thickness: 5px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineLight50).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 3.125rem;
			line-height: 1.15;
			font-weight: 300;
			font-style: normal;
			--source-text-decoration-thickness: 6px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineLight64).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 4rem;
			line-height: 1.15;
			font-weight: 300;
			font-style: normal;
			--source-text-decoration-thickness: 6px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineLightItalic14).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 0.875rem;
			line-height: 1.15;
			font-weight: 300;
			font-style: italic;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineLightItalic15).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 0.9375rem;
			line-height: 1.15;
			font-weight: 300;
			font-style: italic;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineLightItalic17).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.0625rem;
			line-height: 1.15;
			font-weight: 300;
			font-style: italic;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineLightItalic20).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.25rem;
			line-height: 1.15;
			font-weight: 300;
			font-style: italic;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineLightItalic24).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.5rem;
			line-height: 1.15;
			font-weight: 300;
			font-style: italic;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineLightItalic28).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.75rem;
			line-height: 1.15;
			font-weight: 300;
			font-style: italic;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineLightItalic34).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 2.125rem;
			line-height: 1.15;
			font-weight: 300;
			font-style: italic;
			--source-text-decoration-thickness: 4px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineLightItalic42).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 2.625rem;
			line-height: 1.15;
			font-weight: 300;
			font-style: italic;
			--source-text-decoration-thickness: 5px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineLightItalic50).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 3.125rem;
			line-height: 1.15;
			font-weight: 300;
			font-style: italic;
			--source-text-decoration-thickness: 6px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineLightItalic64).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 4rem;
			line-height: 1.15;
			font-weight: 300;
			font-style: italic;
			--source-text-decoration-thickness: 6px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineMedium14).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 0.875rem;
			line-height: 1.15;
			font-weight: 500;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineMedium15).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 0.9375rem;
			line-height: 1.15;
			font-weight: 500;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineMedium17).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.0625rem;
			line-height: 1.15;
			font-weight: 500;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineMedium20).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.25rem;
			line-height: 1.15;
			font-weight: 500;
			font-style: normal;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineMedium24).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.5rem;
			line-height: 1.15;
			font-weight: 500;
			font-style: normal;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineMedium28).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.75rem;
			line-height: 1.15;
			font-weight: 500;
			font-style: normal;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineMedium34).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 2.125rem;
			line-height: 1.15;
			font-weight: 500;
			font-style: normal;
			--source-text-decoration-thickness: 4px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineMedium42).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 2.625rem;
			line-height: 1.15;
			font-weight: 500;
			font-style: normal;
			--source-text-decoration-thickness: 5px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineMedium50).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 3.125rem;
			line-height: 1.15;
			font-weight: 500;
			font-style: normal;
			--source-text-decoration-thickness: 6px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineMedium64).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 4rem;
			line-height: 1.15;
			font-weight: 500;
			font-style: normal;
			--source-text-decoration-thickness: 6px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineMediumItalic14).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 0.875rem;
			line-height: 1.15;
			font-weight: 500;
			font-style: italic;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineMediumItalic15).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 0.9375rem;
			line-height: 1.15;
			font-weight: 500;
			font-style: italic;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineMediumItalic17).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.0625rem;
			line-height: 1.15;
			font-weight: 500;
			font-style: italic;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineMediumItalic20).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.25rem;
			line-height: 1.15;
			font-weight: 500;
			font-style: italic;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineMediumItalic24).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.5rem;
			line-height: 1.15;
			font-weight: 500;
			font-style: italic;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineMediumItalic28).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 1.75rem;
			line-height: 1.15;
			font-weight: 500;
			font-style: italic;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineMediumItalic34).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 2.125rem;
			line-height: 1.15;
			font-weight: 500;
			font-style: italic;
			--source-text-decoration-thickness: 4px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineMediumItalic42).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 2.625rem;
			line-height: 1.15;
			font-weight: 500;
			font-style: italic;
			--source-text-decoration-thickness: 5px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineMediumItalic50).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 3.125rem;
			line-height: 1.15;
			font-weight: 500;
			font-style: italic;
			--source-text-decoration-thickness: 6px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.headlineMediumItalic64).toMatchCSS(
			`
			font-family: "GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif;
			font-size: 4rem;
			line-height: 1.15;
			font-weight: 500;
			font-style: italic;
			--source-text-decoration-thickness: 6px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textEgyptian14).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 0.875rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textEgyptian15).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 0.9375rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textEgyptian17).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 1.0625rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textEgyptianBold14).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 0.875rem;
			line-height: 1.3;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textEgyptianBold15).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 0.9375rem;
			line-height: 1.3;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textEgyptianBold17).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 1.0625rem;
			line-height: 1.3;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textEgyptianBoldItalic14).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 0.875rem;
			line-height: 1.3;
			font-weight: 700;
			font-style: italic;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textEgyptianBoldItalic15).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 0.9375rem;
			line-height: 1.3;
			font-weight: 700;
			font-style: italic;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textEgyptianBoldItalic17).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 1.0625rem;
			line-height: 1.3;
			font-weight: 700;
			font-style: italic;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textEgyptianItalic14).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 0.875rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: italic;
			--source-text-decoration-thickness: 2px;
		`,
			{ isFragment: true },
		);
		expect(typePreset.textEgyptianItalic15).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 0.9375rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: italic;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textEgyptianItalic17).toMatchCSS(
			`
			font-family: GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif;
			font-size: 1.0625rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: italic;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSans12).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 0.75rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSans14).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 0.875rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSans15).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 0.9375rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSans17).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 1.0625rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSans20).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 1.25rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: normal;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSans24).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 1.5rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: normal;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSans28).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 1.75rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: normal;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSans34).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 2.125rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: normal;
			--source-text-decoration-thickness: 4px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSansBold12).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 0.75rem;
			line-height: 1.3;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSansBold14).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 0.875rem;
			line-height: 1.3;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSansBold15).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 0.9375rem;
			line-height: 1.3;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSansBold17).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 1.0625rem;
			line-height: 1.3;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSansBold20).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 1.25rem;
			line-height: 1.3;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSansBold24).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 1.5rem;
			line-height: 1.3;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSansBold28).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 1.75rem;
			line-height: 1.3;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSansBold34).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 2.125rem;
			line-height: 1.3;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 4px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSansItalic12).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 0.75rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: italic;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSansItalic14).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 0.875rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: italic;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSansItalic15).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 0.9375rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: italic;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSansItalic17).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 1.0625rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: italic;
			--source-text-decoration-thickness: 2px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSansItalic20).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 1.25rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: italic;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSansItalic24).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 1.5rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: italic;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSansItalic28).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 1.75rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: italic;
			--source-text-decoration-thickness: 3px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.textSansItalic34).toMatchCSS(
			`
			font-family: GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
			font-size: 2.125rem;
			line-height: 1.3;
			font-weight: 400;
			font-style: italic;
			--source-text-decoration-thickness: 4px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.titlepiece42).toMatchCSS(
			`
			font-family: "GT Guardian Titlepiece", Georgia, serif;
			font-size: 2.625rem;
			line-height: 1.15;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 5px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.titlepiece50).toMatchCSS(
			`
			font-family: "GT Guardian Titlepiece", Georgia, serif;
			font-size: 3.125rem;
			line-height: 1.15;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 6px;
			`,
			{ isFragment: true },
		);
		expect(typePreset.titlepiece70).toMatchCSS(
			`
			font-family: "GT Guardian Titlepiece", Georgia, serif;
			font-size: 4.375rem;
			line-height: 1.15;
			font-weight: 700;
			font-style: normal;
			--source-text-decoration-thickness: 6px;
			`,
			{ isFragment: true },
		);
	});
});

describe('Typography preset object output', () => {
	it('should match expected output', () => {
		expect(typePreset.headlineBold14Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '0.875rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineBold15Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '0.9375rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineBold17Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.0625rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineBold20Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.25rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineBold24Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.5rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineBold28Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.75rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineBold34Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.125rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineBold42Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.625rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineBold50Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '3.125rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineBold64Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '4rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineLight14Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '0.875rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineLight15Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '0.9375rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineLight17Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.0625rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineLight20Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.25rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineLight24Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.5rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineLight28Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.75rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineLight34Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.125rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineLight42Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.625rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineLight50Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '3.125rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineLight64Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '4rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineLightItalic14Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '0.875rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'italic',
		});
		expect(typePreset.headlineLightItalic15Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '0.9375rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'italic',
		});
		expect(typePreset.headlineLightItalic17Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.0625rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'italic',
		});
		expect(typePreset.headlineLightItalic20Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.25rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'italic',
		});
		expect(typePreset.headlineLightItalic24Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.5rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'italic',
		});
		expect(typePreset.headlineLightItalic28Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.75rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'italic',
		});
		expect(typePreset.headlineLightItalic34Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.125rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'italic',
		});
		expect(typePreset.headlineLightItalic42Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.625rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'italic',
		});
		expect(typePreset.headlineLightItalic50Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '3.125rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'italic',
		});
		expect(typePreset.headlineLightItalic64Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '4rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'italic',
		});
		expect(typePreset.headlineMedium14Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '0.875rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineMedium15Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '0.9375rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineMedium17Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.0625rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineMedium20Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.25rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineMedium24Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.5rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineMedium28Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.75rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineMedium34Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.125rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineMedium42Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.625rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineMedium50Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '3.125rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineMedium64Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '4rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'normal',
		});
		expect(typePreset.headlineMediumItalic14Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '0.875rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'italic',
		});
		expect(typePreset.headlineMediumItalic15Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '0.9375rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'italic',
		});
		expect(typePreset.headlineMediumItalic17Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.0625rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'italic',
		});
		expect(typePreset.headlineMediumItalic20Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.25rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'italic',
		});
		expect(typePreset.headlineMediumItalic24Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.5rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'italic',
		});
		expect(typePreset.headlineMediumItalic28Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.75rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'italic',
		});
		expect(typePreset.headlineMediumItalic34Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.125rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'italic',
		});
		expect(typePreset.headlineMediumItalic42Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.625rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'italic',
		});
		expect(typePreset.headlineMediumItalic50Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '3.125rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'italic',
		});
		expect(typePreset.headlineMediumItalic64Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '4rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'italic',
		});
		expect(typePreset.textEgyptian14Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '0.875rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePreset.textEgyptian15Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '0.9375rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePreset.textEgyptian17Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '1.0625rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePreset.textEgyptianBold14Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '0.875rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.textEgyptianBold15Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '0.9375rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.textEgyptianBold17Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '1.0625rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.textEgyptianBoldItalic14Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '0.875rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'italic',
		});
		expect(typePreset.textEgyptianBoldItalic15Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '0.9375rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'italic',
		});
		expect(typePreset.textEgyptianBoldItalic17Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '1.0625rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'italic',
		});
		expect(typePreset.textEgyptianItalic14Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '0.875rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePreset.textEgyptianItalic15Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '0.9375rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePreset.textEgyptianItalic17Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '1.0625rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePreset.textSans12Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '0.75rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePreset.textSans14Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '0.875rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePreset.textSans15Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '0.9375rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePreset.textSans17Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.0625rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePreset.textSans20Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.25rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePreset.textSans24Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.5rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePreset.textSans28Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.75rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePreset.textSans34Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '2.125rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePreset.textSansBold12Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '0.75rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.textSansBold14Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '0.875rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.textSansBold15Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '0.9375rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.textSansBold17Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.0625rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.textSansBold20Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.25rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.textSansBold24Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.5rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.textSansBold28Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.75rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.textSansBold34Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '2.125rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.textSansItalic12Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '0.75rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePreset.textSansItalic14Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '0.875rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePreset.textSansItalic15Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '0.9375rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePreset.textSansItalic17Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.0625rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePreset.textSansItalic20Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.25rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePreset.textSansItalic24Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.5rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePreset.textSansItalic28Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.75rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePreset.textSansItalic34Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '2.125rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePreset.titlepiece42Object).toEqual({
			fontFamily: '"GT Guardian Titlepiece", Georgia, serif',
			fontSize: '2.625rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.titlepiece50Object).toEqual({
			fontFamily: '"GT Guardian Titlepiece", Georgia, serif',
			fontSize: '3.125rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePreset.titlepiece70Object).toEqual({
			fontFamily: '"GT Guardian Titlepiece", Georgia, serif',
			fontSize: '4.375rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
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
