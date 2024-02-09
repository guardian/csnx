import { palette } from '@guardian/source-foundations';
import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';
import CheckboxStories from './Checkbox.stories';
import type { CheckboxGroupProps } from './CheckboxGroup';
import { CheckboxGroup } from './CheckboxGroup';
import { themeCheckboxBrand } from './theme';

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
	theme: themeCheckboxBrand,
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
	theme: themeCheckboxBrand,
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
	theme: themeCheckboxBrand,
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
	theme: themeCheckboxBrand,
};
ErrorBrandTheme.args = {
	error: 'This newsletter is not available in your region',
};

// *****************************************************************************

export const ErrorCustomTheme: StoryFn<typeof CheckboxGroup> = Template.bind(
	{},
);
ErrorCustomTheme.args = {
	theme: {
		textLabel: palette.sport[400],
		textError: palette.sport[400],
	},
	error: 'This newsletter is not available in your region',
};
