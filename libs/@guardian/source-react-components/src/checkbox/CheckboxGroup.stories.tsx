import type { Story } from '@storybook/react';
import { Checkbox } from './Checkbox';
import type { CheckboxGroupProps } from './CheckboxGroup';
import { CheckboxGroup } from './CheckboxGroup';
import { checkboxThemeBrand } from './theme';

export default {
	title: 'CheckboxGroup',
	component: CheckboxGroup,
	subcomponents: { Checkbox },
	argTypes: {},
	args: {
		name: 'your-newsletters',
		label: 'Your newsletters',
		supporting: '',
		hideLabel: false,
		error: undefined,
	},
};

const Template: Story<CheckboxGroupProps> = (args: CheckboxGroupProps) => {
	return (
		<CheckboxGroup {...args}>
			<Checkbox label="The Guardian Today" />
			<Checkbox label="First Edition" />
			<Checkbox label="The Guide" />
		</CheckboxGroup>
	);
};

export const DefaultDefaultTheme = Template.bind({});

// *****************************************************************************

export const DefaultBrandTheme = Template.bind({});
DefaultBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: checkboxThemeBrand,
};

// *****************************************************************************

export const VisuallyHideLegendDefaultTheme = Template.bind({});
VisuallyHideLegendDefaultTheme.args = {
	hideLabel: true,
};

// *****************************************************************************

export const VisuallyHideLegendBrandTheme = Template.bind({});
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

export const SupportingTextDefaultTheme = Template.bind({});
SupportingTextDefaultTheme.args = {
	supporting: 'Pick the issues and topics that interest you',
};

// *****************************************************************************

export const OptionalDefaultTheme = Template.bind({});
OptionalDefaultTheme.args = {
	optional: true,
};

// *****************************************************************************

export const SupportingTextBrandTheme = Template.bind({});
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

export const ErrorDefaultTheme = Template.bind({});
ErrorDefaultTheme.args = {
	error: 'This newsletter is not available in your region',
};

// *****************************************************************************

export const ErrorBrandTheme = Template.bind({});
ErrorBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: checkboxThemeBrand,
};
ErrorBrandTheme.args = {
	error: 'This newsletter is not available in your region',
};
