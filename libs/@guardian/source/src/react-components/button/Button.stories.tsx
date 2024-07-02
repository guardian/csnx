import type { Meta, StoryObj } from '@storybook/react';
import { palette } from '../../foundations';
import { SvgCross } from '../__generated__/icons/SvgCross';
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
	title: 'React Components/Button',
	component: Button,
	argTypes: {
		icon: {
			options: [undefined, <SvgCross />],
			control: { type: 'radio' },
		},
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const PrimaryPriorityDefaultTheme: Story = {
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

export const SecondaryPriorityDefaultTheme: Story = {
	args: {
		...PrimaryPriorityDefaultTheme.args,
		priority: 'secondary',
	},
};

export const TertiaryPriorityDefaultTheme: Story = {
	args: {
		...PrimaryPriorityDefaultTheme.args,
		priority: 'tertiary',
	},
};

export const SubduedPriorityDefaultTheme: Story = {
	args: {
		...PrimaryPriorityDefaultTheme.args,
		priority: 'subdued',
	},
};

export const PrimaryPriorityBrandTheme: Story = {
	args: {
		...PrimaryPriorityDefaultTheme.args,
		theme: themeButtonBrand,
	},
	parameters: {
		...themeParameters.brand,
	},
};

export const SecondaryPriorityBrandTheme: Story = {
	args: {
		...SecondaryPriorityDefaultTheme.args,
		theme: themeButtonBrand,
	},
	parameters: {
		...themeParameters.brand,
	},
};

export const TertiaryPriorityBrandTheme: Story = {
	args: {
		...TertiaryPriorityDefaultTheme.args,
		theme: themeButtonBrand,
	},
	parameters: {
		...themeParameters.brand,
	},
};

export const SubduedPriorityBrandTheme: Story = {
	args: {
		...SubduedPriorityDefaultTheme.args,
		theme: themeButtonBrand,
	},
	parameters: {
		...themeParameters.brand,
	},
};

export const PrimaryPriorityBrandAltTheme: Story = {
	args: {
		...PrimaryPriorityDefaultTheme.args,
		theme: themeButtonBrandAlt,
	},
	parameters: {
		...themeParameters.brandAlt,
	},
};

export const SecondaryPriorityBrandAltTheme: Story = {
	args: {
		...SecondaryPriorityDefaultTheme.args,
		theme: themeButtonBrandAlt,
	},
	parameters: {
		...themeParameters.brandAlt,
	},
};

export const TertiaryPriorityBrandAltTheme: Story = {
	args: {
		...TertiaryPriorityDefaultTheme.args,
		theme: themeButtonBrandAlt,
	},
	parameters: {
		...themeParameters.brandAlt,
	},
};

export const SubduedPriorityBrandAltTheme: Story = {
	args: {
		...SubduedPriorityDefaultTheme.args,
		theme: themeButtonBrandAlt,
	},
	parameters: {
		...themeParameters.brandAlt,
	},
};

export const PrimaryPriorityReaderRevenueTheme: Story = {
	args: {
		...PrimaryPriorityDefaultTheme.args,
		theme: themeButtonReaderRevenue,
	},
};

export const TertiaryPriorityReaderRevenueTheme: Story = {
	args: {
		...TertiaryPriorityDefaultTheme.args,
		theme: themeButtonReaderRevenue,
	},
};

export const PrimaryPriorityReaderRevenueBrandTheme: Story = {
	args: {
		...PrimaryPriorityDefaultTheme.args,
		theme: themeButtonReaderRevenueBrand,
	},
	parameters: {
		...themeParameters.readerRevenueBrand,
	},
};

export const TertiaryPriorityReaderRevenueBrandTheme: Story = {
	args: {
		...TertiaryPriorityDefaultTheme.args,
		theme: themeButtonReaderRevenueBrand,
	},
	parameters: {
		...themeParameters.readerRevenueBrand,
	},
};

export const PrimaryPriorityReaderRevenueBrandAltTheme: Story = {
	args: {
		...PrimaryPriorityDefaultTheme.args,
		theme: themeButtonReaderRevenueBrandAlt,
	},
	parameters: {
		...themeParameters.readerRevenueBrandAlt,
	},
};

export const TertiaryPriorityReaderRevenueBrandAltTheme: Story = {
	args: {
		...TertiaryPriorityDefaultTheme.args,
		theme: themeButtonReaderRevenueBrandAlt,
	},
	parameters: {
		...themeParameters.readerRevenueBrandAlt,
	},
};

export const DefaultSizeDefaultTheme: Story = {
	args: {
		...PrimaryPriorityDefaultTheme.args,
	},
};

export const SmallSizeDefaultTheme: Story = {
	args: {
		...DefaultSizeDefaultTheme.args,
		size: 'small',
	},
};

export const XSmallSizeDefaultTheme: Story = {
	args: {
		...DefaultSizeDefaultTheme.args,
		size: 'xsmall',
	},
};

export const TextAndIconLeftDefaultSizeDefaultTheme: Story = {
	args: {
		...DefaultSizeDefaultTheme.args,
		icon: undefined,
		children: 'Close',
	},
};

// // *****************************************************************************

// export const TextAndIconLeftDefaultSizeDefaultTheme: StoryFn<typeof Button> =
// 	Template.bind({});
// TextAndIconLeftDefaultSizeDefaultTheme.args = {
// 	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
// 	icon: 'cross',
// 	children: 'Close',
// };

// // *****************************************************************************

// export const TextAndIconRightDefaultSizeDefaultTheme: StoryFn<typeof Button> =
// 	Template.bind({});
// TextAndIconRightDefaultSizeDefaultTheme.args = {
// 	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
// 	icon: 'cross',
// 	iconSide: 'right',
// 	children: 'Close',
// };

// // *****************************************************************************

// export const TextAndIconLeftSmallSizeDefaultTheme: StoryFn<typeof Button> =
// 	Template.bind({});
// TextAndIconLeftSmallSizeDefaultTheme.args = {
// 	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
// 	icon: 'cross',
// 	size: 'small',
// 	children: 'Close',
// };

// // *****************************************************************************

// export const TextAndIconRightSmallSizeDefaultTheme: StoryFn<typeof Button> =
// 	Template.bind({});
// TextAndIconRightSmallSizeDefaultTheme.args = {
// 	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
// 	icon: 'cross',
// 	iconSide: 'right',
// 	size: 'small',
// 	children: 'Close',
// };

// // *****************************************************************************

// export const TextAndIconLeftXSmallSizeDefaultTheme: StoryFn<typeof Button> =
// 	Template.bind({});
// TextAndIconLeftXSmallSizeDefaultTheme.args = {
// 	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
// 	icon: 'cross',
// 	size: 'xsmall',
// 	children: 'Close',
// };

// // *****************************************************************************

// export const TextAndIconRightXSmallSizeDefaultTheme: StoryFn<typeof Button> =
// 	Template.bind({});
// TextAndIconRightXSmallSizeDefaultTheme.args = {
// 	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
// 	icon: 'cross',
// 	iconSide: 'right',
// 	size: 'xsmall',
// 	children: 'Close',
// };

// // *****************************************************************************

// export const IconOnlyDefaultSizeDefaultTheme: StoryFn<typeof Button> =
// 	Template.bind({});
// IconOnlyDefaultSizeDefaultTheme.args = {
// 	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
// 	icon: 'cross',
// 	hideLabel: true,
// 	children: 'Close subscription banner',
// };

// // *****************************************************************************

// export const IconOnlySmallSizeDefaultTheme: StoryFn<typeof Button> =
// 	Template.bind({});
// IconOnlySmallSizeDefaultTheme.args = {
// 	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
// 	icon: 'cross',
// 	hideLabel: true,
// 	size: 'small',
// 	children: 'Close subscription banner',
// };

// // *****************************************************************************

// export const IconOnlyXSmallSizeDefaultTheme: StoryFn<typeof Button> =
// 	Template.bind({});
// IconOnlyXSmallSizeDefaultTheme.args = {
// 	// @ts-expect-error - Storybook maps 'JSX element' to <SvgCross />
// 	icon: 'cross',
// 	hideLabel: true,
// 	size: 'xsmall',
// 	children: 'Close subscription banner',
// };

// // *****************************************************************************

// export const IsLoadingPrimary: StoryFn<typeof Button> = Template.bind({});
// IsLoadingPrimary.args = {
// 	isLoading: true,
// };

// // *****************************************************************************

// export const IsLoadingPrimarySmall: StoryFn<typeof Button> = Template.bind({});
// IsLoadingPrimarySmall.args = {
// 	isLoading: true,
// 	size: 'small',
// };

// // *****************************************************************************

// export const IsLoadingPrimaryXSmall: StoryFn<typeof Button> = Template.bind({});
// IsLoadingPrimaryXSmall.args = {
// 	isLoading: true,
// 	size: 'xsmall',
// };

// // *****************************************************************************

// export const IsLoadingSecondary: StoryFn<typeof Button> = Template.bind({});
// IsLoadingSecondary.args = {
// 	isLoading: true,
// 	priority: 'secondary',
// };

// // *****************************************************************************

// export const IsLoadingTertiary: StoryFn<typeof Button> = Template.bind({});
// IsLoadingTertiary.args = {
// 	isLoading: true,
// 	priority: 'tertiary',
// };

// // *****************************************************************************

// export const IsLoadingSubdued: StoryFn<typeof Button> = Template.bind({});
// IsLoadingSubdued.args = {
// 	isLoading: true,
// 	priority: 'subdued',
// };

// // *****************************************************************************

// export const IsLoadingIconSideRight: StoryFn<typeof Button> = Template.bind({});
// IsLoadingIconSideRight.args = {
// 	isLoading: true,
// 	iconSide: 'right',
// };

// // *****************************************************************************

// export const IsLoadingDisabled: StoryFn<typeof Button> = Template.bind({});
// IsLoadingDisabled.args = {
// 	isLoading: true,
// 	disabled: true,
// };

// // *****************************************************************************

// export const IsLoadingLabelHidden: StoryFn<typeof Button> = Template.bind({});
// IsLoadingLabelHidden.args = {
// 	isLoading: true,
// 	hideLabel: true,
// };

// // *****************************************************************************

// export const CustomTheme: StoryFn<typeof Button> = Template.bind({});
// CustomTheme.args = {
// 	theme: {
// 		textPrimary: palette.brand[400],
// 		backgroundPrimary: palette.brandAlt[400],
// 		backgroundPrimaryHover: palette.brandAlt[200],
// 	},
// };
// CustomTheme.parameters = {
// 	backgrounds: {
// 		default: 'background.inverse',
// 	},
// };
