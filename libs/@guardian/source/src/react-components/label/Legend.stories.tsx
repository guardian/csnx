import type { Meta, StoryObj } from '@storybook/react';
import { palette } from '../../foundations';
import { Legend } from './Legend';
import { themeLabelBrand } from './theme';

const meta: Meta<typeof Legend> = {
	title: 'React Components/Legend',
	component: Legend,
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
};

export default meta;
type Story = StoryObj<typeof Legend>;

const LegendTemplate: Story = {
	render: (args) => (
		<fieldset>
			<Legend {...args} />
		</fieldset>
	),
};

export const DefaultDefaultTheme: Story = {
	...LegendTemplate,
	args: {
		text: 'Email',
		supporting: 'undefined',
		optional: false,
		hideLabel: false,
	},
};

export const WithSupportingTextDefaultTheme: Story = {
	...LegendTemplate,
	args: {
		...DefaultDefaultTheme.args,
		supporting: 'text',
	},
};

export const WithSupportingComponentDefaultTheme: Story = {
	...LegendTemplate,
	args: {
		...DefaultDefaultTheme.args,
		supporting: 'component',
	},
};

export const WithOptionalDefaultTheme: Story = {
	...LegendTemplate,
	args: {
		...DefaultDefaultTheme.args,
		optional: true,
	},
};

export const WithHiddenLabelDefaultTheme: Story = {
	...LegendTemplate,
	args: {
		...DefaultDefaultTheme.args,
		hideLabel: true,
	},
};

export const DefaultBrandTheme: Story = {
	...LegendTemplate,
	args: {
		...DefaultDefaultTheme.args,
		theme: themeLabelBrand,
	},
	parameters: {
		backgrounds: {
			default: 'brandBackground.primary',
		},
	},
};

export const WithSupportingTextBrandTheme: Story = {
	...LegendTemplate,
	args: {
		...DefaultBrandTheme.args,
		supporting: 'text',
	},
	parameters: {
		backgrounds: {
			default: 'brandBackground.primary',
		},
	},
};

export const WithSupportingComponentBrandTheme: Story = {
	...LegendTemplate,
	args: {
		...DefaultBrandTheme.args,
		supporting: 'component',
	},
	parameters: {
		backgrounds: {
			default: 'brandBackground.primary',
		},
	},
};

export const WithOptionalBrandTheme: Story = {
	...LegendTemplate,
	args: {
		...DefaultBrandTheme.args,
		optional: true,
	},
	parameters: {
		backgrounds: {
			default: 'brandBackground.primary',
		},
	},
};

export const WithHiddenLabelBrandTheme: Story = {
	...LegendTemplate,
	args: {
		...DefaultBrandTheme.args,
		hideLabel: true,
	},
	parameters: {
		backgrounds: {
			default: 'brandBackground.primary',
		},
	},
};

export const DefaultCustomTheme: Story = {
	...LegendTemplate,
	args: {
		...DefaultDefaultTheme.args,
		theme: {
			textLabel: palette.neutral[86],
		},
	},
	parameters: {
		backgrounds: {
			default: 'background.inverse',
		},
	},
};
