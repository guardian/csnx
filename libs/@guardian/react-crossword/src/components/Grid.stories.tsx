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
	rows: cryptic.dimensions.rows,
	cols: cryptic.dimensions.cols,
};

export const Everyman: StoryFn<typeof Grid> = Template.bind({});
Everyman.args = {
	cells: getCells(everyman),
	rows: everyman.dimensions.rows,
	cols: everyman.dimensions.cols,
};

export const Prize: StoryFn<typeof Grid> = Template.bind({});
Prize.args = {
	cells: getCells(prize),
	rows: prize.dimensions.rows,
	cols: prize.dimensions.cols,
};

export const Quick: StoryFn<typeof Grid> = Template.bind({});
Quick.args = {
	cells: getCells(quick),
	rows: quick.dimensions.rows,
	cols: quick.dimensions.cols,
};

export const QuickCryptic: StoryFn<typeof Grid> = Template.bind({});
QuickCryptic.args = {
	cells: getCells(quickCryptic),
	rows: quickCryptic.dimensions.rows,
	cols: quickCryptic.dimensions.cols,
};

export const Quiptic: StoryFn<typeof Grid> = Template.bind({});
Quiptic.args = {
	cells: getCells(quiptic),
	rows: quiptic.dimensions.rows,
	cols: quiptic.dimensions.cols,
};

export const Special: StoryFn<typeof Grid> = Template.bind({});
Special.args = {
	cells: getCells(special),
	rows: special.dimensions.rows,
	cols: special.dimensions.cols,
};

export const Speedy: StoryFn<typeof Grid> = Template.bind({});
Speedy.args = {
	cells: getCells(speedy),
	rows: speedy.dimensions.rows,
	cols: speedy.dimensions.cols,
};

export const Weekend: StoryFn<typeof Grid> = Template.bind({});
Weekend.args = {
	cells: getCells(weekend),
	rows: weekend.dimensions.rows,
	cols: weekend.dimensions.cols,
};
