import type { Meta, StoryFn } from '@storybook/react';
import type { SvgRoundelInverseProps } from './SvgRoundelInverse';
import { SvgRoundelInverse } from './SvgRoundelInverse';

const meta: Meta<typeof SvgRoundelInverse> = {
	title: 'SvgRoundelInverse',
	component: SvgRoundelInverse,
	argTypes: {
		width: {
			control: { type: 'range', min: 10, max: 600 },
		},
	},
};

export default meta;

const Template: StoryFn<typeof SvgRoundelInverse> = (
	args: SvgRoundelInverseProps,
) => <SvgRoundelInverse {...args} />;

export const Default: StoryFn<typeof SvgRoundelInverse> = Template.bind({});
