import type { Meta, StoryObj } from '@storybook/react';
import { ThemeContext } from '../context/ThemeContext';
import { defaultTheme } from '../theme';
import { SolutionDisplay } from './SolutionDisplay';

const meta: Meta<typeof SolutionDisplay> = {
	component: SolutionDisplay,
	title: 'Components/SolutionDisplay',
	args: {},
	decorators: [
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
		candidateLetters: ['T', 'E', '', ''],
		progressLetters: [
			{
				coords: { x: 0, y: 0 },
				progress: 'T',
				isTemporary: false,
				separator: ',',
			},
			{ coords: { x: 1, y: 0 }, progress: 'E', isTemporary: false },
			{
				coords: { x: 2, y: 0 },
				progress: 'S',
				isTemporary: false,
				separator: '-',
			},
			{ coords: { x: 3, y: 0 }, progress: '', isTemporary: false },
		],
		setCandidateLetters: () => {},
		setProgressLetters: () => {},
	},
};
