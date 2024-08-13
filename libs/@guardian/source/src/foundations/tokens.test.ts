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
import * as typePresetCss from './__generated__/typography/css';
import * as typePresetObject from './__generated__/typography/objects';
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
			ctaXsmall: '1.5rem',
			ctaSmall: '2.25rem',
			ctaMedium: '2.75rem',
			iconXsmall: '1.25rem',
			iconSmall: '1.625rem',
			iconMedium: '1.875rem',
			inputXsmall: '1.5rem',
			inputMedium: '2.75rem',
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
			ctaXsmall: '1.5rem',
			ctaSmall: '2.25rem',
			ctaMedium: '2.75rem',
			iconXsmall: '1.25rem',
			iconSmall: '1.625rem',
			iconMedium: '1.875rem',
			inputXsmall: '1.5rem',
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

describe('Typography preset CSS output', () => {
	it('should match expected output', () => {
		expect(typePresetCss.article15).toMatchCSS(
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
		expect(typePresetCss.article17).toMatchCSS(
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
		expect(typePresetCss.articleBold15).toMatchCSS(
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
		expect(typePresetCss.articleBold17).toMatchCSS(
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
		expect(typePresetCss.articleBoldItalic15).toMatchCSS(
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
		expect(typePresetCss.articleBoldItalic17).toMatchCSS(
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
		expect(typePresetCss.articleItalic15).toMatchCSS(
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
		expect(typePresetCss.articleItalic17).toMatchCSS(
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
		expect(typePresetCss.headlineBold14).toMatchCSS(
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
		expect(typePresetCss.headlineBold15).toMatchCSS(
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
		expect(typePresetCss.headlineBold17).toMatchCSS(
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
		expect(typePresetCss.headlineBold20).toMatchCSS(
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
		expect(typePresetCss.headlineBold24).toMatchCSS(
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
		expect(typePresetCss.headlineBold28).toMatchCSS(
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
		expect(typePresetCss.headlineBold34).toMatchCSS(
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
		expect(typePresetCss.headlineBold42).toMatchCSS(
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
		expect(typePresetCss.headlineBold50).toMatchCSS(
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
		expect(typePresetCss.headlineBold64).toMatchCSS(
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
		expect(typePresetCss.headlineLight14).toMatchCSS(
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
		expect(typePresetCss.headlineLight15).toMatchCSS(
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
		expect(typePresetCss.headlineLight17).toMatchCSS(
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
		expect(typePresetCss.headlineLight20).toMatchCSS(
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
		expect(typePresetCss.headlineLight24).toMatchCSS(
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
		expect(typePresetCss.headlineLight28).toMatchCSS(
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
		expect(typePresetCss.headlineLight34).toMatchCSS(
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
		expect(typePresetCss.headlineLight42).toMatchCSS(
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
		expect(typePresetCss.headlineLight50).toMatchCSS(
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
		expect(typePresetCss.headlineLight64).toMatchCSS(
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
		expect(typePresetCss.headlineLightItalic14).toMatchCSS(
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
		expect(typePresetCss.headlineLightItalic15).toMatchCSS(
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
		expect(typePresetCss.headlineLightItalic17).toMatchCSS(
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
		expect(typePresetCss.headlineLightItalic20).toMatchCSS(
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
		expect(typePresetCss.headlineLightItalic24).toMatchCSS(
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
		expect(typePresetCss.headlineLightItalic28).toMatchCSS(
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
		expect(typePresetCss.headlineLightItalic34).toMatchCSS(
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
		expect(typePresetCss.headlineLightItalic42).toMatchCSS(
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
		expect(typePresetCss.headlineLightItalic50).toMatchCSS(
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
		expect(typePresetCss.headlineLightItalic64).toMatchCSS(
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
		expect(typePresetCss.headlineMedium14).toMatchCSS(
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
		expect(typePresetCss.headlineMedium15).toMatchCSS(
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
		expect(typePresetCss.headlineMedium17).toMatchCSS(
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
		expect(typePresetCss.headlineMedium20).toMatchCSS(
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
		expect(typePresetCss.headlineMedium24).toMatchCSS(
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
		expect(typePresetCss.headlineMedium28).toMatchCSS(
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
		expect(typePresetCss.headlineMedium34).toMatchCSS(
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
		expect(typePresetCss.headlineMedium42).toMatchCSS(
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
		expect(typePresetCss.headlineMedium50).toMatchCSS(
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
		expect(typePresetCss.headlineMedium64).toMatchCSS(
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
		expect(typePresetCss.headlineMediumItalic14).toMatchCSS(
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
		expect(typePresetCss.headlineMediumItalic15).toMatchCSS(
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
		expect(typePresetCss.headlineMediumItalic17).toMatchCSS(
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
		expect(typePresetCss.headlineMediumItalic20).toMatchCSS(
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
		expect(typePresetCss.headlineMediumItalic24).toMatchCSS(
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
		expect(typePresetCss.headlineMediumItalic28).toMatchCSS(
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
		expect(typePresetCss.headlineMediumItalic34).toMatchCSS(
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
		expect(typePresetCss.headlineMediumItalic42).toMatchCSS(
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
		expect(typePresetCss.headlineMediumItalic50).toMatchCSS(
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
		expect(typePresetCss.headlineMediumItalic64).toMatchCSS(
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
		expect(typePresetCss.textEgyptian14).toMatchCSS(
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
		expect(typePresetCss.textEgyptian15).toMatchCSS(
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
		expect(typePresetCss.textEgyptian17).toMatchCSS(
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
		expect(typePresetCss.textEgyptianBold14).toMatchCSS(
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
		expect(typePresetCss.textEgyptianBold15).toMatchCSS(
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
		expect(typePresetCss.textEgyptianBold17).toMatchCSS(
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
		expect(typePresetCss.textEgyptianBoldItalic14).toMatchCSS(
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
		expect(typePresetCss.textEgyptianBoldItalic15).toMatchCSS(
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
		expect(typePresetCss.textEgyptianBoldItalic17).toMatchCSS(
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
		expect(typePresetCss.textEgyptianItalic14).toMatchCSS(
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
		expect(typePresetCss.textEgyptianItalic15).toMatchCSS(
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
		expect(typePresetCss.textEgyptianItalic17).toMatchCSS(
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
		expect(typePresetCss.textSans12).toMatchCSS(
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
		expect(typePresetCss.textSans14).toMatchCSS(
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
		expect(typePresetCss.textSans15).toMatchCSS(
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
		expect(typePresetCss.textSans17).toMatchCSS(
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
		expect(typePresetCss.textSans20).toMatchCSS(
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
		expect(typePresetCss.textSans24).toMatchCSS(
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
		expect(typePresetCss.textSans28).toMatchCSS(
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
		expect(typePresetCss.textSans34).toMatchCSS(
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
		expect(typePresetCss.textSansBold12).toMatchCSS(
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
		expect(typePresetCss.textSansBold14).toMatchCSS(
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
		expect(typePresetCss.textSansBold15).toMatchCSS(
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
		expect(typePresetCss.textSansBold17).toMatchCSS(
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
		expect(typePresetCss.textSansBold20).toMatchCSS(
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
		expect(typePresetCss.textSansBold24).toMatchCSS(
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
		expect(typePresetCss.textSansBold28).toMatchCSS(
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
		expect(typePresetCss.textSansBold34).toMatchCSS(
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
		expect(typePresetCss.textSansItalic12).toMatchCSS(
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
		expect(typePresetCss.textSansItalic14).toMatchCSS(
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
		expect(typePresetCss.textSansItalic15).toMatchCSS(
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
		expect(typePresetCss.textSansItalic17).toMatchCSS(
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
		expect(typePresetCss.textSansItalic20).toMatchCSS(
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
		expect(typePresetCss.textSansItalic24).toMatchCSS(
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
		expect(typePresetCss.textSansItalic28).toMatchCSS(
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
		expect(typePresetCss.textSansItalic34).toMatchCSS(
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
		expect(typePresetCss.titlepiece42).toMatchCSS(
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
		expect(typePresetCss.titlepiece50).toMatchCSS(
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
		expect(typePresetCss.titlepiece70).toMatchCSS(
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
		expect(typePresetObject.headlineBold14Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '0.875rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineBold15Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '0.9375rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineBold17Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.0625rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineBold20Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.25rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineBold24Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.5rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineBold28Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.75rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineBold34Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.125rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineBold42Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.625rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineBold50Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '3.125rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineBold64Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '4rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineLight14Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '0.875rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineLight15Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '0.9375rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineLight17Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.0625rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineLight20Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.25rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineLight24Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.5rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineLight28Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.75rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineLight34Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.125rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineLight42Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.625rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineLight50Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '3.125rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineLight64Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '4rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineLightItalic14Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '0.875rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'italic',
		});
		expect(typePresetObject.headlineLightItalic15Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '0.9375rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'italic',
		});
		expect(typePresetObject.headlineLightItalic17Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.0625rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'italic',
		});
		expect(typePresetObject.headlineLightItalic20Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.25rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'italic',
		});
		expect(typePresetObject.headlineLightItalic24Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.5rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'italic',
		});
		expect(typePresetObject.headlineLightItalic28Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.75rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'italic',
		});
		expect(typePresetObject.headlineLightItalic34Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.125rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'italic',
		});
		expect(typePresetObject.headlineLightItalic42Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.625rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'italic',
		});
		expect(typePresetObject.headlineLightItalic50Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '3.125rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'italic',
		});
		expect(typePresetObject.headlineLightItalic64Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '4rem',
			lineHeight: 1.15,
			fontWeight: 300,
			fontStyle: 'italic',
		});
		expect(typePresetObject.headlineMedium14Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '0.875rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineMedium15Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '0.9375rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineMedium17Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.0625rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineMedium20Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.25rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineMedium24Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.5rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineMedium28Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.75rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineMedium34Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.125rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineMedium42Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.625rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineMedium50Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '3.125rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineMedium64Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '4rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'normal',
		});
		expect(typePresetObject.headlineMediumItalic14Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '0.875rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'italic',
		});
		expect(typePresetObject.headlineMediumItalic15Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '0.9375rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'italic',
		});
		expect(typePresetObject.headlineMediumItalic17Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.0625rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'italic',
		});
		expect(typePresetObject.headlineMediumItalic20Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.25rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'italic',
		});
		expect(typePresetObject.headlineMediumItalic24Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.5rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'italic',
		});
		expect(typePresetObject.headlineMediumItalic28Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '1.75rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'italic',
		});
		expect(typePresetObject.headlineMediumItalic34Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.125rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'italic',
		});
		expect(typePresetObject.headlineMediumItalic42Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '2.625rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'italic',
		});
		expect(typePresetObject.headlineMediumItalic50Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '3.125rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'italic',
		});
		expect(typePresetObject.headlineMediumItalic64Object).toEqual({
			fontFamily:
				'"GH Guardian Headline", "Guardian Egyptian Web", Georgia, serif',
			fontSize: '4rem',
			lineHeight: 1.15,
			fontWeight: 500,
			fontStyle: 'italic',
		});
		expect(typePresetObject.textEgyptian14Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '0.875rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textEgyptian15Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '0.9375rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textEgyptian17Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '1.0625rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textEgyptianBold14Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '0.875rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textEgyptianBold15Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '0.9375rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textEgyptianBold17Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '1.0625rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textEgyptianBoldItalic14Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '0.875rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'italic',
		});
		expect(typePresetObject.textEgyptianBoldItalic15Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '0.9375rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'italic',
		});
		expect(typePresetObject.textEgyptianBoldItalic17Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '1.0625rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'italic',
		});
		expect(typePresetObject.textEgyptianItalic14Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '0.875rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePresetObject.textEgyptianItalic15Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '0.9375rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePresetObject.textEgyptianItalic17Object).toEqual({
			fontFamily:
				'GuardianTextEgyptian, "Guardian Text Egyptian Web", Georgia, serif',
			fontSize: '1.0625rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePresetObject.textSans12Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '0.75rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textSans14Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '0.875rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textSans15Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '0.9375rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textSans17Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.0625rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textSans20Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.25rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textSans24Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.5rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textSans28Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.75rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textSans34Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '2.125rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textSansBold12Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '0.75rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textSansBold14Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '0.875rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textSansBold15Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '0.9375rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textSansBold17Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.0625rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textSansBold20Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.25rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textSansBold24Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.5rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textSansBold28Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.75rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textSansBold34Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '2.125rem',
			lineHeight: 1.3,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.textSansItalic12Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '0.75rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePresetObject.textSansItalic14Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '0.875rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePresetObject.textSansItalic15Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '0.9375rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePresetObject.textSansItalic17Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.0625rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePresetObject.textSansItalic20Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.25rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePresetObject.textSansItalic24Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.5rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePresetObject.textSansItalic28Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '1.75rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePresetObject.textSansItalic34Object).toEqual({
			fontFamily:
				'GuardianTextSans, "Guardian Text Sans Web", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
			fontSize: '2.125rem',
			lineHeight: 1.3,
			fontWeight: 400,
			fontStyle: 'italic',
		});
		expect(typePresetObject.titlepiece42Object).toEqual({
			fontFamily: '"GT Guardian Titlepiece", Georgia, serif',
			fontSize: '2.625rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.titlepiece50Object).toEqual({
			fontFamily: '"GT Guardian Titlepiece", Georgia, serif',
			fontSize: '3.125rem',
			lineHeight: 1.15,
			fontWeight: 700,
			fontStyle: 'normal',
		});
		expect(typePresetObject.titlepiece70Object).toEqual({
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
