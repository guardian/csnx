import type { Meta, StoryObj } from '@storybook/react';
import { cryptic } from '../../stories/formats/cryptic';
import { progress } from '../../stories/formats/cryptic.progress';
import { defaultTheme as theme } from '../theme';
import { parseCrosswordData } from '../utils/parseCrosswordData';
import { Clues } from './Clues';

const meta: Meta<typeof Clues> = {
	component: Clues,
	title: 'Components/Clues',
	args: {
		entries: parseCrosswordData(cryptic).entries,
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

export const Default: Story = {};

export const Selected: Story = {
	args: {
		currentEntryId: cryptic.entries[0].id,
	},
};
