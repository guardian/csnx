import { palette } from '@guardian/source-foundations';
import type { Meta, StoryFn } from '@storybook/react';
import { SvgCross } from '../../vendor/icons/SvgCross';
import type { ButtonProps } from './Button';
import { Button } from './Button';
import { themeButtonBrand, themeButtonBrandAlt } from './theme';
import {
	themeButtonReaderRevenue,
	themeButtonReaderRevenueBrand,
	themeButtonReaderRevenueBrandAlt,
} from './theme-reader-revenue';

const themeParameters = {
	default: {},
	brand: {
		backgrounds: {
			default: 'brandBackground.primary',
		},
	},
	brandAlt: {
		backgrounds: {
			default: 'brandAltBackground.primary',
		},
	},
	readerRevenueBrand: {
		backgrounds: {
			default: 'brandBackground.primary',
		},
	},
	readerRevenueBrandAlt: {
		backgrounds: {
			default: 'brandAltBackground.primary',
		},
	},
};

const meta: Meta<typeof Button> = {
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
		icon: undefined,
		priority: 'primary',
		iconSide: 'left',
		nudgeIcon: false,
	},
};

export default meta;

const Template: StoryFn<typeof Button> = (args: ButtonProps) => (
	<Button {...args} />
);

// *****************************************************************************

export const PrimaryPriorityDefaultTheme: StoryFn<typeof Button> =
	Template.bind({});
PrimaryPriorityDefaultTheme.args = {
	priority: 'primary',
};

export const SecondaryPriorityDefaultTheme: StoryFn<typeof Button> =
	Template.bind({});
SecondaryPriorityDefaultTheme.args = {
	priority: 'secondary',
};

export const TertiaryPriorityDefaultTheme: StoryFn<typeof Button> =
	Template.bind({});
TertiaryPriorityDefaultTheme.args = {
	priority: 'tertiary',
};

export const SubduedPriorityDefaultTheme: StoryFn<typeof Button> =
	Template.bind({});
SubduedPriorityDefaultTheme.args = {
	priority: 'subdued',
};

// *****************************************************************************

export const PrimaryPriorityBrandTheme: StoryFn<typeof Button> = Template.bind(
	{},
);
PrimaryPriorityBrandTheme.args = {
	priority: 'primary',
	theme: themeButtonBrand,
};
PrimaryPriorityBrandTheme.parameters = themeParameters.brand;

export const SecondaryPriorityBrandTheme: StoryFn<typeof Button> =
	Template.bind({});
SecondaryPriorityBrandTheme.args = {
	priority: 'secondary',
	theme: themeButtonBrand,
};
SecondaryPriorityBrandTheme.parameters = themeParameters.brand;

export const TertiaryPriorityBrandTheme: StoryFn<typeof Button> = Template.bind(
	{},
);
TertiaryPriorityBrandTheme.args = {
	priority: 'tertiary',
	theme: themeButtonBrand,
};
TertiaryPriorityBrandTheme.parameters = themeParameters.brand;

export const SubduedPriorityBrandTheme: StoryFn<typeof Button> = Template.bind(
	{},
);
SubduedPriorityBrandTheme.args = {
	priority: 'subdued',
	theme: themeButtonBrand,
};
SubduedPriorityBrandTheme.parameters = themeParameters.brand;

// *****************************************************************************

export const PrimaryPriorityBrandAltTheme: StoryFn<typeof Button> =
	Template.bind({});
PrimaryPriorityBrandAltTheme.args = {
	priority: 'primary',
	theme: themeButtonBrandAlt,
};
PrimaryPriorityBrandAltTheme.parameters = themeParameters.brandAlt;

export const SecondaryPriorityBrandAltTheme: StoryFn<typeof Button> =
	Template.bind({});
SecondaryPriorityBrandAltTheme.args = {
	priority: 'secondary',
	theme: themeButtonBrandAlt,
};
SecondaryPriorityBrandAltTheme.parameters = themeParameters.brandAlt;

