import type { Meta, StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { progress } from '../../stories/formats/grouped-clues.progress';
import { defaultTheme as theme } from '../theme';
import { parseCrosswordData } from '../utils/parseCrosswordData';
import { Clues } from './Clues';

const meta: Meta<typeof Clues> = {
	component: Clues,
	title: 'Components/Clues',
	args: {
		entries: parseCrosswordData(data).entries,
		direction: 'across',
		theme,
		progress,
	},
	decorators: [
		(Story) => (
			<div role="application">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Clues>;

export const Default: Story = {
	args: {
		currentEntryId: data.entries[0].id,
	},
};
