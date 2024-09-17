import type { Meta, StoryObj } from '@csnx/storybooks/react';
import { SvgRoundelInverse } from './SvgRoundelInverse';

const meta: Meta<typeof SvgRoundelInverse> = {
	title: 'React Components/SvgRoundelInverse',
	component: SvgRoundelInverse,
	argTypes: {
		width: {
			control: { type: 'range', min: 10, max: 600 },
		},
	},
};

export default meta;
type Story = StoryObj<typeof SvgRoundelInverse>;

export const Default: Story = {};
