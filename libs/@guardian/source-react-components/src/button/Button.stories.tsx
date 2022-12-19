import { ThemeProvider } from '@emotion/react';
import type { Story } from '@storybook/react';
import { SvgCross } from '../../vendor/icons/SvgCross';
import { Button } from './Button';
import type { ButtonTheme } from './theme';
import { buttonThemeBrand, buttonThemeBrandAlt } from './theme';
import {
	buttonThemeReaderRevenue,
	buttonThemeReaderRevenueBrand,
	buttonThemeReaderRevenueBrandAlt,
} from './theme-reader-revenue';
import type { ButtonPriority } from './types';

// These types are the right types, but don't work with Storybook v6 which uses Emotion v10
// import type { Args, Story } from '@storybook/react';

const themeParameters = {
	default: {},
	brand: {
		backgrounds: {
			default: 'brandBackground.primary',
		},
		theme: buttonThemeBrand,
	},
	brandAlt: {
		backgrounds: {
			default: 'brandAltBackground.primary',
		},
		theme: buttonThemeBrandAlt,
	},
	readerRevenue: {
		theme: buttonThemeReaderRevenue,
	},
	readerRevenueBrand: {
		backgrounds: {
			default: 'brandBackground.primary',
		},
		theme: buttonThemeReaderRevenueBrand,
	},
	readerRevenueBrandAlt: {
		backgrounds: {
			default: 'brandAltBackground.primary',
		},
		theme: buttonThemeReaderRevenueBrandAlt,
	},
};

export default {
	title: 'Button',
	component: Button,
	argTypes: {
		icon: {
			options: ['undefined', 'cross'],
			mapping: {
				undefined: undefined,
				cross: <SvgCross />,
			},
			control: { type: 'radio' },
		},
	},
	args: {
		children: 'Subscribe now',
		size: 'default',
		hideLabel: false,
		icon: 'undefined',
		priority: 'primary',
		iconSide: 'left',
		nudgeIcon: false,
	},
};

interface Temp {
	priority: ButtonPriority;
	theme?: ButtonTheme;
	isLoading?: boolean;
	// TODO: update string type
	size?: string;
	disabled?: true;
	iconSide?: string;
	hideLabel?: boolean;
}

const Template: Story<Temp> = (args: Temp) => {
	const { priority, theme } = args;

	if (theme) {
		return (
			<ThemeProvider theme={theme}>
				<Button priority={priority} />
			</ThemeProvider>
		);
	}

	return <Button priority={priority} />;
};

// *****************************************************************************

export const PrimaryPriorityDefaultTheme = Template.bind({});
PrimaryPriorityDefaultTheme.args = {
	priority: 'primary',
	theme: undefined,
};
// PrimaryPriorityDefaultTheme.parameters = themeParameters.default;

export const SecondaryPriorityDefaultTheme = Template.bind({});
SecondaryPriorityDefaultTheme.args = {
	priority: 'secondary',
	theme: undefined,
};
// SecondaryPriorityDefaultTheme.parameters = themeParameters.default;

export const TertiaryPriorityDefaultTheme = Template.bind({});
TertiaryPriorityDefaultTheme.args = {
	priority: 'tertiary',
};
TertiaryPriorityDefaultTheme.parameters = themeParameters.default;

export const SubduedPriorityDefaultTheme = Template.bind({});
SubduedPriorityDefaultTheme.args = {
	priority: 'subdued',
};
SubduedPriorityDefaultTheme.parameters = themeParameters.default;

// *****************************************************************************

export const PrimaryPriorityBrandTheme = Template.bind({});
PrimaryPriorityBrandTheme.args = {
	priority: 'primary',
};
PrimaryPriorityBrandTheme.parameters = themeParameters.brand;

export const SecondaryPriorityBrandTheme = Template.bind({});
SecondaryPriorityBrandTheme.args = {
	priority: 'secondary',
};
SecondaryPriorityBrandTheme.parameters = themeParameters.brand;

export const TertiaryPriorityBrandTheme = Template.bind({});
TertiaryPriorityBrandTheme.args = {
	priority: 'tertiary',
};
TertiaryPriorityBrandTheme.parameters = themeParameters.brand;

export const SubduedPriorityBrandTheme = Template.bind({});
SubduedPriorityBrandTheme.args = {
	priority: 'subdued',
};
SubduedPriorityBrandTheme.parameters = themeParameters.brand;

// *****************************************************************************

export const PrimaryPriorityBrandAltTheme = Template.bind({});
PrimaryPriorityBrandAltTheme.args = {
	priority: 'primary',
};
PrimaryPriorityBrandAltTheme.parameters = themeParameters.brandAlt;

export const SecondaryPriorityBrandAltTheme = Template.bind({});
SecondaryPriorityBrandAltTheme.args = {
	priority: 'secondary',
};
SecondaryPriorityBrandAltTheme.parameters = themeParameters.brandAlt;

export const TertiaryPriorityBrandAltTheme = Template.bind({});
TertiaryPriorityBrandAltTheme.args = {
	priority: 'tertiary',
};
TertiaryPriorityBrandAltTheme.parameters = themeParameters.brandAlt;

export const SubduedPriorityBrandAltTheme = Template.bind({});
SubduedPriorityBrandAltTheme.args = {
	priority: 'subdued',
};
SubduedPriorityBrandAltTheme.parameters = themeParameters.brandAlt;

// *****************************************************************************

export const PrimaryPriorityReaderRevenueTheme = Template.bind({});
PrimaryPriorityReaderRevenueTheme.args = {
	priority: 'primary',
};
PrimaryPriorityReaderRevenueTheme.parameters = themeParameters.readerRevenue;

