import type { Meta, StoryObj } from '@storybook/react-vite';
import { PulseButton } from './PulseButton';

const meta: Meta<typeof PulseButton> = {
	title: 'React Components/Pulse Button',
	component: PulseButton,
};

export default meta;
type Story = StoryObj<typeof PulseButton>;

export const Default: Story = {
	args: {
		children: 'Subscribe now',
	},
};
