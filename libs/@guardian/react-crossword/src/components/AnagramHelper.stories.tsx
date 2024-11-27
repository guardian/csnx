import type { Meta, StoryObj } from '@storybook/react';
import { groupedClues } from '../../stories/formats/grouped-clues';
import { progress } from '../../stories/formats/grouped-clues.progress';
import { ProgressContext } from '../context/ProgressContext';
import { ThemeContext } from '../context/ThemeContext';
import { defaultTheme } from '../theme';
import { parseCrosswordData } from '../utils/parseCrosswordData';
import { AnagramHelper } from './AnagramHelper';

const groupedCluesEntries = parseCrosswordData(groupedClues).entries;

const meta: Meta<typeof AnagramHelper> = {
	component: AnagramHelper,
	title: 'Components/Anagram Helper',
	args: {},
	decorators: [
		(Story) => (
			<ProgressContext.Provider
				value={{
					progress,
					setProgress: () => {},
					updateProgress: () => {},
					clearProgress: () => {},
				}}
			>
				<Story />{' '}
			</ProgressContext.Provider>
		),
		(Story) => (
			<ThemeContext.Provider value={defaultTheme}>
				<Story />
			</ThemeContext.Provider>
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
