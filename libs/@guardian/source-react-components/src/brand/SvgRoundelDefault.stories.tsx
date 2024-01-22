import type { Meta, StoryFn } from '@storybook/react';
import type { SvgRoundelDefaultProps } from './SvgRoundelDefault';
import { SvgRoundelDefault } from './SvgRoundelDefault';

const meta: Meta<typeof SvgRoundelDefault> = {
	title: 'SvgRoundelDefault',
	component: SvgRoundelDefault,
	argTypes: {
		width: {
			control: { type: 'range', min: 10, max: 600 },
		},
	},
};

export default meta;

const Template: StoryFn<typeof SvgRoundelDefault> = (
	args: SvgRoundelDefaultProps,
) => <SvgRoundelDefault {...args} />;

export const Default: StoryFn<typeof SvgRoundelDefault> = Template.bind({});
