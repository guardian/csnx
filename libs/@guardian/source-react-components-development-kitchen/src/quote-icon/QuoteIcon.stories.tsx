import {
	ArticleDesign,
	ArticleDisplay,
	Pillar,
	ArticleSpecial,
} from '@guardian/libs';
import type { Story } from '@storybook/react';
import type { QuoteIconProps } from './QuoteIcon';
import { QuoteIcon } from './QuoteIcon';

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
};

export default {
	title: 'QuoteIcon',
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
				news: { ...defaultFormat, theme: Pillar.News },
				sport: { ...defaultFormat, theme: Pillar.Sport },
				culture: { ...defaultFormat, theme: Pillar.Culture },
				lifestyle: { ...defaultFormat, theme: Pillar.Lifestyle },
				opinion: { ...defaultFormat, theme: Pillar.Opinion },
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

const Template: Story<QuoteIconProps> = (args: QuoteIconProps) => (
	<div>
		<QuoteIcon {...args} />
		<span>I look like a buffoon. I feel incredible. And then I vomit</span>
	</div>
);

// *****************************************************************************

export const News = Template.bind({});
News.args = {
	size: 'medium',
	// @ts-expect-error - Storybook maps 'news' to Pillar.News
	format: 'news',
};

// *****************************************************************************

export const Sport = Template.bind({});
Sport.args = {
	size: 'medium',
	// @ts-expect-error - Storybook maps 'news' to Pillar.Sport
	format: 'sport',
};

// *****************************************************************************

export const Culture = Template.bind({});
Culture.args = {
	size: 'medium',
	// @ts-expect-error - Storybook maps 'news' to Pillar.Culture
	format: 'culture',
};

// *****************************************************************************

export const Lifestyle = Template.bind({});
Lifestyle.args = {
	size: 'medium',
	// @ts-expect-error - Storybook maps 'news' to Pillar.Lifestyle
	format: 'lifestyle',
};

// *****************************************************************************

export const Opinion = Template.bind({});
Opinion.args = {
	size: 'medium',
	// @ts-expect-error - Storybook maps 'news' to Pillar.Opinion
	format: 'opinion',
};

// *****************************************************************************

export const SpecialReport = Template.bind({});
SpecialReport.args = {
	size: 'medium',
	// @ts-expect-error - Storybook maps 'news' to Pillar.SpecialReport
	format: 'special_report',
};

// *****************************************************************************

export const Labs = Template.bind({});
Labs.args = {
	size: 'medium',
	// @ts-expect-error - Storybook maps 'news' to Pillar.Labs
	format: 'labs',
};

// *****************************************************************************

export const XSmall = Template.bind({});
XSmall.args = {
	size: 'xsmall',
	// @ts-expect-error - Storybook maps 'news' to Pillar.News
	format: 'news',
};

// *****************************************************************************

export const Small = Template.bind({});
Small.args = {
	size: 'small',
	// @ts-expect-error - Storybook maps 'news' to Pillar.News
	format: 'news',
};

// *****************************************************************************

export const Medium = Template.bind({});
Medium.args = {
	size: 'medium',
	// @ts-expect-error - Storybook maps 'news' to Pillar.News
	format: 'news',
};

// *****************************************************************************

export const Large = Template.bind({});
Large.args = {
	size: 'large',
	// @ts-expect-error - Storybook maps 'news' to Pillar.News
	format: 'news',
};
