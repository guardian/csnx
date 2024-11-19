import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { palette } from '../../foundations';
import { Checkbox } from './Checkbox';
import * as CheckboxStories from './Checkbox.stories';
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

const Template: Story = {
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks -- it _is_ actually a react function component
		const [checked, setChecked] = useState(
			CheckboxStories.DefaultDefaultTheme.args?.checked,
		);
		return (
			<CheckboxGroup {...args}>
				<Checkbox
					{...CheckboxStories.DefaultDefaultTheme.args}
					theme={args.themeChild}
					checked={checked}
					onChange={(e) => setChecked(e.target.checked)}
				/>
			</CheckboxGroup>
		);
	},
};

export const DefaultDefaultTheme: Story = {
	...Template,
	args: {
		name: 'your-newsletters',
		label: 'Your newsletters',
		supporting: '',
		hideLabel: false,
		error: undefined,
	},
};

export const DefaultBrandTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		theme: themeCheckboxGroupBrand,
		themeChild: themeCheckboxBrand,
	},
	parameters: {
		backgrounds: {
			default: 'palette.brand[400]',
		},
	},
};

export const VisuallyHideLegendDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		hideLabel: true,
	},
};

export const VisuallyHideLegendBrandTheme: Story = {
	...Template,
	args: {
		...DefaultBrandTheme.args,
		hideLabel: true,
	},
	parameters: {
		...DefaultBrandTheme.parameters,
	},
};

export const SupportingTextDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		supporting: 'Pick the issues and topics that interest you',
	},
};

export const OptionalDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		optional: true,
	},
};

export const SupportingTextBrandTheme: Story = {
	...Template,
	args: {
		...DefaultBrandTheme.args,
		supporting: 'Pick the issues and topics that interest you',
	},
	parameters: {
		...DefaultBrandTheme.parameters,
	},
};

export const ErrorDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		error: 'This newsletter is not available in your region',
	},
};

export const ErrorBrandTheme: Story = {
	...Template,
	args: {
		...DefaultBrandTheme.args,
		error: 'This newsletter is not available in your region',
	},
	parameters: {
		...DefaultBrandTheme.parameters,
	},
};

export const ErrorCustomTheme: Story = {
	...Template,
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
			default: 'palette.neutral[10]',
		},
	},
};
