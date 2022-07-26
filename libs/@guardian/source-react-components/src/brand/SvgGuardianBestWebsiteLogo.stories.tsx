import type { Story } from '@storybook/react';
import type { SvgGuardianBestWebsiteLogoProps } from './SvgGuardianBestWebsiteLogo';
import { SvgGuardianBestWebsiteLogo } from './SvgGuardianBestWebsiteLogo';

export default {
	title: 'SvgGuardianBestWebsiteLogo',
	component: SvgGuardianBestWebsiteLogo,
	argTypes: {
		width: {
			control: { type: 'range', min: 10, max: 600 },
		},
	},
};

const Template: Story = (args: SvgGuardianBestWebsiteLogoProps) => (
	<SvgGuardianBestWebsiteLogo {...args} />
);

export const Default = Template.bind({});
