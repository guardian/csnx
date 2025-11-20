import type { Meta, StoryObj } from '@storybook/react-vite';
import { SvgGuardianBestWebsiteLogo } from './SvgGuardianBestWebsiteLogo';

const meta: Meta<typeof SvgGuardianBestWebsiteLogo> = {
	title: 'React Components/SvgGuardianBestWebsiteLogo',
	component: SvgGuardianBestWebsiteLogo,
	argTypes: {
		width: {
			control: { type: 'range', min: 10, max: 600 },
		},
	},
};

export default meta;
type Story = StoryObj<typeof SvgGuardianBestWebsiteLogo>;

export const Default: Story = {};
