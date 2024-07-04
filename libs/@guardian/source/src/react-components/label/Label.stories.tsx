import type { StoryObj, Meta } from '@storybook/react';
import { palette } from '../../foundations';
import { Label } from './Label';
import { themeLabelBrand } from './theme';

const meta: Meta<typeof Label> = {
	title: 'React Components/Label',
	component: Label,
};

export default meta;
type Story = StoryObj<typeof Label>;

const LabelTemplate: Story = {
	render: (args) => (
		<Label {...args}>
			<input type="email" />
		</Label>
	),
};

export const DefaultDefaultTheme: Story = {
	...LabelTemplate,
	args: {
		text: 'Email',
		optional: false,
		hideLabel: false,
		size: 'medium',
	},
};

export const WithSupportingTextDefaultTheme: Story = {
	...LabelTemplate,
	args: {
		...DefaultDefaultTheme.args,
		supporting: 'alex@example.com',
	},
};

export const WithOptionalDefaultTheme: Story = {
	...LabelTemplate,
	args: {
		...DefaultDefaultTheme.args,
		optional: true,
	},
};

export const WithHiddenLabelDefaultTheme: Story = {
	...LabelTemplate,
	args: {
		...DefaultDefaultTheme.args,
		hideLabel: true,
	},
};

export const DefaultBrandTheme: Story = {
	...LabelTemplate,
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
	...LabelTemplate,
	args: {
		...DefaultBrandTheme.args,
		supporting: 'alex@example.com',
	},
	parameters: {
		backgrounds: {
			default: 'brandBackground.primary',
		},
	},
};

export const WithOptionalBrandTheme: Story = {
	...LabelTemplate,
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
	...LabelTemplate,
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

export const DefaultSmallDefaultTheme: Story = {
	...LabelTemplate,
	args: {
		...DefaultDefaultTheme.args,
		size: 'small',
	},
};

export const WithSupportingTextSmallDefaultTheme: Story = {
	...LabelTemplate,
	args: {
		...DefaultDefaultTheme.args,
		supporting: 'alex@example.com',
		size: 'small',
	},
};

export const WithOptionalSmallDefaultTheme: Story = {
	...LabelTemplate,
	args: {
		...DefaultDefaultTheme.args,
		optional: true,
		size: 'small',
	},
};

export const DefaultSmallBrandTheme: Story = {
	...LabelTemplate,
	args: {
		...DefaultBrandTheme.args,
		size: 'small',
	},
	parameters: {
		backgrounds: {
			default: 'brandBackground.primary',
		},
	},
};

export const WithSupportingTextSmallBrandTheme: Story = {
	...LabelTemplate,
	args: {
		...DefaultBrandTheme.args,
		supporting: 'alex@example.com',
		size: 'small',
	},
	parameters: {
		backgrounds: {
			default: 'brandBackground.primary',
		},
	},
};

export const WithOptionalSmallBrandTheme: Story = {
	...LabelTemplate,
	args: {
		...DefaultBrandTheme.args,
		optional: true,
		size: 'small',
	},
	parameters: {
		backgrounds: {
			default: 'brandBackground.primary',
		},
	},
};

export const DefaultCustomTheme: Story = {
	...LabelTemplate,
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
