import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { progress } from '../../stories/formats/grouped-clues.progress';
import { quick as quickData } from '../../stories/formats/quick';
import { Crossword } from './Crossword';

const meta: Meta<typeof Crossword> = {
	component: Crossword,
	title: 'Components/Crossword',
	args: {
		progress,
		data,
	},
};

export default meta;
type Story = StoryObj<typeof Crossword>;

export const Default: Story = {};

export const Themed: Story = {
	args: {
		background: 'red',
		foreground: 'blue',
		text: 'purple',
		gutter: 5,
		highlight: 'yellow',
		focus: 'limegreen',
		active: 'orange',
		cellSize: 30,
		buttonBackground: 'cyan',
		buttonBackgroundHover: 'magenta',
		border: 'brown',
		clueMinWidthRem: 20,
		clueMaxWidthRem: 30,
	},
};

export const MultiplePlayers: StoryFn = () => {
	return (
		<>
			<Crossword data={data} progress={[]} />
			<Crossword data={quickData} progress={[]} />
		</>
	);
};
