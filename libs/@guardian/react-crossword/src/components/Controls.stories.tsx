import type { Meta, StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { ContextProvider } from '../context/ContextProvider';
import { defaultTheme } from '../theme';
import { Controls } from './Controls';

const meta: Meta<typeof Controls> = {
	component: Controls,
	title: 'Components/Controls',
	args: {},
	decorators: [
		(Story) => {
			localStorage.removeItem(data.id);

			return (
				<ContextProvider
					data={data}
					theme={defaultTheme}
					selectedEntryId={data.entries[0]?.id}
				>
					<Story />
				</ContextProvider>
			);
		},
	],
};

export default meta;
type Story = StoryObj<typeof Controls>;

export const Default: Story = {};

export const NoSelectedEntry: Story = {
	decorators: [
		(Story) => {
			localStorage.removeItem(data.id);
			return (
				<ContextProvider data={data} theme={defaultTheme}>
					<Story />
				</ContextProvider>
			);
		},
	],
};
