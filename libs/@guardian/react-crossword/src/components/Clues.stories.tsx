import type { Meta, StoryObj } from '@storybook/react';
import { cryptic } from '../../stories/formats/cryptic';
import { defaultTheme } from '../theme';
import { Clues } from './Clues';

const meta: Meta<typeof Clues> = {
	component: Clues,
	title: 'Components/Clues',
	args: {
		theme: defaultTheme,
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
		entries: cryptic.entries,
		direction: 'across',
	},
};

export const Selected: Story = {
	args: {
		entries: cryptic.entries,
		direction: 'across',
		currentEntryId: cryptic.entries[0].id,
	},
};
