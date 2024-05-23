import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import type { Meta, StoryFn } from '@storybook/react';
import type { QuoteIconProps } from './QuoteIcon';
import { QuoteIcon } from './QuoteIcon';

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
};

const meta: Meta<typeof QuoteIcon> = {
	title: 'React Components/QuoteIcon',
	component: QuoteIcon,
	argTypes: {
		format: {
			options: [
				'news',
				'sport',
				'culture',
				'lifestyle',
				'opinion',
				'special_report',
				'labs',
			],
			mapping: {
				news: { ...defaultFormat, theme: ArticlePillar.News },
				sport: { ...defaultFormat, theme: ArticlePillar.Sport },
				culture: { ...defaultFormat, theme: ArticlePillar.Culture },
				lifestyle: { ...defaultFormat, theme: ArticlePillar.Lifestyle },
				opinion: { ...defaultFormat, theme: ArticlePillar.Opinion },
				special_report: {
					...defaultFormat,
					theme: ArticleSpecial.SpecialReport,
				},
				labs: { ...defaultFormat, theme: ArticleSpecial.Labs },
			},
			control: { type: 'radio' },
		},
	},
};

export default meta;

const Template: StoryFn<typeof QuoteIcon> = (args: QuoteIconProps) => (
	<div>
		<QuoteIcon {...args} />
		<span>I look like a buffoon. I feel incredible. And then I vomit</span>
	</div>
);

// *****************************************************************************

export const News: StoryFn<typeof QuoteIcon> = Template.bind({});
News.args = {
	size: 'medium',
	// @ts-expect-error - Storybook maps 'news' to ArticlePillar.News
	format: 'news',
};

// *****************************************************************************

export const Sport: StoryFn<typeof QuoteIcon> = Template.bind({});
Sport.args = {
	size: 'medium',
	// @ts-expect-error - Storybook maps 'news' to ArticlePillar.Sport
	format: 'sport',
};

// *****************************************************************************

export const Culture: StoryFn<typeof QuoteIcon> = Template.bind({});
Culture.args = {
	size: 'medium',
	// @ts-expect-error - Storybook maps 'news' to ArticlePillar.Culture
	format: 'culture',
};

// *****************************************************************************

export const Lifestyle: StoryFn<typeof QuoteIcon> = Template.bind({});
Lifestyle.args = {
	size: 'medium',
	// @ts-expect-error - Storybook maps 'news' to ArticlePillar.Lifestyle
	format: 'lifestyle',
};

// *****************************************************************************

export const Opinion: StoryFn<typeof QuoteIcon> = Template.bind({});
Opinion.args = {
	size: 'medium',
	// @ts-expect-error - Storybook maps 'news' to ArticlePillar.Opinion
	format: 'opinion',
};

// *****************************************************************************

export const SpecialReport: StoryFn<typeof QuoteIcon> = Template.bind({});
SpecialReport.args = {
	size: 'medium',
	// @ts-expect-error - Storybook maps 'news' to ArticlePillar.SpecialReport
	format: 'special_report',
};

// *****************************************************************************

export const Labs: StoryFn<typeof QuoteIcon> = Template.bind({});
Labs.args = {
	size: 'medium',
	// @ts-expect-error - Storybook maps 'news' to ArticlePillar.Labs
	format: 'labs',
};

// *****************************************************************************

export const XSmall: StoryFn<typeof QuoteIcon> = Template.bind({});
XSmall.args = {
	size: 'xsmall',
	// @ts-expect-error - Storybook maps 'news' to ArticlePillar.News
	format: 'news',
};

// *****************************************************************************

export const Small: StoryFn<typeof QuoteIcon> = Template.bind({});
Small.args = {
	size: 'small',
	// @ts-expect-error - Storybook maps 'news' to ArticlePillar.News
	format: 'news',
};

// *****************************************************************************

export const Medium: StoryFn<typeof QuoteIcon> = Template.bind({});
Medium.args = {
	size: 'medium',
	// @ts-expect-error - Storybook maps 'news' to ArticlePillar.News
	format: 'news',
};

// *****************************************************************************

export const Large: StoryFn<typeof QuoteIcon> = Template.bind({});
Large.args = {
	size: 'large',
	// @ts-expect-error - Storybook maps 'news' to ArticlePillar.News
	format: 'news',
};
