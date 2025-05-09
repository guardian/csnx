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
			default: 'palette.brand[400]',
		},
	},
	brandAlt: {
		backgrounds: {
			default: 'palette.brandAlt[400]',
		},
	},
	readerRevenueBrand: {
		backgrounds: {
			default: 'palette.brand[400]',
		},
	},
	readerRevenueBrandAlt: {
		backgrounds: {
			default: 'palette.brandAlt[400]',
		},
	},
	custom: {
		backgrounds: {
			default: 'palette.neutral[10]',
		},
	},
};

const meta: Meta<typeof Button> = {
	title: 'React Components/Button',
	component: Button,
	argTypes: {
		icon: {
			options: ['None', 'Cross'],
			mapping: {
				None: undefined,
				Cross: <SvgCross />,
			},
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
		// @ts-expect-error - Name from control options which Storybook maps to `undefined`
		icon: 'None',
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
		...PrimaryPriorityDefaultTheme.args,
		// @ts-expect-error - Name from control options which Storybook maps to `<SvgCross />`
		icon: 'Cross',
		children: 'Close',
	},
};

export const TextAndIconRightDefaultSizeDefaultTheme: Story = {
	args: {
		...TextAndIconLeftDefaultSizeDefaultTheme.args,
		iconSide: 'right',
	},
};

export const TextAndIconLeftSmallSizeDefaultTheme: Story = {
	args: {
		...TextAndIconLeftDefaultSizeDefaultTheme.args,
		size: 'small',
	},
};

export const TextAndIconRightSmallSizeDefaultTheme: Story = {
	args: {
		...TextAndIconRightDefaultSizeDefaultTheme.args,
		size: 'small',
	},
};

export const TextAndIconLeftXSmallSizeDefaultTheme: Story = {
	args: {
		...TextAndIconLeftDefaultSizeDefaultTheme.args,
		size: 'xsmall',
	},
};

export const TextAndIconRightXSmallSizeDefaultTheme: Story = {
	args: {
		...TextAndIconRightDefaultSizeDefaultTheme.args,
		size: 'xsmall',
	},
};

export const IconOnlyDefaultSizeDefaultTheme: Story = {
	args: {
		...TextAndIconLeftDefaultSizeDefaultTheme.args,
		hideLabel: true,
		children: 'Close subscription banner',
	},
};

export const IconOnlySmallSizeDefaultTheme: Story = {
	args: {
		...IconOnlyDefaultSizeDefaultTheme.args,
		size: 'small',
	},
};

export const IconOnlyXSmallSizeDefaultTheme: Story = {
	args: {
		...IconOnlyDefaultSizeDefaultTheme.args,
		size: 'xsmall',
	},
};

export const IsLoadingPrimary: Story = {
	args: {
		...PrimaryPriorityDefaultTheme.args,
		isLoading: true,
	},
};

export const IsLoadingPrimarySmall: Story = {
	args: {
		...IsLoadingPrimary.args,
		size: 'small',
	},
};

export const IsLoadingPrimaryXSmall: Story = {
	args: {
		...IsLoadingPrimary.args,
		size: 'xsmall',
	},
};

export const IsLoadingSecondary: Story = {
	args: {
		...IsLoadingPrimary.args,
		priority: 'secondary',
	},
};

export const IsLoadingTertiary: Story = {
	args: {
		...IsLoadingPrimary.args,
		priority: 'tertiary',
	},
};

export const IsLoadingSubdued: Story = {
	args: {
		...IsLoadingPrimary.args,
		priority: 'subdued',
	},
};

export const IsLoadingIconSideRight: Story = {
	args: {
		...IsLoadingPrimary.args,
		iconSide: 'right',
	},
};

export const IsLoadingDisabled: Story = {
	args: {
		...IsLoadingPrimary.args,
		disabled: true,
	},
};

export const IsLoadingLabelHidden: Story = {
	args: {
		...IsLoadingPrimary.args,
		hideLabel: true,
	},
};

export const CustomTheme: Story = {
	args: {
		...PrimaryPriorityDefaultTheme.args,
		theme: {
			textPrimary: palette.brand[400],
			backgroundPrimary: palette.brandAlt[400],
		},
	},
	parameters: {
		...themeParameters.custom,
	},
};

export const CustomTransparentTheme: Story = {
	args: {
		...PrimaryPriorityDefaultTheme.args,
		priority: 'tertiary',
		theme: {
			textTertiary: palette.neutral[100],
			borderTertiary: palette.neutral[100],
			backgroundTertiary: 'transparent',
		},
	},
	parameters: {
		...themeParameters.custom,
	},
};
