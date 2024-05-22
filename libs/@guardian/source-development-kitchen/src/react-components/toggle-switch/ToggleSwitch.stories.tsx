import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import {
	culture,
	labs,
	lifestyle,
	news,
	opinion,
	specialReport,
	sport,
} from '@guardian/source-foundations';
import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { ToggleSwitch } from './ToggleSwitch';
import type { ToggleSwitchProps } from './ToggleSwitch';

const decideBackgroundColor = (format?: ArticleFormat) => {
	if (format) {
		switch (format.theme) {
			case ArticlePillar.News:
				return news[200];
			case ArticlePillar.Culture:
				return culture[200];
			case ArticlePillar.Lifestyle:
				return lifestyle[300];
			case ArticlePillar.Sport:
				return sport[100];
			case ArticlePillar.Opinion:
				return opinion[200];
			case ArticleSpecial.Labs:
				return labs[200];
			case ArticleSpecial.SpecialReport:
				return specialReport[200];
			default:
				return news[200];
		}
	}
	return null;
};

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
};

const pillars = [
	ArticlePillar.News,
	ArticlePillar.Sport,
	ArticlePillar.Culture,
	ArticlePillar.Lifestyle,
	ArticlePillar.Opinion,
	ArticleSpecial.SpecialReport,
	ArticleSpecial.Labs,
];

const meta: Meta<typeof ToggleSwitch> = {
	title: 'ToggleSwitch',
	component: ToggleSwitch,
};

export default meta;

const PillarsTemplate: StoryFn<typeof ToggleSwitch> = (
	args: ToggleSwitchProps,
) => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
			`}
		>
			{pillars.map((pillar) => (
				<Template
					key={pillar}
					{...args}
					format={{ ...defaultFormat, theme: pillar }}
				/>
			))}
		</div>
	);
};

const Template: StoryFn<typeof ToggleSwitch> = (args: ToggleSwitchProps) => {
	const [checked, setChecked] = useState(args.checked);
	return (
		<div
			css={css`
				padding: 10px;
				margin: 10px 0;
				width: 350px;
				background-color: ${decideBackgroundColor(args.format)};
			`}
		>
			<ToggleSwitch
				{...args}
				checked={checked}
				onClick={() => {
					setChecked(!checked);
				}}
			/>
		</div>
	);
};

export const WithNoLabel: StoryFn<typeof ToggleSwitch> = Template.bind({});

// *****************************************************************************

export const WithLabel: StoryFn<typeof ToggleSwitch> = Template.bind({});
WithLabel.args = {
	label: 'Get alerts on this story',
};

// *****************************************************************************

export const WithLabelLeft: StoryFn<typeof ToggleSwitch> = Template.bind({});
WithLabelLeft.args = {
	label: 'Get alerts on this story',
	labelPosition: 'left',
};

// *****************************************************************************

export const WithBorder: StoryFn<typeof ToggleSwitch> = Template.bind({});
WithBorder.args = {
	label: 'Get alerts on this story',
	labelBorder: true,
};

// *****************************************************************************

export const WithFormat: StoryFn<typeof ToggleSwitch> = PillarsTemplate.bind(
	{},
);
WithFormat.args = {
	label: 'Get alerts on this story',
};

// *****************************************************************************

export const WithMediumFont: StoryFn<typeof ToggleSwitch> = Template.bind({});
WithMediumFont.args = {
	label: 'Get alerts on this story',
	fontSize: 'medium',
};

// *****************************************************************************

export const WithBoldFont: StoryFn<typeof ToggleSwitch> = Template.bind({});
WithBoldFont.args = {
	label: 'Get alerts on this story',
	fontWeight: 'bold',
};

// *****************************************************************************

export const WithBoldMediumFont: StoryFn<typeof ToggleSwitch> = Template.bind(
	{},
);
WithBoldMediumFont.args = {
	label: 'Get alerts on this story',
	fontWeight: 'bold',
	fontSize: 'medium',
};

// *****************************************************************************

export const WithMediumFontAndBorder: StoryFn<typeof ToggleSwitch> =
	Template.bind({});
WithMediumFontAndBorder.args = {
	label: 'Get alerts on this story',
	fontSize: 'medium',
	labelBorder: true,
};

// *****************************************************************************

export const WithBoldMediumFontAndBorder: StoryFn<typeof ToggleSwitch> =
	Template.bind({});
WithBoldMediumFontAndBorder.args = {
	label: 'Get alerts on this story',
	fontWeight: 'bold',
	fontSize: 'medium',
	labelBorder: true,
};
