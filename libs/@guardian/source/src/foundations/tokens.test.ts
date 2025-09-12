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
import * as typePreset from './__generated__/typography';
import { transitions } from './animation/transitions';
import { breakpoints } from './breakpoints/breakpoints';
import { palette } from './palette/palette';
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
				'300': '#041f4a',
				'400': '#052962',
				'500': '#0077b6',
				'600': '#506991',
				'800': '#c1d8fc',
			},
			brandAlt: {
				'200': '#f3c100',
				'300': '#ffd900',
				'400': '#ffe500',
			},
			culture: {
				'100': '#3e3323',
				'200': '#574835',
				'300': '#6b5840',
				'350': '#866d50',
				'400': '#866d50',
				'450': '#a1845c',
				'50': '#2b2625',
				'500': '#eacca0',
				'600': '#e7d4b9',
				'700': '#efe8dd',
				'800': '#fbf6ef',
			},
			error: {
				'400': '#c70000',
				'500': '#ff9081',
			},
			focus: {
				'400': '#0077b6',
			},
			labs: {
				'100': '#09615b',
				'200': '#0c7a73',
				'300': '#65a897',
				'400': '#69d1ca',
				'500': '#a8e3df',
				'600': '#dcf4f3',
				'700': '#f3fbfb',
			},
			lifestyle: {
				'100': '#510043',
				'200': '#650054',
				'300': '#7d0068',
				'400': '#bb3b80',
				'450': '#f37abc',
				'500': '#ffabdb',
				'600': '#fec8d3',
				'800': '#fef1f8',
			},
			neutral: {
				'0': '#000000',
				'10': '#1a1a1a',
				'100': '#ffffff',
				'20': '#333333',
				'38': '#545454',
				'46': '#707070',
				'60': '#999999',
				'7': '#121212',
				'73': '#bababa',
				'86': '#dcdcdc',
				'93': '#ededed',
				'97': '#f6f6f6',
			},
			news: {
				'100': '#660505',
				'200': '#8b0000',
				'300': '#ab0613',
				'400': '#c70000',
				'500': '#ff5943',
				'550': '#ff9081',
				'600': '#ffbac8',
				'700': '#ffd8d1',
				'800': '#fff4f2',
			},
			notificationBlue: {
				'400': '#0190f7',
			},
			opinion: {
				'100': '#672005',
				'200': '#8d2700',
				'300': '#c74600',
				'400': '#c74600',
				'450': '#e05e00',
				'500': '#ff7f0f',
				'550': '#ff9941',
				'600': '#f9b376',
				'700': '#ffe7d4',
				'800': '#fef9f5',
			},
			specialReport: {
				'100': '#222527',
				'200': '#303538',
				'300': '#3f464a',
				'400': '#595c5f',
				'450': '#9da0a2',
				'500': '#abc2c9',
				'700': '#e4e5e8',
				'800': '#eff1f2',
			},
			specialReportAlt: {
				'100': '#2b2b2a',
				'200': '#b9300a',
				'300': '#ff663d',
				'700': '#ebe6e1',
				'800': '#f5f0eb',
			},
			sport: {
				'100': '#003c60',
				'200': '#004e7c',
				'300': '#005689',
				'400': '#0077b6',
				'500': '#00b2ff',
				'600': '#90dcff',
				'700': '#d8f1ff',
				'800': '#f1f8fc',
			},
			success: {
				'300': '#185e36',
				'400': '#22874d',
				'500': '#58d08b',
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
			ctaPrimaryHover: '#234b8a',
			ctaSecondary: '#c1d8fc',
			ctaSecondaryHover: '#acc9f7',
			ctaTertiaryHover: '#e5e5e5',
			input: '#ffffff',
			inputChecked: '#0077b6',
			inverse: '#1a1a1a',
			primary: '#ffffff',
			secondary: '#f6f6f6',
		});
		expect(brandBackground).toEqual({
			ctaPrimary: '#ffffff',
			ctaPrimaryHover: '#e0e0e0',
			ctaSecondary: '#506991',
			ctaSecondaryHover: '#234b8a',
			ctaTertiaryHover: '#041f4a',
			inputChecked: '#ffffff',
			primary: '#052962',
		});
		expect(brandAltBackground).toEqual({
			ctaPrimary: '#121212',
			ctaPrimaryHover: '#454545',
			ctaSecondary: '#f3c100',
			ctaSecondaryHover: '#f2ae00',
			ctaTertiaryHover: '#ffd213',
			primary: '#ffe500',
		});
		expect(border).toEqual({
			ctaTertiary: '#052962',
			error: '#c70000',
			focusHalo: '#0077b6',
			input: '#999999',
			inputActive: '#0077b6',
			inputChecked: '#0077b6',
			inputHover: '#0077b6',
			primary: '#999999',
			secondary: '#dcdcdc',
			success: '#22874d',
		});
		expect(brandBorder).toEqual({
			ctaTertiary: '#ffffff',
			error: '#ff9081',
			input: '#c1d8fc',
			inputChecked: '#ffffff',
			inputHover: '#ffffff',
			primary: '#506991',
			secondary: '#506991',
			success: '#58d08b',
		});
		expect(brandAltBorder).toEqual({
			ctaTertiary: '#121212',
		});
		expect(line).toEqual({
			primary: '#dcdcdc',
		});
		expect(brandLine).toEqual({
			primary: '#506991',
		});
		expect(brandAltLine).toEqual({
			primary: '#121212',
		});
		expect(text).toEqual({
			anchorPrimary: '#0077b6',
			anchorSecondary: '#121212',
			ctaPrimary: '#ffffff',
			ctaSecondary: '#052962',
			ctaTertiary: '#052962',
			error: '#c70000',
			groupLabel: '#121212',
			groupLabelSupporting: '#707070',
			inputChecked: '#052962',
			inputError: '#121212',
			inputHover: '#052962',
			inputLabel: '#121212',
			inputLabelSupporting: '#707070',
			newsInverse: '#ff9081',
			primary: '#121212',
			success: '#22874d',
			supporting: '#707070',
			userInput: '#121212',
		});
		expect(brandText).toEqual({
			anchorPrimary: '#ffffff',
			anchorPrimaryHover: '#ffe500',
			ctaPrimary: '#052962',
			ctaSecondary: '#ffffff',
			ctaTertiary: '#ffffff',
			error: '#ff9081',
			inputLabel: '#ffffff',
			inputLabelSupporting: '#c1d8fc',
			primary: '#ffffff',
			success: '#58d08b',
			supporting: '#c1d8fc',
			userInput: '#ffffff',
		});
		expect(brandAltText).toEqual({
			anchorPrimary: '#121212',
			ctaPrimary: '#ffffff',
			ctaSecondary: '#121212',
			ctaTertiary: '#121212',
			primary: '#121212',
			supporting: '#999999',
		});
	});
});
