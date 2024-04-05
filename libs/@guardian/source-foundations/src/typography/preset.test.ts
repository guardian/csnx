import {
	body,
	headline,
	textSans,
	titlepiece,
} from '../_deprecated/typography';
import * as presets from '../../vendor/typography/css';

/*
 * No typography API equivalent:
 *
 * headlineBold14
 * headlineLight14
 * headlineLightItalic14
 * headlineMedium14
 * headlineMediumItalic14
 * headlineBold70
 * headlineLight70
 * headlineLightItalic70
 * headlineMedium70
 * headlineMediumItalic70
 * kicker14
 */

const typographyApiMapping = {
	article15: body.small(),
	article17: body.medium(),
	articleBold15: body.small({ fontWeight: 'bold' }),
	articleBold17: body.medium({ fontWeight: 'bold' }),
	articleBoldItalic15: body.small({ fontWeight: 'bold', fontStyle: 'italic' }),
	articleBoldItalic17: body.medium({ fontWeight: 'bold', fontStyle: 'italic' }),
	articleItalic15: body.small({ fontStyle: 'italic' }),
	articleItalic17: body.medium({ fontStyle: 'italic' }),
	// headlineBold14: () => {},
	headlineBold17: headline.xxxsmall({ fontWeight: 'bold' }),
	headlineBold20: headline.xxsmall({ fontWeight: 'bold' }),
	headlineBold24: headline.xsmall({ fontWeight: 'bold' }),
	headlineBold28: headline.small({ fontWeight: 'bold' }),
	headlineBold34: headline.medium({ fontWeight: 'bold' }),
	headlineBold42: headline.large({ fontWeight: 'bold' }),
	headlineBold50: headline.xlarge({ fontWeight: 'bold' }),
	// headlineBold70: () => {},
	// headlineLight14: () => {},
	headlineLight17: headline.xxxsmall({ fontWeight: 'light' }),
	headlineLight20: headline.xxsmall({ fontWeight: 'light' }),
	headlineLight24: headline.xsmall({ fontWeight: 'light' }),
	headlineLight28: headline.small({ fontWeight: 'light' }),
	headlineLight34: headline.medium({ fontWeight: 'light' }),
	headlineLight42: headline.large({ fontWeight: 'light' }),
	headlineLight50: headline.xlarge({ fontWeight: 'light' }),
	// headlineLight70: () => {},
	// headlineLightItalic14: () => {},
	headlineLightItalic17: headline.xxxsmall({
		fontWeight: 'light',
		fontStyle: 'italic',
	}),
	headlineLightItalic20: headline.xxsmall({
		fontWeight: 'light',
		fontStyle: 'italic',
	}),
	headlineLightItalic24: headline.xsmall({
		fontWeight: 'light',
		fontStyle: 'italic',
	}),
	headlineLightItalic28: headline.small({
		fontWeight: 'light',
		fontStyle: 'italic',
	}),
	headlineLightItalic34: headline.medium({
		fontWeight: 'light',
		fontStyle: 'italic',
	}),
	headlineLightItalic42: headline.large({
		fontWeight: 'light',
		fontStyle: 'italic',
	}),
	headlineLightItalic50: headline.xlarge({
		fontWeight: 'light',
		fontStyle: 'italic',
	}),
	// headlineLightItalic70: () => {},
	// headlineMedium14: () => {},
	headlineMedium17: headline.xxxsmall(),
	headlineMedium20: headline.xxsmall(),
	headlineMedium24: headline.xsmall(),
	headlineMedium28: headline.small(),
	headlineMedium34: headline.medium(),
	headlineMedium42: headline.large(),
	headlineMedium50: headline.xlarge(),
	// headlineMedium70: () => {},
	// headlineMediumItalic14: () => {},
	headlineMediumItalic17: headline.xxxsmall({ fontStyle: 'italic' }),
	headlineMediumItalic20: headline.xxsmall({ fontStyle: 'italic' }),
	headlineMediumItalic24: headline.xsmall({ fontStyle: 'italic' }),
	headlineMediumItalic28: headline.small({ fontStyle: 'italic' }),
	headlineMediumItalic34: headline.medium({ fontStyle: 'italic' }),
	headlineMediumItalic42: headline.large({ fontStyle: 'italic' }),
	headlineMediumItalic50: headline.xlarge({ fontStyle: 'italic' }),
	// headlineMediumItalic70: () => {},
	// kicker14: () => {},
	kicker17: headline.xxxsmall({ fontWeight: 'bold' }),
	kicker20: headline.xxsmall({ fontWeight: 'bold' }),
	kicker24: headline.xsmall({ fontWeight: 'bold' }),
	kicker34: headline.medium({ fontWeight: 'bold' }),
	textEgyptian14: body.xsmall({ lineHeight: 'regular' }),
	textEgyptian15: body.small({ lineHeight: 'regular' }),
	textEgyptian17: body.medium({ lineHeight: 'regular' }),
	textEgyptianBold14: body.xsmall({
		lineHeight: 'regular',
		fontWeight: 'bold',
	}),
	textEgyptianBold15: body.small({ lineHeight: 'regular', fontWeight: 'bold' }),
	textEgyptianBold17: body.medium({
		lineHeight: 'regular',
		fontWeight: 'bold',
	}),
	textEgyptianBoldItalic14: body.xsmall({
		lineHeight: 'regular',
		fontWeight: 'bold',
		fontStyle: 'italic',
	}),
	textEgyptianBoldItalic15: body.small({
		lineHeight: 'regular',
		fontWeight: 'bold',
		fontStyle: 'italic',
	}),
	textEgyptianBoldItalic17: body.medium({
		lineHeight: 'regular',
		fontWeight: 'bold',
		fontStyle: 'italic',
	}),
	textEgyptianItalic14: body.xsmall({
		lineHeight: 'regular',
		fontStyle: 'italic',
	}),
	textEgyptianItalic15: body.small({
		lineHeight: 'regular',
		fontStyle: 'italic',
	}),
	textEgyptianItalic17: body.medium({
		lineHeight: 'regular',
		fontStyle: 'italic',
	}),
	textSans12: textSans.xxsmall(),
	textSans14: textSans.xsmall(),
	textSans15: textSans.small(),
	textSans17: textSans.medium(),
	textSans20: textSans.large(),
	textSans24: textSans.xlarge(),
	textSans28: textSans.xxlarge(),
	textSans34: textSans.xxxlarge(),
	textSansBold12: textSans.xxsmall({ fontWeight: 'bold' }),
	textSansBold14: textSans.xsmall({ fontWeight: 'bold' }),
	textSansBold15: textSans.small({ fontWeight: 'bold' }),
	textSansBold17: textSans.medium({ fontWeight: 'bold' }),
	textSansBold20: textSans.large({ fontWeight: 'bold' }),
	textSansBold24: textSans.xlarge({ fontWeight: 'bold' }),
	textSansBold28: textSans.xxlarge({ fontWeight: 'bold' }),
	textSansBold34: textSans.xxxlarge({ fontWeight: 'bold' }),
	textSansItalic12: textSans.xxsmall({ fontStyle: 'italic' }),
	textSansItalic14: textSans.xsmall({ fontStyle: 'italic' }),
	textSansItalic15: textSans.small({ fontStyle: 'italic' }),
	textSansItalic17: textSans.medium({ fontStyle: 'italic' }),
	textSansItalic20: textSans.large({ fontStyle: 'italic' }),
	textSansItalic24: textSans.xlarge({ fontStyle: 'italic' }),
	textSansItalic28: textSans.xxlarge({ fontStyle: 'italic' }),
	textSansItalic34: textSans.xxxlarge({ fontStyle: 'italic' }),
	titlepiece42: titlepiece.small(),
	titlepiece50: titlepiece.medium(),
	titlepiece70: titlepiece.large(),
};

type Preset = keyof typeof typographyApiMapping;

describe('Typography preset CSS', () => {
	Object.keys(typographyApiMapping).forEach((preset) => {
		it(`${preset} should match typography API output`, () => {
			let apiOutput = typographyApiMapping[preset as Preset];

			// Typography API does not include `font-style` property if value has not
			// been changed from the default so we explicitly add it if not present
			if (!apiOutput.match(/font-style/)) {
				apiOutput += 'font-style: normal';
			}

			expect(presets[preset as Preset]).toMatchCSS(apiOutput, {
				isFragment: true,
			});
		});
	});
});
