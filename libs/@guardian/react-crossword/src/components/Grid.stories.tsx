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
import { defaultTheme } from '../theme';
import { getCells } from '../utils/getCells';
import type { GridProps } from './Grid';
import { Grid } from './Grid';

const meta: Meta<typeof Grid> = {
	component: Grid,
	title: 'Grid',
};

export default meta;

const Template: StoryFn<typeof Grid> = (args: GridProps) => {
	return <Grid {...args} theme={defaultTheme} progress={[]} />;
};

export const Cryptic: StoryFn<typeof Grid> = Template.bind({});
Cryptic.args = {
	cells: getCells(cryptic),
	dimensions: cryptic.dimensions,
};

export const Everyman: StoryFn<typeof Grid> = Template.bind({});
Everyman.args = {
	cells: getCells(everyman),
	dimensions: everyman.dimensions,
};

export const Prize: StoryFn<typeof Grid> = Template.bind({});
Prize.args = {
	cells: getCells(prize),
	dimensions: prize.dimensions,
};

export const Quick: StoryFn<typeof Grid> = Template.bind({});
Quick.args = {
	cells: getCells(quick),
	dimensions: quick.dimensions,
};

export const QuickCryptic: StoryFn<typeof Grid> = Template.bind({});
QuickCryptic.args = {
	cells: getCells(quickCryptic),
	dimensions: quickCryptic.dimensions,
};

export const Quiptic: StoryFn<typeof Grid> = Template.bind({});
Quiptic.args = {
	cells: getCells(quiptic),
	dimensions: quiptic.dimensions,
};

export const Special: StoryFn<typeof Grid> = Template.bind({});
Special.args = {
	cells: getCells(special),
	dimensions: special.dimensions,
};

export const Speedy: StoryFn<typeof Grid> = Template.bind({});
Speedy.args = {
	cells: getCells(speedy),
	dimensions: speedy.dimensions,
};

export const Weekend: StoryFn<typeof Grid> = Template.bind({});
Weekend.args = {
	cells: getCells(weekend),
	dimensions: weekend.dimensions,
};