export const TertiaryPriorityBrandAltTheme: StoryFn<typeof Button> =
	Template.bind({});
TertiaryPriorityBrandAltTheme.args = {
	priority: 'tertiary',
	theme: themeButtonBrandAlt,
};
TertiaryPriorityBrandAltTheme.parameters = themeParameters.brandAlt;

export const SubduedPriorityBrandAltTheme: StoryFn<typeof Button> =
	Template.bind({});
SubduedPriorityBrandAltTheme.args = {
	priority: 'subdued',
	theme: themeButtonBrandAlt,
};
SubduedPriorityBrandAltTheme.parameters = themeParameters.brandAlt;

// *****************************************************************************

export const PrimaryPriorityReaderRevenueTheme: StoryFn<typeof Button> =
	Template.bind({});
PrimaryPriorityReaderRevenueTheme.args = {
	priority: 'primary',
	theme: themeButtonReaderRevenue,
};

export const TertiaryPriorityReaderRevenueTheme: StoryFn<typeof Button> =
	Template.bind({});
TertiaryPriorityReaderRevenueTheme.args = {
	priority: 'tertiary',
	theme: themeButtonReaderRevenue,
};

// *****************************************************************************

export const PrimaryPriorityReaderRevenueBrandTheme: StoryFn<typeof Button> =
	Template.bind({});
PrimaryPriorityReaderRevenueBrandTheme.args = {
	priority: 'primary',
	theme: themeButtonReaderRevenueBrand,
};
PrimaryPriorityReaderRevenueBrandTheme.parameters =
	themeParameters.readerRevenueBrand;

export const TertiaryPriorityReaderRevenueBrandTheme: StoryFn<typeof Button> =
	Template.bind({});
TertiaryPriorityReaderRevenueBrandTheme.args = {
	priority: 'tertiary',
	theme: themeButtonReaderRevenueBrand,
};
TertiaryPriorityReaderRevenueBrandTheme.parameters =
	themeParameters.readerRevenueBrand;

// *****************************************************************************

export const PrimaryPriorityReaderRevenueBrandAltTheme: StoryFn<typeof Button> =
	Template.bind({});
PrimaryPriorityReaderRevenueBrandAltTheme.args = {
	priority: 'primary',
	theme: themeButtonReaderRevenueBrandAlt,
};
PrimaryPriorityReaderRevenueBrandAltTheme.parameters =
	themeParameters.readerRevenueBrandAlt;

export const TertiaryPriorityReaderRevenueBrandAltTheme: StoryFn<
	typeof Button
> = Template.bind({});
TertiaryPriorityReaderRevenueBrandAltTheme.args = {
	priority: 'tertiary',
	theme: themeButtonReaderRevenueBrandAlt,
};
TertiaryPriorityReaderRevenueBrandAltTheme.parameters =
	themeParameters.readerRevenueBrandAlt;

// *****************************************************************************

export const DefaultSizeDefaultTheme: StoryFn<typeof Button> = Template.bind(
	{},
);

// *****************************************************************************

export const SmallSizeDefaultTheme: StoryFn<typeof Button> = Template.bind({});
SmallSizeDefaultTheme.args = {
	size: 'small',
};

// *****************************************************************************

export const XSmallSizeDefaultTheme: StoryFn<typeof Button> = Template.bind({});
XSmallSizeDefaultTheme.args = {
	size: 'xsmall',
};

// *****************************************************************************

export const TextAndIconLeftDefaultSizeDefaultTheme: StoryFn<typeof Button> =
	Template.bind({});
TextAndIconLeftDefaultSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
	icon: 'cross',
	children: 'Close',
};

// *****************************************************************************

export const TextAndIconRightDefaultSizeDefaultTheme: StoryFn<typeof Button> =
	Template.bind({});
TextAndIconRightDefaultSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
	icon: 'cross',
	iconSide: 'right',
	children: 'Close',
};

// *****************************************************************************

export const TextAndIconLeftSmallSizeDefaultTheme: StoryFn<typeof Button> =
	Template.bind({});
TextAndIconLeftSmallSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
	icon: 'cross',
	size: 'small',
	children: 'Close',
};

// *****************************************************************************

export const TextAndIconRightSmallSizeDefaultTheme: StoryFn<typeof Button> =
	Template.bind({});
TextAndIconRightSmallSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
	icon: 'cross',
	iconSide: 'right',
	size: 'small',
	children: 'Close',
};

// *****************************************************************************

export const TextAndIconLeftXSmallSizeDefaultTheme: StoryFn<typeof Button> =
	Template.bind({});
TextAndIconLeftXSmallSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
	icon: 'cross',
	size: 'xsmall',
	children: 'Close',
};

// *****************************************************************************

export const TextAndIconRightXSmallSizeDefaultTheme: StoryFn<typeof Button> =
	Template.bind({});
TextAndIconRightXSmallSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
	icon: 'cross',
	iconSide: 'right',
	size: 'xsmall',
	children: 'Close',
};

// *****************************************************************************

export const IconOnlyDefaultSizeDefaultTheme: StoryFn<typeof Button> =
	Template.bind({});
IconOnlyDefaultSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
	icon: 'cross',
	hideLabel: true,
	children: 'Close subscription banner',
};

// *****************************************************************************

export const IconOnlySmallSizeDefaultTheme: StoryFn<typeof Button> =
	Template.bind({});
IconOnlySmallSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
	icon: 'cross',
	hideLabel: true,
	size: 'small',
	children: 'Close subscription banner',
};

// *****************************************************************************

export const IconOnlyXSmallSizeDefaultTheme: StoryFn<typeof Button> =
	Template.bind({});
IconOnlyXSmallSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
	icon: 'cross',
	hideLabel: true,
	size: 'xsmall',
	children: 'Close subscription banner',
};

// *****************************************************************************

export const IsLoadingPrimary: StoryFn<typeof Button> = Template.bind({});
IsLoadingPrimary.args = {
	isLoading: true,
};

// *****************************************************************************

export const IsLoadingPrimarySmall: StoryFn<typeof Button> = Template.bind({});
IsLoadingPrimarySmall.args = {
	isLoading: true,
	size: 'small',
};

// *****************************************************************************

export const IsLoadingPrimaryXSmall: StoryFn<typeof Button> = Template.bind({});
IsLoadingPrimaryXSmall.args = {
	isLoading: true,
	size: 'xsmall',
};

// *****************************************************************************

export const IsLoadingSecondary: StoryFn<typeof Button> = Template.bind({});
IsLoadingSecondary.args = {
	isLoading: true,
	priority: 'secondary',
};

// *****************************************************************************

export const IsLoadingTertiary: StoryFn<typeof Button> = Template.bind({});
IsLoadingTertiary.args = {
	isLoading: true,
	priority: 'tertiary',
};

// *****************************************************************************

export const IsLoadingSubdued: StoryFn<typeof Button> = Template.bind({});
IsLoadingSubdued.args = {
	isLoading: true,
	priority: 'subdued',
};

// *****************************************************************************

export const IsLoadingIconSideRight: StoryFn<typeof Button> = Template.bind({});
IsLoadingIconSideRight.args = {
	isLoading: true,
	iconSide: 'right',
};

// *****************************************************************************

export const IsLoadingDisabled: StoryFn<typeof Button> = Template.bind({});
IsLoadingDisabled.args = {
	isLoading: true,
	disabled: true,
};

// *****************************************************************************

export const IsLoadingLabelHidden: StoryFn<typeof Button> = Template.bind({});
IsLoadingLabelHidden.args = {
	isLoading: true,
	hideLabel: true,
};

export const CustomThemeButton: StoryFn<typeof Button> = Template.bind({});
CustomThemeButton.args = {
	theme: {
		backgroundPrimary: palette.news[100],
		backgroundPrimaryHover: palette.news[200],
		textPrimary: palette.opinion[400],
	},
};
