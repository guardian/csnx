import type { Meta, StoryObj } from '@storybook/react';
import { progress } from '../../stories/formats/solution-display.progress';
import type { CAPIEntry } from '../@types/CAPI';
import { ProgressContext } from '../context/ProgressContext';
import { ThemeContext } from '../context/ThemeContext';
import { defaultTheme } from '../theme';
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
	args: {
		entry: mockEntry,
		letters: '',
	},
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
		letters: '',
	},
};

export const TEST: Story = {
	args: {
		letters: 'test',
	},
};

export const twoXs: Story = {
	args: {
		letters: 'xx',
	},
};

export const fourXs: Story = {
	args: {
		letters: 'xxxx',
	},
};

export const OnlyGuessedLetters: Story = {
	args: {
		letters: 'ts',
	},
};

export const OneLetter: Story = {
	args: {
		letters: 'x',
	},
};
