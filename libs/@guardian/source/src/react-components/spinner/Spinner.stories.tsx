import type { Meta, StoryFn } from '@storybook/react';
import type { SpinnerProps } from './Spinner';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
	title: 'React Components/Spinner',
	component: Spinner,
	args: {
		size: 'medium',
	},
};

export default meta;

const Template: StoryFn<typeof Spinner> = (args: SpinnerProps) => (
	<Spinner {...args} />
);

// *****************************************************************************

export const DefaultTheme: StoryFn<typeof Spinner> = Template.bind({});
