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

const InlineSuccessTemplate: Story = {
	render: (args) => (
		<InlineSuccess {...args}>Your voucher code is valid</InlineSuccess>
	),
};

export const InlineSuccessDefaultTheme: Story = {
	...InlineSuccessTemplate,
};

export const InlineSuccessBrandTheme: Story = {
	...InlineSuccessTemplate,
	args: {
		theme: themeUserFeedbackBrand,
	},
	parameters: {
		backgrounds: {
			default: 'brandBackground.primary',
		},
	},
};

export const InlineSuccessSmallDefaultTheme: Story = {
	...InlineSuccessTemplate,
	args: {
		size: 'small',
	},
};

export const InlineSuccessSmallBrandTheme: Story = {
	...InlineSuccessTemplate,
	args: {
		size: 'small',
		theme: themeUserFeedbackBrand,
	},

	parameters: {
		backgrounds: {
			default: 'brandBackground.primary',
		},
	},
};

export const InlineSuccessCustomTheme: Story = {
	...InlineSuccessTemplate,
	args: {
		theme: { textSuccess: palette.success[500] },
	},
	parameters: {
		backgrounds: {
			default: 'background.inverse',
		},
	},
};
