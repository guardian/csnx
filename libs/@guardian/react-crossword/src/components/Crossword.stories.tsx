import type { Meta, StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { progress } from '../../stories/formats/grouped-clues.progress';
import { defaultTheme as theme } from '../theme';
import { Crossword } from './Crossword';

const meta: Meta<typeof Crossword> = {
	component: Crossword,
	title: 'Components/Crossword',
	args: {
		theme,
		progress,
		data,
	},
};

export default meta;
type Story = StoryObj<typeof Crossword>;

export const Default: Story = {};
