import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';
import CheckboxStories from './Checkbox.stories';
import type { CheckboxGroupProps } from './CheckboxGroup';
import { CheckboxGroup } from './CheckboxGroup';
import { checkboxThemeBrand } from './theme';

const meta: Meta<typeof CheckboxGroup> = {
	title: 'CheckboxGroup',
	component: CheckboxGroup,
	argTypes: {},
	args: {
		name: 'your-newsletters',
		label: 'Your newsletters',
		supporting: '',
		hideLabel: false,
		error: undefined,
	},
};

export default meta;

const Template: StoryFn<typeof CheckboxGroup> = (args: CheckboxGroupProps) => {
	const [checked, setChecked] = useState(CheckboxStories.args?.checked);

	return (
		<CheckboxGroup {...args}>
			<Checkbox
				{...CheckboxStories.args}
				checked={checked}
				onChange={(e) => setChecked(e.target.checked)}
			/>
		</CheckboxGroup>
	);
};

export const DefaultDefaultTheme: StoryFn<typeof CheckboxGroup> = Template.bind(
	{},
);

// *****************************************************************************

export const DefaultBrandTheme: StoryFn<typeof CheckboxGroup> = Template.bind(
	{},
);
DefaultBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: checkboxThemeBrand,
};

// *****************************************************************************

export const VisuallyHideLegendDefaultTheme: StoryFn<typeof CheckboxGroup> =
	Template.bind({});
VisuallyHideLegendDefaultTheme.args = {
	hideLabel: true,
};

// *****************************************************************************

export const VisuallyHideLegendBrandTheme: StoryFn<typeof CheckboxGroup> =
	Template.bind({});
VisuallyHideLegendBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: checkboxThemeBrand,
};
VisuallyHideLegendBrandTheme.args = {
	hideLabel: true,
};

// *****************************************************************************

export const SupportingTextDefaultTheme: StoryFn<typeof CheckboxGroup> =
	Template.bind({});
SupportingTextDefaultTheme.args = {
	supporting: 'Pick the issues and topics that interest you',
};

// *****************************************************************************

export const OptionalDefaultTheme: StoryFn<typeof CheckboxGroup> =
	Template.bind({});
OptionalDefaultTheme.args = {
	optional: true,
};

// *****************************************************************************

export const SupportingTextBrandTheme: StoryFn<typeof CheckboxGroup> =
	Template.bind({});
SupportingTextBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: checkboxThemeBrand,
};
SupportingTextBrandTheme.args = {
	supporting: 'Pick the issues and topics that interest you',
};

// *****************************************************************************

export const ErrorDefaultTheme: StoryFn<typeof CheckboxGroup> = Template.bind(
	{},
);
ErrorDefaultTheme.args = {
	error: 'This newsletter is not available in your region',
};

// *****************************************************************************

export const ErrorBrandTheme: StoryFn<typeof CheckboxGroup> = Template.bind({});
ErrorBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: checkboxThemeBrand,
};
ErrorBrandTheme.args = {
	error: 'This newsletter is not available in your region',
};

// *****************************************************************************

export const MultiLineLabels: StoryFn<typeof CheckboxGroup> = (
	args: CheckboxGroupProps,
) => (
	<CheckboxGroup {...args}>
		<Checkbox label="The Guardian Today" />
		<Checkbox label="First Edition — Archie Bland and Nimo Omer take you through the top stories and what they mean, free every weekday morning" />
		<Checkbox label="Feast — A weekly email from Yotam Ottolenghi, Meera Sodha, Felicity Cloake and Rachel Roddy, featuring the latest recipes and seasonal eating ideas" />
		<Checkbox label="The Guide" />
		<Checkbox label="This is Europe" />
		<Checkbox label="What's On" />
		<Checkbox label="Techscape" />
	</CheckboxGroup>
);
