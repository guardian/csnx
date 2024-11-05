import type { Meta, StoryFn } from '@storybook/react';
import { cryptic } from '../stories/cryptic';
import { everyman } from '../stories/everyman';
import { prize } from '../stories/prize';
import { quick } from '../stories/quick';
import { quickCryptic } from '../stories/quick-cryptic';
import { quiptic } from '../stories/quiptic';
import { special } from '../stories/special';
import { speedy } from '../stories/speedy';
import { weekend } from '../stories/weekend';
import { Crossword } from './Crossword';
import type { CrosswordProps } from './Crossword';

const meta: Meta<typeof Crossword> = {
	component: Crossword,
	title: 'Crossword',
};

export default meta;

const Template: StoryFn<typeof Crossword> = (args: CrosswordProps) => {
	return <Crossword {...args} />;
};

export const Cryptic: StoryFn<typeof Crossword> = Template.bind({});
Cryptic.args = { data: cryptic };

export const Everyman: StoryFn<typeof Crossword> = Template.bind({});
Everyman.args = { data: everyman };

export const Prize: StoryFn<typeof Crossword> = Template.bind({});
Prize.args = { data: prize };

export const Quick: StoryFn<typeof Crossword> = Template.bind({});
Quick.args = { data: quick };

export const QuickCryptic: StoryFn<typeof Crossword> = Template.bind({});
QuickCryptic.args = { data: quickCryptic };

export const Quiptic: StoryFn<typeof Crossword> = Template.bind({});
Quiptic.args = { data: quiptic };

export const Special: StoryFn<typeof Crossword> = Template.bind({});
Special.args = { data: special };

export const Speedy: StoryFn<typeof Crossword> = Template.bind({});
Speedy.args = { data: speedy };

export const Weekend: StoryFn<typeof Crossword> = Template.bind({});
Weekend.args = { data: weekend };
