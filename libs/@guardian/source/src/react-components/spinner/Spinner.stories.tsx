import type { Meta, StoryFn } from '@storybook/react';
import type { SpinnerProps } from './Spinner';
import { Spinner } from './Spinner';
import { palette } from '../../foundations';

const meta: Meta<typeof Spinner> = {
	title: 'React Components/Spinner',
	component: Spinner,
	argTypes: {
		size: {
			options: ['xsmall', 'small', 'medium'],
			control: { type: 'select' },
		},
	},
};

export default meta;

const Template: StoryFn<typeof Spinner> = (args: SpinnerProps) => (
	<Spinner {...args} />
);

// *****************************************************************************

export const XSmallSizeDefaultTheme: StoryFn<typeof Spinner> = Template.bind(
	{},
);
XSmallSizeDefaultTheme.args = {
	size: 'xsmall',
};

// *****************************************************************************

export const SmallSizeDefaultTheme: StoryFn<typeof Spinner> = Template.bind({});
SmallSizeDefaultTheme.args = {
	size: 'small',
};

// *****************************************************************************

export const MediumSizeDefaultTheme: StoryFn<typeof Spinner> = Template.bind(
	{},
);
MediumSizeDefaultTheme.args = {
	size: 'medium',
};

// *****************************************************************************

export const CustomSizeDefaultTheme: StoryFn<typeof Spinner> = Template.bind(
	{},
);
CustomSizeDefaultTheme.args = {
	size: 40,
};

// *****************************************************************************

export const CustomTheme: StoryFn<typeof Spinner> = Template.bind({});
CustomTheme.args = {
	theme: {
		strokeBackground: 'transparent',
		strokeForeground: palette.neutral[7],
	},
};
