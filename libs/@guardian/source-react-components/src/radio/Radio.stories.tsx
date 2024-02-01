import type { Meta, StoryFn } from '@storybook/react';
import { Radio } from './Radio';
import type { RadioProps } from './Radio';
import { themeRadioBrand } from './theme';

const meta: Meta<typeof Radio> = {
	title: 'Radio',
	component: Radio,
	argTypes: {
		label: {
			control: {
				type: 'text',
			},
		},
		supporting: {
			control: {
				type: 'text',
			},
		},
		cssOverrides: {
			control: null,
		},
	},
	args: {
		label: 'Red',
		value: 'red',
		supporting: '',
		defaultChecked: true,
	},
};

export default meta;

const Template: StoryFn<typeof Radio> = (args: RadioProps) => (
	<Radio {...args} />
);

export const DefaultDefaultTheme: StoryFn<typeof Radio> = Template.bind({});

// *****************************************************************************

export const DefaultBrandTheme: StoryFn<typeof Radio> = Template.bind({});
DefaultBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};
DefaultBrandTheme.args = {
	theme: themeRadioBrand,
};

// *****************************************************************************

export const SupportingTextDefaultTheme: StoryFn<typeof Radio> = Template.bind(
	{},
);
SupportingTextDefaultTheme.args = {
	supporting: 'Hex colour code: #ff0000',
};

// *****************************************************************************

export const SupportingTextBrandTheme: StoryFn<typeof Radio> = Template.bind(
	{},
);
SupportingTextBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};
SupportingTextBrandTheme.args = {
	supporting: 'Hex colour code: #ff0000',
	theme: themeRadioBrand,
};

// *****************************************************************************

export const SupportingTextOnlyDefaultTheme: StoryFn<typeof Radio> =
	Template.bind({});
SupportingTextOnlyDefaultTheme.args = {
	supporting: 'Hex colour code: #ff0000',
	label: null,
};

// *****************************************************************************

export const SupportingTextOnlyBrandTheme: StoryFn<typeof Radio> =
	Template.bind({});
SupportingTextOnlyBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};
SupportingTextOnlyBrandTheme.args = {
	supporting: 'Hex colour code: #ff0000',
	label: null,
	theme: themeRadioBrand,
};

// *****************************************************************************

export const UnlabelledDefaultTheme: StoryFn<typeof Radio> = Template.bind({});
UnlabelledDefaultTheme.args = {
	label: undefined,
};
