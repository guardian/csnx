import type { Meta, StoryObj } from '@csnx/storybooks/react';
import { SvgGuardianLiveLogo } from './SvgGuardianLiveLogo';

const meta: Meta<typeof SvgGuardianLiveLogo> = {
	title: 'React Components/SvgGuardianLiveLogo',
	component: SvgGuardianLiveLogo,
	argTypes: {
		width: {
			control: { type: 'range', min: 10, max: 600 },
		},
	},
};

export default meta;
type Story = StoryObj<typeof SvgGuardianLiveLogo>;

export const Default: Story = {};
