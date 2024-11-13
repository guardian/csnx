import type { Meta, StoryObj } from '@storybook/react';
import { cryptic as data } from '../../stories/formats/cryptic';
import { progress } from '../../stories/formats/cryptic.progress';
import { defaultTheme as theme } from '../theme';
import { Crossword } from './Crossword';

const meta: Meta<typeof Crossword> = {
	component: Crossword,
	title: 'Components/Crossword',
	args: {
		theme,
		progress,
		data,
	},
};

export default meta;
type Story = StoryObj<typeof Crossword>;

export const Default: Story = {};
