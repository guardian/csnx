import type { Meta, StoryFn } from '@storybook/react';
import type { SvgRoundelBrandProps } from './SvgRoundelBrand';
import { SvgRoundelBrand } from './SvgRoundelBrand';

const meta: Meta<typeof SvgRoundelBrand> = {
	title: 'React Components/SvgRoundelBrand',
	component: SvgRoundelBrand,
	argTypes: {
		width: {
			control: { type: 'range', min: 10, max: 600 },
		},
	},
};

export default meta;

const Template: StoryFn<typeof SvgRoundelBrand> = (
	args: SvgRoundelBrandProps,
) => <SvgRoundelBrand {...args} />;

export const Default: StoryFn<typeof SvgRoundelBrand> = Template.bind({});
