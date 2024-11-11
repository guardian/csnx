import type { Meta, StoryObj } from '@storybook/react';
import { cryptic } from '../../stories/formats/cryptic';
import { defaultTheme } from '../theme';
import { Crossword } from './Crossword';

const meta: Meta<typeof Crossword> = {
	component: Crossword,
	title: 'Components/Crossword',
	args: {
		theme: defaultTheme,
	},
};

export default meta;
type Story = StoryObj<typeof Crossword>;

export const Default: Story = {
	args: {
		data: cryptic,
	},
};
