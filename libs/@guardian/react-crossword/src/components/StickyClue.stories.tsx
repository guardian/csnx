import type { Meta } from '@storybook/react';
import { type StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { ContextProvider } from '../context/ContextProvider';
import { defaultTheme } from '../theme';
import { StickyClue } from './StickyClue';

const meta: Meta<typeof StickyClue> = {
	component: StickyClue,
	title: 'Components/StickyClue',
	args: {},
	decorators: [
		(Story) => (
			<ContextProvider
				data={data}
				theme={defaultTheme}
				selectedEntryId={'9-across'}
			>
				<Story />
			</ContextProvider>
		),
	],
};

export default meta;

type Story = StoryObj<typeof StickyClue>;

export const Across: Story = {
	args: {},
};

export const Down: Story = {
	args: {},
	decorators: [
		(Story) => (
			<ContextProvider
				data={data}
				theme={defaultTheme}
				selectedEntryId={'1-down'}
			>
				<Story />
			</ContextProvider>
		),
	],
};
