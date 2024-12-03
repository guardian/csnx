import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { ContextProvider } from '../context/ContextProvider';
import { Controls } from './Controls';

const meta: Meta<typeof Controls> = {
	component: Controls,
	title: 'Components/Controls',
	args: {},
	decorators: [
		(Story) => {
			localStorage.removeItem(data.id);

			return (
				<ContextProvider data={data} selectedEntryId={data.entries[0].id}>
					<Story />
				</ContextProvider>
			);
		},
	],
};

export default meta;
type Story = StoryObj<typeof Controls>;

export const Default: Story = {};

export const WithAnagramHelperToggle: StoryFn = () => {
	return <Controls toggleAnagramHelper={() => {}} />;
};

export const NoSelectedEntry: Story = {
	decorators: [
		(Story) => {
			localStorage.removeItem(data.id);
			return (
				<ContextProvider data={data}>
					<Story />
				</ContextProvider>
			);
		},
	],
};

export const CustomLayout: StoryFn = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column-reverse',
				alignItems: 'flex-start',
				gap: 5,
			}}
		>
			<Controls />
		</div>
	);
};
