import { palette } from '@guardian/source-foundations';
import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import type { CheckboxProps } from './Checkbox';
import { Checkbox } from './Checkbox';
import { themeCheckboxBrand } from './theme';

const meta: Meta<typeof Checkbox> = {
	title: 'Checkbox',
	component: Checkbox,
	argTypes: {},
	args: {
		label: 'The Guardian Today',
		checked: true,
		supporting: '',
	},
};

export default meta;
const Template: StoryFn<CheckboxProps> = (args: CheckboxProps) => {
	const [checked, setChecked] = useState(args.checked);

	return (
		<Checkbox
			{...args}
			checked={checked}
			onChange={(e) => setChecked(e.target.checked)}
		/>
	);
};

export const DefaultDefaultTheme: StoryFn = Template.bind({});

// *****************************************************************************

export const DefaultBrandTheme: StoryFn = Template.bind({});
DefaultBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};
DefaultBrandTheme.args = {
	theme: themeCheckboxBrand,
};

// *****************************************************************************

export const SupportingTextDefaultTheme: StoryFn = Template.bind({});
SupportingTextDefaultTheme.args = {
	supporting: 'Supporting text',
};

// *****************************************************************************

export const SupportingTextBrandTheme: StoryFn = Template.bind({});
SupportingTextBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};
SupportingTextBrandTheme.args = {
	supporting: 'Supporting text',
	theme: themeCheckboxBrand,
};

// *****************************************************************************

export const SupportingTextOnlyDefaultTheme: StoryFn = Template.bind({});
SupportingTextOnlyDefaultTheme.args = {
	label: null,
	supporting: 'Supporting text',
};

// *****************************************************************************

export const SupportingTextOnlyBrandTheme: StoryFn = Template.bind({});
SupportingTextOnlyBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};
SupportingTextOnlyBrandTheme.args = {
	label: null,
	supporting: 'Supporting text',
	theme: themeCheckboxBrand,
};

// *****************************************************************************

export const IndeterminateDefaultTheme: StoryFn = Template.bind({});
IndeterminateDefaultTheme.args = {
	checked: undefined,
	indeterminate: true,
};

// *****************************************************************************

export const IndeterminateBrandTheme: StoryFn = Template.bind({});
IndeterminateBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};
IndeterminateBrandTheme.args = {
	indeterminate: true,
	theme: themeCheckboxBrand,
};

// *****************************************************************************

export const UnlabelledDefaultTheme: StoryFn = Template.bind({});
UnlabelledDefaultTheme.args = {
	label: null,
	'aria-label': 'Checkbox',
};

// *****************************************************************************

export const DefaultCustomTheme: StoryFn<CheckboxProps> = Template.bind({});
DefaultCustomTheme.args = {
	theme: {
		fillSelected: palette.brand[800],
		fillUnselected: palette.neutral[20],
		borderSelected: palette.brand[800],
		borderUnselected: palette.neutral[60],
		borderHover: palette.brand[800],
		textLabel: palette.neutral[86],
	},
};
DefaultCustomTheme.parameters = {
	backgrounds: {
		default: 'background.inverse',
	},
};
