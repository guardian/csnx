import type { Meta, StoryFn } from '@storybook/react';
import type { SvgRoundelBrandInverseProps } from './SvgRoundelBrandInverse';
import { SvgRoundelBrandInverse } from './SvgRoundelBrandInverse';

const meta: Meta<typeof SvgRoundelBrandInverse> = {
	title: 'SvgRoundelBrandInverse',
	component: SvgRoundelBrandInverse,
	argTypes: {
		width: {
			control: { type: 'range', min: 10, max: 600 },
		},
	},
};

export default meta;

const Template: StoryFn<typeof SvgRoundelBrandInverse> = (
	args: SvgRoundelBrandInverseProps,
) => <SvgRoundelBrandInverse {...args} />;

export const Default: StoryFn<typeof SvgRoundelBrandInverse> = Template.bind(
	{},
);
