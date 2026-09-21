import type { Meta, StoryObj } from '@storybook/react-vite';
import { PulseButton } from './PulseButton';
import { PulseProvider } from '@guardian/pulse';

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
	render: (args) => (
		<PulseProvider>
			<PulseButton {...args} />
		</PulseProvider>
	),
};

export const BrandsAndModes: Story = {
	args: {
		children: 'Subscribe now',
	},
	render: (args) => (
		<PulseProvider>
			<PulseButton {...args} />
			<PulseProvider brand="news">
				<PulseButton {...args} />
			</PulseProvider>
			<PulseProvider mode="dark">
				<PulseButton {...args} />
				<PulseProvider brand="news">
					<PulseButton {...args} />
				</PulseProvider>
			</PulseProvider>
		</PulseProvider>
	),
};
