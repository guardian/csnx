import type { Meta } from '@storybook/react';
import { type StoryObj } from '@storybook/react';
import { progress } from '../../stories/formats/word-wheel.progress';
import type { CAPIEntry } from '../@types/CAPI';
import { getAnagramHelperLetters } from '../utils/getProgressForEntry';
import { WordWheel } from './WordWheel';

const mockEntry: CAPIEntry = {
	humanNumber: '1',
	separatorLocations: { ',': [1] },
	id: '1-across',
	number: 1,
	clue: 'A test clue',
	solution: 'TESTING123',
	length: 10,
	group: ['1-across'],
	position: { x: 0, y: 0 },
	direction: 'across',
};

const meta: Meta<typeof WordWheel> = {
	component: WordWheel,
	title: 'Components/WordWheel',
	args: {},
};

export default meta;

type Story = StoryObj<typeof WordWheel>;

export const Default: Story = {
	args: {
		anagramHelperLetters: getAnagramHelperLetters(
			mockEntry,
			progress,
			'oliver',
		),
	},
};

export const ThreeLetters: Story = {
	args: {
		anagramHelperLetters: getAnagramHelperLetters(mockEntry, progress, 'oli'),
	},
};
export const FourLetters: Story = {
	args: {
		anagramHelperLetters: getAnagramHelperLetters(mockEntry, progress, 'oliv'),
	},
};
