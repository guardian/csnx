import type { Meta, StoryFn } from '@storybook/react';
import type { SvgGuardianBestWebsiteLogoProps } from './SvgGuardianBestWebsiteLogo';
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

const Template: StoryFn<typeof SvgGuardianBestWebsiteLogo> = (
	args: SvgGuardianBestWebsiteLogoProps,
) => <SvgGuardianBestWebsiteLogo {...args} />;

export const Default: StoryFn<typeof SvgGuardianBestWebsiteLogo> =
	Template.bind({});
