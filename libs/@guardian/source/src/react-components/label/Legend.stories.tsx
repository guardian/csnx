import type { Meta, StoryFn } from '@storybook/react';
import { palette } from '../../foundations';
import type { LegendProps } from './@types/LegendProps';
import { Legend } from './Legend';
import { labelThemeBrand } from './theme';

const meta: Meta<typeof Legend> = {
	title: 'React Components/Legend',
	args: {
		text: 'Email',
		supporting: 'undefined',
		optional: false,
		hideLabel: false,
	},
	argTypes: {
		supporting: {
			options: ['undefined', 'text', 'component'],
			mapping: {
				undefined: undefined,
				text: 'alex@example.com',
				component: (
					<span role="img" aria-label="Image of a letter">
						💌
					</span>
				),
			},
			control: { type: 'radio' },
		},
	},
	component: Legend,
};

export default meta;

const Template: StoryFn<typeof Legend> = (args: LegendProps) => (
	<fieldset>
		<Legend {...args} />
	</fieldset>
);

// *****************************************************************************

export const DefaultDefaultTheme: StoryFn<typeof Legend> = Template.bind({});

// *****************************************************************************

export const WithSupportingTextDefaultTheme: StoryFn<typeof Legend> =
	Template.bind({});
WithSupportingTextDefaultTheme.args = {
	supporting: 'text',
};

// *****************************************************************************

export const WithSupportingComponentDefaultTheme: StoryFn<typeof Legend> =
	Template.bind({});
WithSupportingComponentDefaultTheme.args = {
	supporting: 'component',
};

// *****************************************************************************

export const WithOptionalDefaultTheme: StoryFn<typeof Legend> = Template.bind(
	{},
);
WithOptionalDefaultTheme.args = {
	optional: true,
};

// *****************************************************************************

export const WithHiddenLabelDefaultTheme: StoryFn<typeof Legend> =
	Template.bind({});
WithHiddenLabelDefaultTheme.args = {
	hideLabel: true,
};

// *****************************************************************************

export const DefaultBrandTheme: StoryFn<typeof Legend> = Template.bind({});
DefaultBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: labelThemeBrand,
};

// *****************************************************************************

export const WithSupportingTextBrandTheme: StoryFn<typeof Legend> =
	Template.bind({});
WithSupportingTextBrandTheme.args = {
	supporting: 'text',
};
WithSupportingTextBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: labelThemeBrand,
};

// *****************************************************************************

export const WithSupportingComponentBrandTheme: StoryFn<typeof Legend> =
	Template.bind({});
WithSupportingComponentBrandTheme.args = {
	supporting: 'component',
};
WithSupportingComponentBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
	theme: labelThemeBrand,
};

// *****************************************************************************

export const WithOptionalBrandTheme: StoryFn<typeof Legend> = Template.bind({});
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

export const WithHiddenLabelBrandTheme: StoryFn<typeof Legend> = Template.bind(
	{},
);
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

export const DefaultCustomTheme: StoryFn<typeof Legend> = Template.bind({});
DefaultCustomTheme.args = {
	theme: {
		textLabel: palette.neutral[86],
	},
};
DefaultCustomTheme.parameters = {
	backgrounds: {
		default: 'background.inverse',
	},
};

// *****************************************************************************
