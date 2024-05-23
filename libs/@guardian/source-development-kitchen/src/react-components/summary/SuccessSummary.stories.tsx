import type { Meta, StoryFn } from '@storybook/react';
import type { SuccessSummaryProps } from './SuccessSummary';
import { SuccessSummary } from './SuccessSummary';

const meta: Meta<typeof SuccessSummary> = {
	title: 'React Components/Success Summary',
	component: SuccessSummary,
	args: {
		message: 'Your request was successful',
		context: '',
	},
};

export default meta;

const Template: StoryFn<typeof SuccessSummary> = (
	args: SuccessSummaryProps,
) => <SuccessSummary {...args} />;

export const SuccessOnly: StoryFn<typeof SuccessSummary> = Template.bind({});
SuccessOnly.args = {
	message: 'This is an example with a success message only',
};

export const SuccessOnlyAsReactNode: StoryFn<typeof SuccessSummary> =
	Template.bind({});
SuccessOnlyAsReactNode.args = {
	message: (
		<>
			This is the success message as a <s>ReactNode</s>
		</>
	),
};

// *****************************************************************************

export const WithContext: StoryFn<typeof SuccessSummary> = Template.bind({});
WithContext.args = {
	message: 'It was successful',
	context: 'This is some more information about this success message',
};

// *****************************************************************************

export const WithContextAsReactNode: StoryFn<typeof SuccessSummary> =
	Template.bind({});
WithContextAsReactNode.args = {
	message: 'It was successful',
	context: (
		<>
			This is the context as a <b>ReactNode</b>
		</>
	),
};
