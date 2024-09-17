import type { Meta, StoryObj } from '@csnx/storybooks/react';
import { SvgRoundelDefault } from './SvgRoundelDefault';

const meta: Meta<typeof SvgRoundelDefault> = {
	title: 'React Components/SvgRoundelDefault',
	component: SvgRoundelDefault,
	argTypes: {
		width: {
			control: { type: 'range', min: 10, max: 600 },
		},
	},
};

export default meta;
type Story = StoryObj<typeof SvgRoundelDefault>;

export const Default: Story = {};
