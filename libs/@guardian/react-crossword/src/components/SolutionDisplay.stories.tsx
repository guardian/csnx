import type { Meta, StoryObj } from '@storybook/react';
import { progress } from '../../stories/formats/solution-display.progress';
import type { CAPIEntry } from '../@types/CAPI';
import { ProgressContext } from '../context/ProgressContext';
import { ThemeContext } from '../context/ThemeContext';
import { defaultTheme } from '../theme';
import { SolutionDisplay } from './SolutionDisplay';

const mockEntry: CAPIEntry = {
	humanNumber: '1',
	separatorLocations: { ',': [1], '-': [2] },
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
		entry: mockEntry,
		candidateLetters: ['T', 'E', '', ''],
		progressLetters: [
			{ coords: { x: 0, y: 0 }, progress: 'T', isTemporary: false },
			{ coords: { x: 1, y: 0 }, progress: 'E', isTemporary: false },
			{ coords: { x: 2, y: 0 }, progress: 'S', isTemporary: false },
			{ coords: { x: 3, y: 0 }, progress: '', isTemporary: false },
		],
		setCandidateLetters: () => {},
		setProgressLetters: () => {},
	},
};
