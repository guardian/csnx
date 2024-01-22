import type { Meta, StoryFn } from '@storybook/react';
import { InlineSuccess } from './InlineSuccess';
import { userFeedbackThemeBrand } from './theme';
import type { UserFeedbackProps } from './types';

const meta: Meta<typeof InlineSuccess> = {
	title: 'InlineSuccess',
	component: InlineSuccess,
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
