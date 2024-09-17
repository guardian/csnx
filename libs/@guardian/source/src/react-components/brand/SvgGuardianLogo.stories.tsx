import type { Meta, StoryObj } from '@csnx/storybooks/react';
import { SvgGuardianLogo } from './SvgGuardianLogo';

const meta: Meta<typeof SvgGuardianLogo> = {
	title: 'React Components/SvgGuardianLogo',
	component: SvgGuardianLogo,
	argTypes: {
		width: {
			control: { type: 'range', min: 10, max: 600 },
		},
	},
};

export default meta;
type Story = StoryObj<typeof SvgGuardianLogo>;

export const Default: Story = {};
