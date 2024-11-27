import type { Meta, StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { progress } from '../../stories/formats/grouped-clues.progress';
import { ContextProvider } from '../context/ContextProvider';
import { Clues } from './Clues';

const meta: Meta<typeof Clues> = {
	component: Clues,
	title: 'Components/Clues',
	args: {
		direction: 'across',
	},
	decorators: [
		(Story) => (
			<ContextProvider data={data} progress={progress}>
				<Story />
			</ContextProvider>
		),
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
