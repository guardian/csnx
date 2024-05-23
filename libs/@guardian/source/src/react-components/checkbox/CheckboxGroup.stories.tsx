import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { palette } from '../../foundations';
import { Checkbox } from './Checkbox';
import CheckboxStories from './Checkbox.stories';
import { CheckboxGroup } from './CheckboxGroup';
import type { ThemeCheckbox } from './theme';
import { themeCheckboxBrand, themeCheckboxGroupBrand } from './theme';

const meta: Meta<typeof CheckboxGroup> = {
	title: 'React Components/CheckboxGroup',
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

type CheckboxGroupPropsAndChildTheme = React.ComponentProps<
	typeof CheckboxGroup
> & {
	themeChild?: Partial<ThemeCheckbox>;
};

const Template: StoryFn<CheckboxGroupPropsAndChildTheme> = (
	args: CheckboxGroupPropsAndChildTheme,
) => {
	const [checked, setChecked] = useState(CheckboxStories.args?.checked);

	return (
		<CheckboxGroup {...args}>
			<Checkbox
				{...CheckboxStories.args}
				theme={args.themeChild}
				checked={checked}
				onChange={(e) => setChecked(e.target.checked)}
			/>
		</CheckboxGroup>
	);
};

export const DefaultDefaultTheme: StoryFn<CheckboxGroupPropsAndChildTheme> =
	Template.bind({});

// *****************************************************************************

export const DefaultBrandTheme: StoryFn<CheckboxGroupPropsAndChildTheme> =
	Template.bind({});
DefaultBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};
DefaultBrandTheme.args = {
	theme: themeCheckboxGroupBrand,
	themeChild: themeCheckboxBrand,
};

// *****************************************************************************

export const VisuallyHideLegendDefaultTheme: StoryFn<CheckboxGroupPropsAndChildTheme> =
	Template.bind({});
VisuallyHideLegendDefaultTheme.args = {
	hideLabel: true,
};

// *****************************************************************************

export const VisuallyHideLegendBrandTheme: StoryFn<CheckboxGroupPropsAndChildTheme> =
	Template.bind({});
VisuallyHideLegendBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};
VisuallyHideLegendBrandTheme.args = {
	hideLabel: true,
	theme: themeCheckboxGroupBrand,
	themeChild: themeCheckboxBrand,
};

// *****************************************************************************

export const SupportingTextDefaultTheme: StoryFn<CheckboxGroupPropsAndChildTheme> =
	Template.bind({});
SupportingTextDefaultTheme.args = {
	supporting: 'Pick the issues and topics that interest you',
};

// *****************************************************************************

export const OptionalDefaultTheme: StoryFn<CheckboxGroupPropsAndChildTheme> =
	Template.bind({});
OptionalDefaultTheme.args = {
	optional: true,
};

// *****************************************************************************

export const SupportingTextBrandTheme: StoryFn<CheckboxGroupPropsAndChildTheme> =
	Template.bind({});
SupportingTextBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};
SupportingTextBrandTheme.args = {
	supporting: 'Pick the issues and topics that interest you',
	theme: themeCheckboxGroupBrand,
	themeChild: themeCheckboxBrand,
};

// *****************************************************************************

export const ErrorDefaultTheme: StoryFn<CheckboxGroupPropsAndChildTheme> =
	Template.bind({});
ErrorDefaultTheme.args = {
	error: 'This newsletter is not available in your region',
};

// *****************************************************************************

export const ErrorBrandTheme: StoryFn<CheckboxGroupPropsAndChildTheme> =
	Template.bind({});
ErrorBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};
ErrorBrandTheme.args = {
	error: 'This newsletter is not available in your region',
	theme: themeCheckboxGroupBrand,
	themeChild: themeCheckboxBrand,
};

// *****************************************************************************

export const ErrorCustomTheme: StoryFn<CheckboxGroupPropsAndChildTheme> =
	Template.bind({});
ErrorCustomTheme.args = {
	error: 'This newsletter is not available in your region',
	theme: {
		textLabel: palette.neutral[86],
		textError: palette.error[500],
	},
	themeChild: {
		fillSelected: palette.brand[800],
		fillUnselected: palette.neutral[20],
		borderSelected: palette.brand[800],
		borderUnselected: palette.neutral[60],
		borderHover: palette.brand[800],
		borderError: palette.error[500],
		textLabel: palette.neutral[86],
	},
};
ErrorCustomTheme.parameters = {
	backgrounds: {
		default: 'background.inverse',
	},
};
