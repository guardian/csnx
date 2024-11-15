import type { Meta, StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { defaultTheme } from '../theme';
import { Clue } from './Clue';

const meta: Meta<typeof Clue> = {
	component: Clue,
	title: 'Components/Clue',
	args: {
		theme: defaultTheme,
		entry: data.entries[4],
	},
};

export default meta;
type Story = StoryObj<typeof Clue>;

export const Default: Story = {};

export const Complete: Story = {
	args: {
		isComplete: true,
	},
};

export const Highlighted: Story = {
	args: {
		isHighlighted: true,
	},
};

export const HighlightedAndComplete: Story = {
	args: {
		isHighlighted: true,
		isComplete: true,
	},
};

export const Active: Story = {
	args: {
		isHighlighted: true,
		isActive: true,
	},
};

export const ActiveAndComplete: Story = {
	args: {
		isHighlighted: true,
		isActive: true,
		isComplete: true,
	},
};
