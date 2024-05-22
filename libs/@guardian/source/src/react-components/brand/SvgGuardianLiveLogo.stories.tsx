import type { Meta, StoryFn } from '@storybook/react';
import type { SvgGuardianLiveLogoProps } from './SvgGuardianLiveLogo';
import { SvgGuardianLiveLogo } from './SvgGuardianLiveLogo';

const meta: Meta<typeof SvgGuardianLiveLogo> = {
	title: 'SvgGuardianLiveLogo',
	component: SvgGuardianLiveLogo,
	argTypes: {
		width: {
			control: { type: 'range', min: 10, max: 600 },
		},
	},
};

export default meta;

const Template: StoryFn<typeof SvgGuardianLiveLogo> = (
	args: SvgGuardianLiveLogoProps,
) => <SvgGuardianLiveLogo {...args} />;

export const Default: StoryFn<typeof SvgGuardianLiveLogo> = Template.bind({});
