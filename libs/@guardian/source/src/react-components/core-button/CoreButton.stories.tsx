import type { Meta, StoryObj } from '@storybook/react-vite';
import { CoreButton } from './CoreButton';

const meta: Meta<typeof CoreButton> = {
	title: 'React Components/Core Button',
	component: CoreButton,
};

export default meta;
type Story = StoryObj<typeof CoreButton>;

export const Default: Story = {
	args: {
		children: 'Subscribe now',
	},
};
