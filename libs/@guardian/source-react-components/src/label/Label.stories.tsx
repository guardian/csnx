import type { Story } from '@storybook/react';
// These types are the right types, but don't work with Storybook v6 which uses Emotion v10
// import type { Args, Story } from '@storybook/react';
import { Label } from './Label';
import { labelThemeBrand } from './theme';
import type { LabelProps } from './types';

export default {
	title: 'Label',
	args: {
		text: 'Email',
		optional: false,
		hideLabel: false,
		size: 'medium',
	},
	component: Label,
};

const Template: Story<LabelProps> = (args: LabelProps) => (
	<Label {...args}>
		<input type="email" />
	</Label>
);

// *****************************************************************************

export const DefaultDefaultTheme = Template.bind({});

// *****************************************************************************

export const WithSupportingTextDefaultTheme = Template.bind({});
WithSupportingTextDefaultTheme.args = {
	supporting: 'alex@example.com',
};

// *****************************************************************************

export const WithOptionalDefaultTheme = Template.bind({});
WithOptionalDefaultTheme.args = {
	optional: true,
};

// *****************************************************************************

export const WithHiddenLabelDefaultTheme = Template.bind({});
WithHiddenLabelDefaultTheme.args = {
	hideLabel: true,
};

// *****************************************************************************

export const DefaultBrandTheme = Template.bind({});
DefaultBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: labelThemeBrand,
};

// *****************************************************************************

export const WithSupportingTextBrandTheme = Template.bind({});
WithSupportingTextBrandTheme.args = {
	supporting: 'alex@example.com',
};
WithSupportingTextBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: labelThemeBrand,
};

// *****************************************************************************

export const WithOptionalBrandTheme = Template.bind({});
WithOptionalBrandTheme.args = {
	optional: true,
};
WithOptionalBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: labelThemeBrand,
};

// *****************************************************************************

export const WithHiddenLabelBrandTheme = Template.bind({});
WithHiddenLabelBrandTheme.args = {
	hideLabel: true,
};
WithHiddenLabelBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: labelThemeBrand,
};

// *****************************************************************************

export const DefaultSmallDefaultTheme = Template.bind({});
DefaultSmallDefaultTheme.args = {
	size: 'small',
};

// *****************************************************************************

export const WithSupportingTextSmallDefaultTheme = Template.bind({});
WithSupportingTextSmallDefaultTheme.args = {
	supporting: 'alex@example.com',
	size: 'small',
};

// *****************************************************************************

export const WithOptionalSmallDefaultTheme = Template.bind({});
WithOptionalSmallDefaultTheme.args = {
	optional: true,
	size: 'small',
};

// *****************************************************************************

export const DefaultSmallBrandTheme = Template.bind({});
DefaultSmallBrandTheme.args = {
	size: 'small',
};
DefaultSmallBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: labelThemeBrand,
};

// *****************************************************************************

export const WithSupportingTextSmallBrandTheme = Template.bind({});
WithSupportingTextSmallBrandTheme.args = {
	supporting: 'alex@example.com',
	size: 'small',
};
WithSupportingTextSmallBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: labelThemeBrand,
};

// *****************************************************************************

export const WithOptionalSmallBrandTheme = Template.bind({});
WithOptionalSmallBrandTheme.args = {
	optional: true,
	size: 'small',
};
WithOptionalSmallBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: labelThemeBrand,
};
