import type { Meta, StoryObj } from '@storybook/react-vite';
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

const Template: Story = {
	render: (args) => (
		<fieldset>
			<Legend {...args} />
		</fieldset>
	),
};

export const DefaultDefaultTheme: Story = {
	...Template,
	args: {
		text: 'Email',
		supporting: 'undefined',
		optional: false,
		hideLabel: false,
	},
};

export const WithSupportingTextDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		supporting: 'text',
	},
};

export const WithSupportingComponentDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		supporting: 'component',
	},
};

export const WithOptionalDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		optional: true,
	},
};

export const WithHiddenLabelDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		hideLabel: true,
	},
};

export const DefaultBrandTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		theme: themeLabelBrand,
	},
	globals: {
		backgrounds: {
			value: 'palette.brand[400]',
		},
	},
};

export const WithSupportingTextBrandTheme: Story = {
	...Template,
	args: {
		...DefaultBrandTheme.args,
		supporting: 'text',
	},
	globals: {
		backgrounds: {
			value: 'palette.brand[400]',
		},
	},
};

export const WithSupportingComponentBrandTheme: Story = {
	...Template,
	args: {
		...DefaultBrandTheme.args,
		supporting: 'component',
	},
	globals: {
		backgrounds: {
			value: 'palette.brand[400]',
		},
	},
};

export const WithOptionalBrandTheme: Story = {
	...Template,
	args: {
		...DefaultBrandTheme.args,
		optional: true,
	},
	globals: {
		backgrounds: {
			value: 'palette.brand[400]',
		},
	},
};

export const WithHiddenLabelBrandTheme: Story = {
	...Template,
	args: {
		...DefaultBrandTheme.args,
		hideLabel: true,
	},
	globals: {
		backgrounds: {
			value: 'palette.brand[400]',
		},
	},
};

export const DefaultCustomTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		theme: {
			textLabel: palette.neutral[86],
		},
	},
	globals: {
		backgrounds: {
			value: 'palette.neutral[10]',
		},
	},
};
