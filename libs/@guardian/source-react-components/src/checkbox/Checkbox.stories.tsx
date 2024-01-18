import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import type { CheckboxProps } from './Checkbox';
import { Checkbox } from './Checkbox';
import { checkboxThemeBrand } from './theme';

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

const Template: StoryFn<typeof Checkbox> = (args: CheckboxProps) => {
	const [checked, setChecked] = useState(args.checked);

	return (
		<Checkbox
			{...args}
			checked={checked}
			onChange={(e) => setChecked(e.target.checked)}
		/>
	);
};

export const DefaultDefaultTheme: StoryFn<typeof Checkbox> = Template.bind({});

// *****************************************************************************

export const DefaultBrandTheme: StoryFn<typeof Checkbox> = Template.bind({});
DefaultBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: checkboxThemeBrand,
};

// *****************************************************************************

export const SupportingTextDefaultTheme: StoryFn<typeof Checkbox> =
	Template.bind({});
SupportingTextDefaultTheme.args = {
	supporting: 'Supporting text',
};

// *****************************************************************************

export const SupportingTextBrandTheme: StoryFn<typeof Checkbox> = Template.bind(
	{},
);
SupportingTextBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: checkboxThemeBrand,
};
SupportingTextBrandTheme.args = {
	supporting: 'Supporting text',
};

// *****************************************************************************

export const SupportingTextOnlyDefaultTheme: StoryFn<typeof Checkbox> =
	Template.bind({});
SupportingTextOnlyDefaultTheme.args = {
	label: null,
	supporting: 'Supporting text',
};

// *****************************************************************************

export const SupportingTextOnlyBrandTheme: StoryFn<typeof Checkbox> =
	Template.bind({});
SupportingTextOnlyBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: checkboxThemeBrand,
};
SupportingTextOnlyBrandTheme.args = {
	label: null,
	supporting: 'Supporting text',
};

// *****************************************************************************

export const IndeterminateDefaultTheme: StoryFn<typeof Checkbox> =
	Template.bind({});
IndeterminateDefaultTheme.args = {
	checked: undefined,
	indeterminate: true,
};

// *****************************************************************************

export const IndeterminateBrandTheme: StoryFn<typeof Checkbox> = Template.bind(
	{},
);
IndeterminateBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: checkboxThemeBrand,
};
IndeterminateBrandTheme.args = {
	indeterminate: true,
};

// *****************************************************************************

export const UnlabelledDefaultTheme: StoryFn<typeof Checkbox> = Template.bind(
	{},
);
UnlabelledDefaultTheme.args = {
	label: null,
	'aria-label': 'Checkbox',
};
