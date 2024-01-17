import type { Story } from '@storybook/react';
import { InlineSuccess } from './InlineSuccess';
import { userFeedbackThemeBrand } from './theme';
import type { UserFeedbackProps } from './types';

export default {
	title: 'InlineSuccess',
	component: InlineSuccess,
	args: {
		size: 'medium',
	},
};

const Template: Story<UserFeedbackProps> = (args: UserFeedbackProps) => (
	<InlineSuccess {...args}>Your voucher code is valid</InlineSuccess>
);

export const InlineSuccessDefaultTheme = Template.bind({});

// *****************************************************************************

export const InlineSuccessBrandTheme = Template.bind({});
InlineSuccessBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: userFeedbackThemeBrand,
};

// *****************************************************************************

export const InlineSuccessDefaultThemeSizeSmall = Template.bind({});
InlineSuccessDefaultThemeSizeSmall.args = {
	size: 'small',
};

// *****************************************************************************

export const InlineSuccessBrandThemeSizeSmall = Template.bind({});
InlineSuccessBrandThemeSizeSmall.args = {
	size: 'small',
};
InlineSuccessBrandThemeSizeSmall.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: userFeedbackThemeBrand,
};
