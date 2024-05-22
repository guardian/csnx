import type { Meta, StoryFn } from '@storybook/react';
import type { ErrorSummaryProps } from './ErrorSummary';
import { ErrorSummary } from './ErrorSummary';

const meta: Meta<typeof ErrorSummary> = {
	title: 'Error Summary',
	component: ErrorSummary,
	args: {
		message: 'There has been a problem',
		context: '',
		errorReportUrl: '',
	} as ErrorSummaryProps,
};

export default meta;

const Template: StoryFn<typeof ErrorSummary> = (args: ErrorSummaryProps) => (
	<ErrorSummary {...args} />
);

export const ErrorOnly: StoryFn<typeof ErrorSummary> = Template.bind({});
ErrorOnly.args = {
	message: 'This is an example with an error message only',
};

// *****************************************************************************

export const ErrorOnlyAsReactNode: StoryFn<typeof ErrorSummary> = Template.bind(
	{},
);
ErrorOnlyAsReactNode.args = {
	message: (
		<>
			This is the error message as a <s>ReactNode</s>
		</>
	),
};

// *****************************************************************************

export const WithContext: StoryFn<typeof ErrorSummary> = Template.bind({});
WithContext.args = {
	message: 'Here is an error',
	context: 'This is some more information about this error message',
};

// *****************************************************************************

export const WithContextAsReactNode: StoryFn<typeof ErrorSummary> =
	Template.bind({});
WithContextAsReactNode.args = {
	message: 'Here is an error',
	context: (
		<>
			This is the context as a <b>ReactNode</b>
		</>
	),
};

// *****************************************************************************

export const WithReportLink: StoryFn<typeof ErrorSummary> = Template.bind({});
WithReportLink.args = {
	message: 'Here is an error',
	context: 'This is some more information about this error message',
	errorReportUrl: 'https://www.theguardian.com/info/tech-feedback',
};
