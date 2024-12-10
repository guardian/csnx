import type { Meta, StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { ContextProvider } from '../context/ContextProvider';
import { CandidateTile } from './CandidateTile';

const meta: Meta<typeof CandidateTile> = {
	component: CandidateTile,
	title: 'Components/Candidate Tile',
	decorators: [
		(Story) => (
			<ContextProvider data={data}>
				<Story />
			</ContextProvider>
		),
	],
};

export default meta;

type Story = StoryObj<typeof CandidateTile>;

export const Default: Story = {
	args: { candidate: 'A' },
};
