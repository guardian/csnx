import type { Meta, StoryObj } from '@storybook/react';
import { palette } from '../../foundations';
import { InlineSuccess } from './InlineSuccess';
import { themeUserFeedbackBrand } from './theme';

const meta: Meta<typeof InlineSuccess> = {
	title: 'React Components/InlineSuccess',
	component: InlineSuccess,
	args: {
		size: 'medium',
	},
};

export default meta;
type Story = StoryObj<typeof InlineSuccess>;

export const InlineSuccessDefaultTheme: Story = {
	args: {
		children: 'Your voucher code is valid',
	},
};

export const InlineSuccessBrandTheme: Story = {
	args: {
		...InlineSuccessDefaultTheme.args,
		theme: themeUserFeedbackBrand,
	},
	parameters: {
		backgrounds: {
			default: 'palette.brand[400]',
		},
	},
};

export const InlineSuccessSmallDefaultTheme: Story = {
	args: {
		...InlineSuccessDefaultTheme.args,
		size: 'small',
	},
};

export const InlineSuccessSmallBrandTheme: Story = {
	args: {
		...InlineSuccessBrandTheme.args,
		size: 'small',
	},

	parameters: {
		...InlineSuccessBrandTheme.parameters,
	},
};

export const InlineSuccessCustomTheme: Story = {
	args: {
		...InlineSuccessDefaultTheme.args,
		theme: { textSuccess: palette.success[500] },
	},
	parameters: {
		backgrounds: {
			default: 'palette.neutral[10]',
		},
	},
};
