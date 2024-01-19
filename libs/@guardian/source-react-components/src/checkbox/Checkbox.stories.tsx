import { palette } from '@guardian/source-foundations';
import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import type { CheckboxProps } from './Checkbox';
import { Checkbox } from './Checkbox';
import { checkboxBrandTheme } from './theme';

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
};
DefaultBrandTheme.args = {
	theme: checkboxBrandTheme,
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
};
SupportingTextBrandTheme.args = {
	supporting: 'Supporting text',
	theme: checkboxBrandTheme,
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
};
SupportingTextOnlyBrandTheme.args = {
	label: null,
	supporting: 'Supporting text',
	theme: checkboxBrandTheme,
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
};
IndeterminateBrandTheme.args = {
	indeterminate: true,
	theme: checkboxBrandTheme,
};

// *****************************************************************************

export const UnlabelledDefaultTheme: StoryFn<typeof Checkbox> = Template.bind(
	{},
);
UnlabelledDefaultTheme.args = {
	label: null,
	'aria-label': 'Checkbox',
};

export const CustomTheme: StoryFn<CheckboxProps> = Template.bind({});
CustomTheme.args = {
	theme: {
		background: palette.neutral[0],
		backgroundTick: palette.lifestyle[500],
		borderSelected: palette.lifestyle[500],
		borderHover: palette.lifestyle[400],
		textLabel: palette.lifestyle[400],
	},
};
