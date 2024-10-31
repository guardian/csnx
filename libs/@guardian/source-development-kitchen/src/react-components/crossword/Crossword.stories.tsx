import type { Meta, StoryFn } from '@storybook/react';
import type { CrosswordProps } from './Crossword';
import { Crossword } from './Crossword';
import { cryptic } from './examples/cryptic';
import { everyman } from './examples/everyman';
import { prize } from './examples/prize';
import { quick } from './examples/quick';
import { quickCryptic } from './examples/quick-cryptic';
import { quiptic } from './examples/quiptic';
import { special } from './examples/special';
import { speedy } from './examples/speedy';
import { weekend } from './examples/weekend';

const meta: Meta<typeof Crossword> = {
	component: Crossword,
	title: 'React Components/Crossword',
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
