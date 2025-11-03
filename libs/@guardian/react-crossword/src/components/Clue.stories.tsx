import type { Meta, StoryObj } from '@storybook/react-vite';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { ContextProvider } from '../context/ContextProvider';
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
			<ContextProvider data={data} theme={defaultTheme}>
				<Story />
			</ContextProvider>
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
		isConnected: true,
	},
};

export const HighlightedAndComplete: Story = {
	args: {
		isConnected: true,
		isComplete: true,
	},
};

export const Active: Story = {
	args: {
		isConnected: true,
		isSelected: true,
	},
};

export const ActiveAndComplete: Story = {
	args: {
		isConnected: true,
		isSelected: true,
		isComplete: true,
	},
};
