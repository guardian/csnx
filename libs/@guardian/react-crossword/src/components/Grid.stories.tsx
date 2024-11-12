import type { Meta, StoryObj } from '@storybook/react';
import { cryptic } from '../../stories/formats/cryptic';
import { defaultTheme } from '../theme';
import { parseCrosswordData } from '../utils/getCells';
import { Grid } from './Grid';

const meta: Meta<typeof Grid> = {
	component: Grid,
	title: 'Components/Grid',
	args: {
		theme: defaultTheme,
		progress: [],
	},
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {
	args: {
		cells: parseCrosswordData(cryptic).cells,
		dimensions: cryptic.dimensions,
	},
};
