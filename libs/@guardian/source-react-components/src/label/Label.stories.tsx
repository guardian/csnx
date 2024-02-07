import type { Meta, StoryFn } from '@storybook/react';
import { Label } from './Label';
import { themeBrandLabel } from './theme';
import type { LabelProps } from './types';

const meta: Meta<typeof Label> = {
	title: 'Label',
	args: {
		text: 'Email',
		optional: false,
		hideLabel: false,
		size: 'medium',
	},
	component: Label,
};

export default meta;

const Template: StoryFn<typeof Label> = (args: LabelProps) => (
	<Label {...args}>
		<input type="email" />
	</Label>
);

// *****************************************************************************

export const DefaultDefaultTheme: StoryFn<typeof Label> = Template.bind({});

// *****************************************************************************

export const WithSupportingTextDefaultTheme: StoryFn<typeof Label> =
	Template.bind({});
WithSupportingTextDefaultTheme.args = {
	supporting: 'alex@example.com',
};

// *****************************************************************************

export const WithOptionalDefaultTheme: StoryFn<typeof Label> = Template.bind(
	{},
);
WithOptionalDefaultTheme.args = {
	optional: true,
};

// *****************************************************************************

export const WithHiddenLabelDefaultTheme: StoryFn<typeof Label> = Template.bind(
	{},
);
WithHiddenLabelDefaultTheme.args = {
	hideLabel: true,
};

// *****************************************************************************

export const DefaultBrandTheme: StoryFn<typeof Label> = Template.bind({});
DefaultBrandTheme.args = {
	theme: themeBrandLabel,
};
DefaultBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};

// *****************************************************************************

export const WithSupportingTextBrandTheme: StoryFn<typeof Label> =
	Template.bind({});
WithSupportingTextBrandTheme.args = {
	supporting: 'alex@example.com',
	theme: themeBrandLabel,
};
WithSupportingTextBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};

// *****************************************************************************

export const WithOptionalBrandTheme: StoryFn<typeof Label> = Template.bind({});
WithOptionalBrandTheme.args = {
	optional: true,
	theme: themeBrandLabel,
};
WithOptionalBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};

// *****************************************************************************

export const WithHiddenLabelBrandTheme: StoryFn<typeof Label> = Template.bind(
	{},
);
WithHiddenLabelBrandTheme.args = {
	hideLabel: true,
	theme: themeBrandLabel,
};
WithHiddenLabelBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};

// *****************************************************************************

export const DefaultSmallDefaultTheme: StoryFn<typeof Label> = Template.bind(
	{},
);
DefaultSmallDefaultTheme.args = {
	size: 'small',
};

// *****************************************************************************

export const WithSupportingTextSmallDefaultTheme: StoryFn<typeof Label> =
	Template.bind({});
WithSupportingTextSmallDefaultTheme.args = {
	supporting: 'alex@example.com',
	size: 'small',
};

// *****************************************************************************

export const WithOptionalSmallDefaultTheme: StoryFn<typeof Label> =
	Template.bind({});
WithOptionalSmallDefaultTheme.args = {
	optional: true,
	size: 'small',
};

// *****************************************************************************

export const DefaultSmallBrandTheme: StoryFn<typeof Label> = Template.bind({});
DefaultSmallBrandTheme.args = {
	size: 'small',
	theme: themeBrandLabel,
};
DefaultSmallBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};

// *****************************************************************************

export const WithSupportingTextSmallBrandTheme: StoryFn<typeof Label> =
	Template.bind({});
WithSupportingTextSmallBrandTheme.args = {
	supporting: 'alex@example.com',
	size: 'small',
	theme: themeBrandLabel,
};
WithSupportingTextSmallBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};

// *****************************************************************************

export const WithOptionalSmallBrandTheme: StoryFn<typeof Label> = Template.bind(
	{},
);
WithOptionalSmallBrandTheme.args = {
	optional: true,
	size: 'small',
	theme: themeBrandLabel,
};
WithOptionalSmallBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};
