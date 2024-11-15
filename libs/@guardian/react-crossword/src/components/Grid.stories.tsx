import type { Meta, StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { progress } from '../../stories/formats/grouped-clues.progress';
import { separators as separatorData } from '../../stories/formats/separators';
import { ProgressContext } from '../context/ProgressContext';
import { ThemeContext } from '../context/ThemeContext';
import { defaultTheme } from '../theme';
import { parseCrosswordData } from '../utils/parseCrosswordData';
import { Grid } from './Grid';

const { cells, separators } = parseCrosswordData(data);

const meta: Meta<typeof Grid> = {
	component: Grid,
	title: 'Components/Grid',
	args: {
		cells,
		separators,
		dimensions: data.dimensions,
	},
	decorators: [
		(Story) => (
			<ProgressContext.Provider
				value={{
					progress,
					setProgress: () => {},
					updateProgress: () => {},
					clearProgress: () => {},
				}}
			>
				<Story />{' '}
			</ProgressContext.Provider>
		),
		(Story) => (
			<ThemeContext.Provider value={defaultTheme}>
				<Story />
			</ThemeContext.Provider>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {};

export const Progress: Story = {};

const { cells: separatorCells, separators: separatorSeparators } =
	parseCrosswordData(separatorData);

export const Separators: Story = {
	args: {
		cells: separatorCells,
		separators: separatorSeparators,
		dimensions: separatorData.dimensions,
	},
};
