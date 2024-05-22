import type { Meta, StoryFn } from '@storybook/react';
import type { InfoSummaryProps } from './InfoSummary';
import { InfoSummary } from './InfoSummary';

const meta: Meta<typeof InfoSummary> = {
	title: 'Info Summary',
	component: InfoSummary,
	args: {
		message: 'Here is some information',
		context: '',
	},
};

export default meta;

const Template: StoryFn<typeof InfoSummary> = (args: InfoSummaryProps) => (
	<InfoSummary {...args} />
);

export const InfoOnly: StoryFn<typeof InfoSummary> = Template.bind({});
InfoOnly.args = {
	message: 'This is an example with a info message only',
};

// *****************************************************************************

export const InfoOnlyAsReactNode: StoryFn<typeof InfoSummary> = Template.bind(
	{},
);
InfoOnlyAsReactNode.args = {
	message: (
		<>
			This is the info message as a <s>ReactNode</s>
		</>
	),
};

// *****************************************************************************

export const WithContext: StoryFn<typeof InfoSummary> = Template.bind({});
WithContext.args = {
	message: 'It was insightful',
	context: 'This is some more information about this info message',
};

// *****************************************************************************

export const WithContextAsReactNode: StoryFn<typeof InfoSummary> =
	Template.bind({});
WithContextAsReactNode.args = {
	message: 'It was insightful',
	context: (
		<>
			This is the context as a <b>ReactNode</b>
		</>
	),
};
