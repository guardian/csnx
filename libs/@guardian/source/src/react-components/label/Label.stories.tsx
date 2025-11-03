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
	parameters: {
		backgrounds: {
			default: 'palette.brand[400]',
		},
	},
};

export const WithSupportingTextBrandTheme: Story = {
	...Template,
	args: {
		...DefaultBrandTheme.args,
		supporting: 'alex@example.com',
	},
	parameters: {
		backgrounds: {
			default: 'palette.brand[400]',
		},
	},
};

export const WithOptionalBrandTheme: Story = {
	...Template,
	args: {
		...DefaultBrandTheme.args,
		optional: true,
	},
	parameters: {
		backgrounds: {
			default: 'palette.brand[400]',
		},
	},
};

export const WithHiddenLabelBrandTheme: Story = {
	...Template,
	args: {
		...DefaultBrandTheme.args,
		hideLabel: true,
	},
	parameters: {
		backgrounds: {
			default: 'palette.brand[400]',
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
	parameters: {
		backgrounds: {
			default: 'palette.brand[400]',
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
	parameters: {
		backgrounds: {
			default: 'palette.brand[400]',
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
	parameters: {
		backgrounds: {
			default: 'palette.brand[400]',
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
	parameters: {
		backgrounds: {
			default: 'palette.neutral[10]',
		},
	},
};
