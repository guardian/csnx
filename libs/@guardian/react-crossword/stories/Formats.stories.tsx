import type { Meta, StoryObj } from '@storybook/react';
import { Crossword } from '../src';
import { cryptic } from './formats/cryptic';
import { everyman } from './formats/everyman';
import { groupedClues } from './formats/grouped-clues';
import { prize } from './formats/prize';
import { quick } from './formats/quick';
import { quickCryptic } from './formats/quick-cryptic';
import { quiptic } from './formats/quiptic';
import { special } from './formats/special';
import { speedy } from './formats/speedy';
import { uneven } from './formats/uneven';
import { weekend } from './formats/weekend';

const meta: Meta<typeof Crossword> = {
	component: Crossword,
	title: 'Formats',
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

export const Uneven: Story = {
	args: { data: uneven },
};

export const GroupedClues: Story = {
	args: { data: groupedClues },
};
