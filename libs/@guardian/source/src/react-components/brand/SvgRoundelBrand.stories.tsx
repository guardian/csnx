import type { Meta, StoryObj } from '@storybook/react-vite';
import { SvgRoundelBrand } from './SvgRoundelBrand';

const meta: Meta<typeof SvgRoundelBrand> = {
	title: 'React Components/SvgRoundelBrand',
	component: SvgRoundelBrand,
	argTypes: {
		width: {
			control: { type: 'range', min: 10, max: 600 },
		},
	},
};

export default meta;
type Story = StoryObj<typeof SvgRoundelBrand>;

export const Default: Story = {};
