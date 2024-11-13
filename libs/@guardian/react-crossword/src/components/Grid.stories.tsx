import type { Meta, StoryObj } from '@storybook/react';
import { cryptic } from '../../stories/formats/cryptic';
import { progress } from '../../stories/formats/cryptic.progress';
import { defaultTheme } from '../theme';
import { parseCrosswordData } from '../utils/parseCrosswordData';
import { Grid } from './Grid';

const { cells, entries } = parseCrosswordData(cryptic);

const meta: Meta<typeof Grid> = {
	component: Grid,
	title: 'Components/Grid',
	args: {
		theme: defaultTheme,
		cells,
		entries,
		dimensions: cryptic.dimensions,
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
