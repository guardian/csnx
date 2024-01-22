import { breakpoints } from '@guardian/source-foundations';
import type { Meta, StoryFn } from '@storybook/react';
import { InlineError } from './InlineError';
import { userFeedbackThemeBrand } from './theme';
import type { UserFeedbackProps } from './types';

const meta: Meta<typeof InlineError> = {
	title: 'InlineError',
	component: InlineError,
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
