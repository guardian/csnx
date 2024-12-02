import type { Meta, StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { ContextProvider } from '../context/ContextProvider';
import { SolutionDisplayCell } from './SolutionDisplayCell';

const meta: Meta<typeof SolutionDisplayCell> = {
	component: SolutionDisplayCell,
	title: 'Components/SolutionDisplayCell',

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

type Story = StoryObj<typeof SolutionDisplayCell>;

export const Default: Story = {
	args: {
		progressLetter: {
			coords: { x: 0, y: 0 },
			progress: 'T',
			isSaved: true,
		},
		progressValid: true,
	},
};

export const Temporary: Story = {
	args: {
		progressLetter: {
			coords: { x: 0, y: 0 },
			progress: 'T',
			isSaved: false,
		},
		progressValid: true,
	},
};

export const NotMatching: Story = {
	args: {
		progressLetter: {
			coords: { x: 0, y: 0 },
			progress: 'T',
			isSaved: true,
		},
		progressValid: false,
	},
};

export const TemporaryNotMatching: Story = {
	args: {
		progressLetter: {
			coords: { x: 0, y: 0 },
			progress: 'T',
			isSaved: false,
		},
		progressValid: false,
	},
};
