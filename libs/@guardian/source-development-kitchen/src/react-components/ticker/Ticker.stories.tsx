import type { Meta, StoryFn } from '@storybook/react';
import type { TickerSettings } from './Ticker';
import { Ticker } from './Ticker';

const meta: Meta<typeof Ticker> = {
	component: Ticker,
	title: 'React Components/Ticker',
};

const tickerStylingSettings = {
	progressBarBackgroundColour: '#E8E8E8',
	filledProgressColour: '#48d900',
	headlineColour: '#d30606',
	totalColour: '#d9bd3c',
	goalColour: '#005689',
};

export default meta;

const Template: StoryFn<typeof Ticker> = (args: TickerSettings) => (
	<Ticker {...args} />
);

export const HalfwayContributed: StoryFn<typeof Ticker> = Template.bind({});
HalfwayContributed.args = {
	currencySymbol: '£',
	copy: {},
	tickerData: {
		total: 50000,
		goal: 100000,
	},
	tickerStylingSettings,
	size: 'small',
};

export const SmallDonationsSoFar: StoryFn<typeof Ticker> = Template.bind({});
SmallDonationsSoFar.args = {
	currencySymbol: '£',
	copy: {
		headline: 'Help us reach our end-of-year goal',
	},
	tickerData: {
		total: 99,
		goal: 100000,
	},
	tickerStylingSettings,
	size: 'small',
};

export const ContributionGoalMet: StoryFn<typeof Ticker> = Template.bind({});
ContributionGoalMet.args = {
	currencySymbol: '£',
	copy: {
		headline: 'Help us reach our end-of-year goal',
	},
	tickerData: {
		total: 10000000,
		goal: 1000000,
	},
	tickerStylingSettings,
	size: 'small',
};

export const HalfwayContributedLarge: StoryFn<typeof Ticker> = Template.bind(
	{},
);
HalfwayContributedLarge.args = {
	currencySymbol: '£',
	copy: {},
	tickerData: {
		total: 50000,
		goal: 100000,
	},
	tickerStylingSettings,
	size: 'large',
};
