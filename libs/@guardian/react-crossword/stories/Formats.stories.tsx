import type { Meta, StoryObj } from '@storybook/react';
import { Crossword } from '../src/index';
import { defaultTheme } from '../src/theme';
import { cryptic } from './formats/cryptic';
import { everyman } from './formats/everyman';
import { prize } from './formats/prize';
import { quick } from './formats/quick';
import { quickCryptic } from './formats/quick-cryptic';
import { quiptic } from './formats/quiptic';
import { special } from './formats/special';
import { speedy } from './formats/speedy';
import { weekend } from './formats/weekend';

const meta: Meta<typeof Crossword> = {
	component: Crossword,
	title: 'Formats',
	args: {
		theme: defaultTheme,
	},
};

export default meta;
type Story = StoryObj<typeof Crossword>;

export const Cryptic: Story = {
	args: { data: cryptic },
};

export const Everyman: Story = {
	args: { data: everyman },
};

export const Prize: Story = {
	args: { data: prize },
};

export const Quick: Story = {
	args: { data: quick },
};

export const QuickCryptic: Story = {
	args: { data: quickCryptic },
};

export const Quiptic: Story = {
	args: { data: quiptic },
};

export const Special: Story = {
	args: { data: special },
};

export const Speedy: Story = {
	args: { data: speedy },
};

export const Weekend: Story = {
	args: { data: weekend },
};
