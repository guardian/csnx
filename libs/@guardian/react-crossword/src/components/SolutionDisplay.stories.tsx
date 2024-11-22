import type { Meta, StoryObj } from '@storybook/react';
import { progress } from '../../stories/formats/solution-display.progress';
import type { CAPIEntry } from '../@types/CAPI';
import { ProgressContext } from '../context/ProgressContext';
import { ThemeContext } from '../context/ThemeContext';
import { defaultTheme } from '../theme';
import { getAnagramHelperLetters } from '../utils/getProgressForEntry';
import { SolutionDisplay } from './SolutionDisplay';

const mockEntry: CAPIEntry = {
	humanNumber: '1',
	separatorLocations: { ',': [1] },
	id: '1-across',
	number: 1,
	clue: 'A test clue',
	solution: 'TEST',
	length: 4,
	group: ['1-across'],
	position: { x: 0, y: 0 },
	direction: 'across',
};

const meta: Meta<typeof SolutionDisplay> = {
	component: SolutionDisplay,
	title: 'Components/SolutionDisplay',
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

type Story = StoryObj<typeof SolutionDisplay>;

export const Default: Story = {
	args: {
		anagramHelperLetters: getAnagramHelperLetters(mockEntry, progress, ''),
	},
};

export const TEST: Story = {
	args: {
		anagramHelperLetters: getAnagramHelperLetters(mockEntry, progress, 'test'),
	},
};

export const twoXs: Story = {
	args: {
		anagramHelperLetters: getAnagramHelperLetters(mockEntry, progress, 'xx'),
	},
};

export const fourXs: Story = {
	args: {
		anagramHelperLetters: getAnagramHelperLetters(mockEntry, progress, 'xxxx'),
	},
};

export const OnlyGuessedLetters: Story = {
	args: {
		anagramHelperLetters: getAnagramHelperLetters(mockEntry, progress, 'tset'),
	},
};

export const OneLetter: Story = {
	args: {
		anagramHelperLetters: getAnagramHelperLetters(mockEntry, progress, 'x'),
	},
};
