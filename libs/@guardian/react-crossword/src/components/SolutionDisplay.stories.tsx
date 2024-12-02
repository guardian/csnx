import type { Meta, StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { ContextProvider } from '../context/ContextProvider';
import { SolutionDisplay } from './SolutionDisplay';

const meta: Meta<typeof SolutionDisplay> = {
	component: SolutionDisplay,
	title: 'Components/SolutionDisplay',
	args: {},
	decorators: [
		(Story) => (
			<ContextProvider data={data}>
				<Story />
			</ContextProvider>
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
				isSaved: true,
				separator: ',',
			},
			{ coords: { x: 1, y: 0 }, progress: 'E', isSaved: true },
			{
				coords: { x: 2, y: 0 },
				progress: 'S',
				isSaved: true,
				separator: '-',
			},
			{ coords: { x: 3, y: 0 }, progress: '', isSaved: true },
		],
		setCandidateLetters: () => {},
		setProgressLetters: () => {},
	},
};
