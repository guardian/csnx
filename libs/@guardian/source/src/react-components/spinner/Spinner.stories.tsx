import { palette } from '../../foundations';
import type { Meta, StoryObj } from '@csnx/storybooks/react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
	title: 'React Components/Spinner',
	component: Spinner,
	argTypes: {
		size: {
			options: ['xsmall', 'small', 'medium'],
			control: { type: 'select' },
		},
	},
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const XSmallSizeDefaultTheme: Story = {
	args: {
		size: 'xsmall',
	},
};

export const SmallSizeDefaultTheme: Story = {
	args: {
		size: 'small',
	},
};

export const MediumSizeDefaultTheme: Story = {
	args: {
		size: 'medium',
	},
};

export const CustomSizeDefaultTheme: Story = {
	args: {
		size: 40,
	},
};

export const CustomTheme: Story = {
	args: {
		theme: {
			background: 'transparent',
			color: palette.neutral[7],
		},
	},
};