export const TertiaryPriorityReaderRevenueTheme = Template.bind({});
TertiaryPriorityReaderRevenueTheme.args = {
	priority: 'tertiary',
};
TertiaryPriorityReaderRevenueTheme.parameters = themeParameters.readerRevenue;

// *****************************************************************************

export const PrimaryPriorityReaderRevenueBrandTheme = Template.bind({});
PrimaryPriorityReaderRevenueBrandTheme.args = {
	priority: 'primary',
};
PrimaryPriorityReaderRevenueBrandTheme.parameters =
	themeParameters.readerRevenueBrand;

export const TertiaryPriorityReaderRevenueBrandTheme = Template.bind({});
TertiaryPriorityReaderRevenueBrandTheme.args = {
	priority: 'tertiary',
};
TertiaryPriorityReaderRevenueBrandTheme.parameters =
	themeParameters.readerRevenueBrand;

// *****************************************************************************

export const PrimaryPriorityReaderRevenueBrandAltTheme = Template.bind({});
PrimaryPriorityReaderRevenueBrandAltTheme.args = {
	priority: 'primary',
};
PrimaryPriorityReaderRevenueBrandAltTheme.parameters =
	themeParameters.readerRevenueBrandAlt;

export const TertiaryPriorityReaderRevenueBrandAltTheme = Template.bind({});
TertiaryPriorityReaderRevenueBrandAltTheme.args = {
	priority: 'tertiary',
};
TertiaryPriorityReaderRevenueBrandAltTheme.parameters =
	themeParameters.readerRevenueBrandAlt;

// *****************************************************************************

export const DefaultSizeDefaultTheme = Template.bind({});

// *****************************************************************************

export const SmallSizeDefaultTheme = Template.bind({});
SmallSizeDefaultTheme.args = {
	size: 'small',
};

// *****************************************************************************

export const XSmallSizeDefaultTheme = Template.bind({});
XSmallSizeDefaultTheme.args = {
	size: 'xsmall',
};

// *****************************************************************************

export const TextAndIconLeftDefaultSizeDefaultTheme = Template.bind({});
TextAndIconLeftDefaultSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
	icon: 'cross',
	children: 'Close',
};

// *****************************************************************************

export const TextAndIconRightDefaultSizeDefaultTheme = Template.bind({});
TextAndIconRightDefaultSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
	icon: 'cross',
	iconSide: 'right',
	children: 'Close',
};

// *****************************************************************************

export const TextAndIconLeftSmallSizeDefaultTheme = Template.bind({});
TextAndIconLeftSmallSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
	icon: 'cross',
	size: 'small',
	children: 'Close',
};

// *****************************************************************************

export const TextAndIconRightSmallSizeDefaultTheme = Template.bind({});
TextAndIconRightSmallSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
	icon: 'cross',
	iconSide: 'right',
	size: 'small',
	children: 'Close',
};

// *****************************************************************************

export const TextAndIconLeftXSmallSizeDefaultTheme = Template.bind({});
TextAndIconLeftXSmallSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
	icon: 'cross',
	size: 'xsmall',
	children: 'Close',
};

// *****************************************************************************

export const TextAndIconRightXSmallSizeDefaultTheme = Template.bind({});
TextAndIconRightXSmallSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
	icon: 'cross',
	iconSide: 'right',
	size: 'xsmall',
	children: 'Close',
};

// *****************************************************************************

export const IconOnlyDefaultSizeDefaultTheme = Template.bind({});
IconOnlyDefaultSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
	icon: 'cross',
	hideLabel: true,
	children: 'Close subscription banner',
};

// *****************************************************************************

export const IconOnlySmallSizeDefaultTheme = Template.bind({});
IconOnlySmallSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
	icon: 'cross',
	hideLabel: true,
	size: 'small',
	children: 'Close subscription banner',
};

// *****************************************************************************

export const IconOnlyXSmallSizeDefaultTheme = Template.bind({});
IconOnlyXSmallSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
	icon: 'cross',
	hideLabel: true,
	size: 'xsmall',
	children: 'Close subscription banner',
};

// *****************************************************************************

export const IsLoadingPrimary = Template.bind({});
IsLoadingPrimary.args = {
	isLoading: true,
};

// *****************************************************************************

export const IsLoadingPrimarySmall = Template.bind({});
IsLoadingPrimarySmall.args = {
	isLoading: true,
	size: 'small',
};

// *****************************************************************************

export const IsLoadingPrimaryXSmall = Template.bind({});
IsLoadingPrimaryXSmall.args = {
	isLoading: true,
	size: 'xsmall',
};

// *****************************************************************************

export const IsLoadingSecondary = Template.bind({});
IsLoadingSecondary.args = {
	isLoading: true,
	priority: 'secondary',
};

// *****************************************************************************

export const IsLoadingTertiary = Template.bind({});
IsLoadingTertiary.args = {
	isLoading: true,
	priority: 'tertiary',
};

// *****************************************************************************

export const IsLoadingSubdued = Template.bind({});
IsLoadingSubdued.args = {
	isLoading: true,
	priority: 'subdued',
};

// *****************************************************************************

export const IsLoadingIconSideRight = Template.bind({});
IsLoadingIconSideRight.args = {
	isLoading: true,
	iconSide: 'right',
};

// *****************************************************************************

export const IsLoadingDisabled = Template.bind({});
IsLoadingDisabled.args = {
	isLoading: true,
	disabled: true,
};

// *****************************************************************************

export const IsLoadingLabelHidden = Template.bind({});
IsLoadingLabelHidden.args = {
	isLoading: true,
	hideLabel: true,
};
