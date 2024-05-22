import type { Meta, StoryFn } from '@storybook/react';
import type { SvgGuardianLogoProps } from './SvgGuardianLogo';
import { SvgGuardianLogo } from './SvgGuardianLogo';

const meta: Meta<typeof SvgGuardianLogo> = {
	title: 'SvgGuardianLogo',
	component: SvgGuardianLogo,
	argTypes: {
		width: {
			control: { type: 'range', min: 10, max: 600 },
		},
	},
};

export default meta;

const Template: StoryFn<typeof SvgGuardianLogo> = (
	args: SvgGuardianLogoProps,
) => <SvgGuardianLogo {...args} />;

export const Default: StoryFn<typeof SvgGuardianLogo> = Template.bind({});
