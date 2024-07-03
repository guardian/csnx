import type { StoryObj, Meta } from '@storybook/react';
import { useState } from 'react';
import { palette } from '../../foundations';
import { Checkbox } from './Checkbox';
import { DefaultDefaultTheme as CheckboxDefaultTheme } from './Checkbox.stories';
import { CheckboxGroup } from './CheckboxGroup';
import type { ThemeCheckbox } from './theme';
import { themeCheckboxBrand, themeCheckboxGroupBrand } from './theme';

const meta: Meta<typeof CheckboxGroup> = {
	title: 'React Components/CheckboxGroup',
	component: CheckboxGroup,
};

export default meta;
type Story = StoryObj<
	React.ComponentProps<typeof CheckboxGroup> & {
		themeChild?: Partial<ThemeCheckbox>;
	}
>;

const CheckboxGroupTemplate: Story = {
	render: (args) => {
		const [checked, setChecked] = useState(CheckboxDefaultTheme.args?.checked);
		return (
			<CheckboxGroup {...args}>
				<Checkbox
					{...CheckboxDefaultTheme.args}
					theme={args.themeChild}
					checked={checked}
					onChange={(e) => setChecked(e.target.checked)}
				/>
			</CheckboxGroup>
		);
	},
};

export const DefaultDefaultTheme: Story = {
	...CheckboxGroupTemplate,
	args: {
		name: 'your-newsletters',
		label: 'Your newsletters',
		supporting: '',
		hideLabel: false,
		error: undefined,
	},
};

export const DefaultBrandTheme: Story = {
	...CheckboxGroupTemplate,
	args: {
		...DefaultDefaultTheme.args,
		theme: themeCheckboxGroupBrand,
		themeChild: themeCheckboxBrand,
	},
	parameters: {
		backgrounds: {
			default: 'brandBackground.primary',
		},
	},
};

export const VisuallyHideLegendDefaultTheme: Story = {
	...CheckboxGroupTemplate,
	args: {
		...DefaultDefaultTheme.args,
		hideLabel: true,
	},
};

export const VisuallyHideLegendBrandTheme: Story = {
	...CheckboxGroupTemplate,
	args: {
		...DefaultBrandTheme.args,
		hideLabel: true,
	},
	parameters: {
		...DefaultBrandTheme.parameters,
	},
};

export const SupportingTextDefaultTheme: Story = {
	...CheckboxGroupTemplate,
	args: {
		...DefaultDefaultTheme.args,
		supporting: 'Pick the issues and topics that interest you',
	},
};

export const OptionalDefaultTheme: Story = {
	...CheckboxGroupTemplate,
	args: {
		...DefaultDefaultTheme.args,
		optional: true,
	},
};

export const SupportingTextBrandTheme: Story = {
	...CheckboxGroupTemplate,
	args: {
		...DefaultBrandTheme.args,
		supporting: 'Pick the issues and topics that interest you',
	},
	parameters: {
		...DefaultBrandTheme.parameters,
	},
};

export const ErrorDefaultTheme: Story = {
	...CheckboxGroupTemplate,
	args: {
		...DefaultDefaultTheme.args,
		error: 'This newsletter is not available in your region',
	},
};

export const ErrorBrandTheme: Story = {
	...CheckboxGroupTemplate,
	args: {
		...DefaultBrandTheme.args,
		error: 'This newsletter is not available in your region',
	},
	parameters: {
		...DefaultBrandTheme.parameters,
	},
};

export const ErrorCustomTheme: Story = {
	...CheckboxGroupTemplate,
	args: {
		...DefaultDefaultTheme.args,
		error: 'This newsletter is not available in your region',
		theme: {
			textLabel: palette.neutral[86],
			textError: palette.error[500],
		},
		themeChild: {
			fillSelected: palette.brand[800],
			fillUnselected: palette.neutral[20],
			borderSelected: palette.brand[800],
			borderUnselected: palette.neutral[60],
			borderHover: palette.brand[800],
			borderError: palette.error[500],
			textLabel: palette.neutral[86],
		},
	},
	parameters: {
		backgrounds: {
			default: 'background.inverse',
		},
	},
};
