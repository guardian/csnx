import type { Meta, StoryObj } from '@storybook/react-vite';
import { palette } from '../../foundations';
import { SvgCross } from '../__generated__/icons/SvgCross';
import { Button } from './Button';
import { themeButtonBrand, themeButtonBrandAlt } from './theme';
import {
	themeButtonReaderRevenue,
	themeButtonReaderRevenueBrand,
	themeButtonReaderRevenueBrandAlt,
} from './theme-reader-revenue';

const themeGlobals = {
	default: {},
	brand: {
		backgrounds: {
			value: 'palette.brand[400]',
		},
	},
	brandAlt: {
		backgrounds: {
			value: 'palette.brandAlt[400]',
		},
	},
	readerRevenueBrand: {
		backgrounds: {
			value: 'palette.brand[400]',
		},
	},
	readerRevenueBrandAlt: {
		backgrounds: {
			value: 'palette.brandAlt[400]',
		},
	},
	custom: {
		backgrounds: {
			value: 'palette.neutral[10]',
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
	globals: {
		...themeGlobals.brand,
	},
};

export const SecondaryPriorityBrandTheme: Story = {
	args: {
		...SecondaryPriorityDefaultTheme.args,
		theme: themeButtonBrand,
	},
	globals: {
		...themeGlobals.brand,
	},
};

export const TertiaryPriorityBrandTheme: Story = {
	args: {
		...TertiaryPriorityDefaultTheme.args,
		theme: themeButtonBrand,
	},
	globals: {
		...themeGlobals.brand,
	},
};

export const SubduedPriorityBrandTheme: Story = {
	args: {
		...SubduedPriorityDefaultTheme.args,
		theme: themeButtonBrand,
	},
	globals: {
		...themeGlobals.brand,
	},
};

export const PrimaryPriorityBrandAltTheme: Story = {
	args: {
		...PrimaryPriorityDefaultTheme.args,
		theme: themeButtonBrandAlt,
	},
	globals: {
		...themeGlobals.brandAlt,
	},
};

export const SecondaryPriorityBrandAltTheme: Story = {
	args: {
		...SecondaryPriorityDefaultTheme.args,
		theme: themeButtonBrandAlt,
	},
	globals: {
		...themeGlobals.brandAlt,
	},
};

export const TertiaryPriorityBrandAltTheme: Story = {
	args: {
		...TertiaryPriorityDefaultTheme.args,
		theme: themeButtonBrandAlt,
	},
	globals: {
		...themeGlobals.brandAlt,
	},
};

export const SubduedPriorityBrandAltTheme: Story = {
	args: {
		...SubduedPriorityDefaultTheme.args,
		theme: themeButtonBrandAlt,
	},
	globals: {
		...themeGlobals.brandAlt,
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
	globals: {
		...themeGlobals.readerRevenueBrand,
	},
};

export const TertiaryPriorityReaderRevenueBrandTheme: Story = {
	args: {
		...TertiaryPriorityDefaultTheme.args,
		theme: themeButtonReaderRevenueBrand,
	},
	globals: {
		...themeGlobals.readerRevenueBrand,
	},
};

export const PrimaryPriorityReaderRevenueBrandAltTheme: Story = {
	args: {
		...PrimaryPriorityDefaultTheme.args,
		theme: themeButtonReaderRevenueBrandAlt,
	},
	globals: {
		...themeGlobals.readerRevenueBrandAlt,
	},
};

export const TertiaryPriorityReaderRevenueBrandAltTheme: Story = {
	args: {
		...TertiaryPriorityDefaultTheme.args,
		theme: themeButtonReaderRevenueBrandAlt,
	},
	globals: {
		...themeGlobals.readerRevenueBrandAlt,
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
	globals: {
		...themeGlobals.custom,
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
	globals: {
		...themeGlobals.custom,
	},
};
