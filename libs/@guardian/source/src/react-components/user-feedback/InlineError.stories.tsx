import { breakpoints, palette } from '../../foundations';
import type { Meta, StoryFn } from '@storybook/react';
import type { UserFeedbackProps } from './@types/UserFeedbackProps';
import { InlineError } from './InlineError';
import { userFeedbackThemeBrand } from './theme';

const meta: Meta<typeof InlineError> = {
	title: 'InlineError',
	component: InlineError,
	args: {
		size: 'medium',
	},
};

export default meta;

const Template: StoryFn<typeof InlineError> = ({
	children,
	...args
}: UserFeedbackProps) => (
	<InlineError {...args}>{children ?? 'Please enter your name'}</InlineError>
);

export const InlineErrorDefaultTheme: StoryFn<typeof InlineError> =
	Template.bind({});

// *****************************************************************************

export const InlineErrorBrandTheme: StoryFn<typeof InlineError> = Template.bind(
	{},
);
InlineErrorBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: userFeedbackThemeBrand,
};

// *****************************************************************************

export const LongInlineErrorDefaultThemeMobile: StoryFn<typeof InlineError> =
	Template.bind({});
LongInlineErrorDefaultThemeMobile.parameters = {
	viewport: { defaultViewport: 'mobileMedium' },
	chromatic: {
		viewports: [breakpoints.mobileMedium],
	},
};
LongInlineErrorDefaultThemeMobile.args = {
	children: 'Please pick a date in the future, but not a leap year',
};

// *****************************************************************************

export const InlineErrorSmallDefaultTheme: StoryFn<typeof InlineError> =
	Template.bind({});
InlineErrorSmallDefaultTheme.args = {
	size: 'small',
};

// *****************************************************************************

export const InlineErrorSmallBrandTheme: StoryFn<typeof InlineError> =
	Template.bind({});
InlineErrorSmallBrandTheme.args = {
	size: 'small',
};
InlineErrorSmallBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: userFeedbackThemeBrand,
};

// *****************************************************************************

export const InlineErrorCustomTheme: StoryFn<typeof InlineError> =
	Template.bind({});
InlineErrorCustomTheme.args = {
	theme: { textError: palette.error[500] },
};
InlineErrorCustomTheme.parameters = {
	backgrounds: {
		default: 'background.inverse',
	},
};
