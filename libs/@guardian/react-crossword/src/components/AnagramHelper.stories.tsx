import type { Meta, StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { ContextProvider } from '../context/ContextProvider';
import { AnagramHelper } from './AnagramHelper';

const meta: Meta<typeof AnagramHelper> = {
	component: AnagramHelper,
	title: 'Components/Anagram Helper',
	decorators: [
		(Story) => (
			<ContextProvider data={data} selectedEntryId="12-across">
				<Story />
			</ContextProvider>
		),
	],
};

export default meta;

type Story = StoryObj<typeof AnagramHelper>;

export const Default: Story = {
	args: {},
};

export const LongClue: Story = {
	decorators: [
		(Story) => (
			<ContextProvider data={data} selectedEntryId="7-across">
				<Story />
			</ContextProvider>
		),
	],
};
