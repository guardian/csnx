import type { Meta, StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { ContextProvider } from '../context/ContextProvider';
import { defaultTheme } from '../theme';
import { SolutionDisplay } from './SolutionDisplay';

const meta: Meta<typeof SolutionDisplay> = {
	component: SolutionDisplay,
	title: 'Components/SolutionDisplay',
	args: {},
	decorators: [
		(Story) => (
			<ContextProvider data={data} theme={defaultTheme}>
				<Story />
			</ContextProvider>
		),
	],
};

export default meta;

type Story = StoryObj<typeof SolutionDisplay>;

export const Default: Story = {
	args: {
		cellsWithProgress: [
			{
				x: 0,
				y: 0,
				progress: 'T',
				separator: ',',
			},
			{ x: 1, y: 0, progress: 'E' },
			{
				x: 2,
				y: 0,
				progress: 'S',
				separator: '-',
			},
			{ x: 3, y: 0, progress: '' },
		],
		shuffledLetters: ['T', 'E', 'S', 'T'],
	},
};
