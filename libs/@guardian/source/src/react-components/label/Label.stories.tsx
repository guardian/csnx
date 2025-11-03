import type { Meta, StoryObj } from '@storybook/react-vite';
import { palette } from '../../foundations';
import { Label } from './Label';
import { themeLabelBrand } from './theme';

const meta: Meta<typeof Label> = {
	title: 'React Components/Label',
	component: Label,
};

export default meta;
type Story = StoryObj<typeof Label>;

const Template: Story = {
	render: (args) => (
		<Label {...args}>
			<input type="email" />
		</Label>
	),
};

export const DefaultDefaultTheme: Story = {
	...Template,
	args: {
		text: 'Email',
		optional: false,
		hideLabel: false,
		size: 'medium',
	},
};

export const WithSupportingTextDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		supporting: 'alex@example.com',
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
		supporting: 'alex@example.com',
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

export const DefaultSmallDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		size: 'small',
	},
};

export const WithSupportingTextSmallDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		supporting: 'alex@example.com',
		size: 'small',
	},
};

export const WithOptionalSmallDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		optional: true,
		size: 'small',
	},
};

export const DefaultSmallBrandTheme: Story = {
	...Template,
	args: {
		...DefaultBrandTheme.args,
		size: 'small',
	},
	globals: {
		backgrounds: {
			value: 'palette.brand[400]',
		},
	},
};

export const WithSupportingTextSmallBrandTheme: Story = {
	...Template,
	args: {
		...DefaultBrandTheme.args,
		supporting: 'alex@example.com',
		size: 'small',
	},
	globals: {
		backgrounds: {
			value: 'palette.brand[400]',
		},
	},
};

export const WithOptionalSmallBrandTheme: Story = {
	...Template,
	args: {
		...DefaultBrandTheme.args,
		optional: true,
		size: 'small',
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
