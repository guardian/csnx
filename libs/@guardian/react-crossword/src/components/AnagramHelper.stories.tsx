import type { Meta, StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { ContextProvider } from '../context/ContextProvider';
import { parseCrosswordData } from '../utils/parseCrosswordData';
import { AnagramHelper } from './AnagramHelper';

const groupedCluesEntries = parseCrosswordData(data).entries;

const meta: Meta<typeof AnagramHelper> = {
	component: AnagramHelper,
	title: 'Components/Anagram Helper',
	args: {},
	decorators: [
		(Story) => (
			<ContextProvider data={data}>
				<Story />{' '}
			</ContextProvider>
		),
	],
};

export default meta;

type Story = StoryObj<typeof AnagramHelper>;

export const Default: Story = {
	args: {
		gridHeight: 500,
		gridWidth: 500,
		entries: groupedCluesEntries,
		entry: groupedCluesEntries.get('7-across'),
	},
};
