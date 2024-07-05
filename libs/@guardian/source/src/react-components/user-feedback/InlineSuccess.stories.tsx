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

const Template: Story = {
	render: (args) => (
		<InlineSuccess {...args}>Your voucher code is valid</InlineSuccess>
	),
};

export const InlineSuccessDefaultTheme: Story = {
	...Template,
};

export const InlineSuccessBrandTheme: Story = {
	...Template,
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
	...Template,
	args: {
		size: 'small',
	},
};

export const InlineSuccessSmallBrandTheme: Story = {
	...Template,
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
	...Template,
	args: {
		theme: { textSuccess: palette.success[500] },
	},
	parameters: {
		backgrounds: {
			default: 'background.inverse',
		},
	},
};
