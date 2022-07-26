import type { Story } from '@storybook/react';
import type { SvgGuardianLiveLogoProps } from './SvgGuardianLiveLogo';
import { SvgGuardianLiveLogo } from './SvgGuardianLiveLogo';

export default {
	title: 'SvgGuardianLiveLogo',
	component: SvgGuardianLiveLogo,
	argTypes: {
		width: {
			control: { type: 'range', min: 10, max: 600 },
		},
	},
};

const Template: Story = (args: SvgGuardianLiveLogoProps) => (
	<SvgGuardianLiveLogo {...args} />
);

export const Default = Template.bind({});
