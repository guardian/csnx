import type { Meta, StoryObj } from '@storybook/react';
import { cryptic } from '../../stories/formats/cryptic';
import { defaultTheme } from '../theme';
import { Clue } from './Clue';

const meta: Meta<typeof Clue> = {
	component: Clue,
	title: 'Components/Clue',
	args: {
		theme: defaultTheme,
	},
};

export default meta;
type Story = StoryObj<typeof Clue>;

export const Default: Story = {
	args: {
		entry: cryptic.entries[0],
	},
};

export const Selected: Story = {
	args: {
		entry: cryptic.entries[0],
		selected: true,
	},
};

export const Completed: Story = {
	args: {
		entry: cryptic.entries[0],
		complete: true,
	},
};

export const SelectedAndCompleted: Story = {
	args: {
		entry: cryptic.entries[0],
		selected: true,
		complete: true,
	},
};
