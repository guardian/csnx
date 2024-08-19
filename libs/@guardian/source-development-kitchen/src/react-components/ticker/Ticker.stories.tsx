import type { Meta, StoryFn } from '@storybook/react';
import type { TickerSettings } from './Ticker';
import { Ticker } from './Ticker';

const meta: Meta<typeof Ticker> = {
	component: Ticker,
	title: 'React Components/Ticker',
};

export default meta;

const Template: StoryFn<typeof Ticker> = (args: TickerSettings) => (
	<Ticker {...args} />
);

export const Default: StoryFn<typeof Ticker> = Template.bind({});
Default.args = {
	currencySymbol: '£',
	copy: {
		countLabel: 'Help us reach our end-of-year goal',
	},
	tickerData: {
		total: 50000,
		goal: 100000,
	},
};
