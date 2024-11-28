import type { Meta, StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { progress } from '../../stories/formats/grouped-clues.progress';
import { separators as separatorData } from '../../stories/formats/separators';
import { ContextProvider } from '../context/ContextProvider';
import { Grid } from './Grid';

const meta: Meta<typeof Grid> = {
	component: Grid,
	title: 'Components/Grid',
	decorators: [
		(Story) => (
			<ContextProvider data={data}>
				<Story />
			</ContextProvider>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {};

export const Progress: Story = {
	decorators: [
		(Story) => (
			<ContextProvider data={data} userProgress={progress}>
				<Story />
			</ContextProvider>
		),
	],
};

export const Separators: Story = {
	decorators: [
		(Story) => (
			<ContextProvider data={separatorData}>
				<Story />
			</ContextProvider>
		),
	],
};
