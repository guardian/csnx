import type { Meta, StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { GenerateIdProvider } from '../context/GenerateIdContext';
import { ThemeContext } from '../context/ThemeContext';
import { defaultTheme } from '../theme';
import { Clue } from './Clue';

const meta: Meta<typeof Clue> = {
	component: Clue,
	title: 'Components/Clue',
	args: {
		entry: data.entries[4],
	},
	decorators: [
		(Story) => (
			<ThemeContext.Provider value={defaultTheme}>
				<Story />
			</ThemeContext.Provider>
		),
		(Story) => (
			<GenerateIdProvider id={data.id}>
				<Story />
			</GenerateIdProvider>
		),
	],
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
