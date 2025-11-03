import type { Meta, StoryObj } from '@storybook/react-vite';
import { SvgRoundelBrandInverse } from './SvgRoundelBrandInverse';

const meta: Meta<typeof SvgRoundelBrandInverse> = {
	title: 'React Components/SvgRoundelBrandInverse',
	component: SvgRoundelBrandInverse,
	argTypes: {
		width: {
			control: { type: 'range', min: 10, max: 600 },
		},
	},
};

export default meta;
type Story = StoryObj<typeof SvgRoundelBrandInverse>;

export const Default: Story = {};
