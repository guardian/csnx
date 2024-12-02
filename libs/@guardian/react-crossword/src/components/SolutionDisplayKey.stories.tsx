import type { Meta, StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { ContextProvider } from '../context/ContextProvider';
import { SolutionDisplayKey } from './SolutionDisplayKey';

const meta: Meta<typeof SolutionDisplayKey> = {
	component: SolutionDisplayKey,
	title: 'Components/Solution Display Key',

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

type Story = StoryObj<typeof SolutionDisplayKey>;

export const Default: Story = {
	args: {},
};
