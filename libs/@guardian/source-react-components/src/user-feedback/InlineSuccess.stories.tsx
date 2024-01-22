import type { Meta, StoryFn } from '@storybook/react';
import { InlineSuccess } from './InlineSuccess';
import { userFeedbackThemeBrand } from './theme';
import type { UserFeedbackProps } from './types';

const meta: Meta<typeof InlineSuccess> = {
	title: 'InlineSuccess',
	component: InlineSuccess,
	args: {
		size: 'medium',
	},
};

export default meta;

const Template: StoryFn<typeof InlineSuccess> = (args: UserFeedbackProps) => (
	<InlineSuccess {...args}>Your voucher code is valid</InlineSuccess>
);

export const InlineSuccessDefaultTheme: StoryFn<typeof InlineSuccess> =
	Template.bind({});

// *****************************************************************************

export const InlineSuccessBrandTheme: StoryFn<typeof InlineSuccess> =
	Template.bind({});
InlineSuccessBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: userFeedbackThemeBrand,
};

// *****************************************************************************

export const InlineSuccessSmallDefaultTheme: StoryFn<typeof InlineSuccess> =
	Template.bind({});
InlineSuccessSmallDefaultTheme.args = {
	size: 'small',
};

// *****************************************************************************

export const InlineSuccessSmallBrandTheme: StoryFn<typeof InlineSuccess> =
	Template.bind({});
InlineSuccessSmallBrandTheme.args = {
	size: 'small',
};
InlineSuccessSmallBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: userFeedbackThemeBrand,
};
