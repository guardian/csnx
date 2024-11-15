import type { Meta, StoryObj } from '@storybook/react';
import { groupedClues as data } from '../../stories/formats/grouped-clues';
import { progress } from '../../stories/formats/grouped-clues.progress';
import { separators as separatorData } from '../../stories/formats/separators';
import { defaultTheme as theme } from '../theme';
import { parseCrosswordData } from '../utils/parseCrosswordData';
import { Grid } from './Grid';

const { cells, separators } = parseCrosswordData(data);

const meta: Meta<typeof Grid> = {
	component: Grid,
	title: 'Components/Grid',
	args: {
		theme,
		cells,
		separators,
		dimensions: data.dimensions,
		progress: [],
	},
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {};

export const Progress: Story = {
	args: {
		progress,
	},
};

const { cells: separatorCells, separators: separatorSeparators } =
	parseCrosswordData(separatorData);

export const Separators: Story = {
	args: {
		cells: separatorCells,
		separators: separatorSeparators,
		dimensions: separatorData.dimensions,
	},
};
