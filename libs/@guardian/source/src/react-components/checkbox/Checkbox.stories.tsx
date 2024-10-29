import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { breakpoints, palette } from '../../foundations';
import { Checkbox } from './Checkbox';
import { themeCheckboxBrand } from './theme';

const meta: Meta<typeof Checkbox> = {
	title: 'React Components/Checkbox',
	component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const Template: Story = {
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks -- it _is_ actually a react function component
		const [checked, setChecked] = useState(args.checked);
		return (
			<Checkbox
				{...args}
				checked={checked}
				onChange={(e) => setChecked(e.target.checked)}
			/>
		);
	},
};

export const DefaultDefaultTheme: Story = {
	...Template,
	args: {
		label: 'The Guardian Today',
		checked: true,
		supporting: '',
	},
};

export const DefaultBrandTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		theme: themeCheckboxBrand,
	},
	parameters: {
		backgrounds: {
			default: 'palette.brand[400]',
		},
	},
};

export const SupportingTextDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		supporting: 'Supporting text',
	},
};

export const SupportingTextBrandTheme: Story = {
	...Template,
	args: {
		...DefaultBrandTheme.args,
		supporting: 'Supporting text',
	},
	parameters: {
		...DefaultBrandTheme.parameters,
	},
};

export const SupportingTextOnlyDefaultTheme: Story = {
	...Template,
	args: {
		...SupportingTextDefaultTheme.args,
		label: null,
	},
};

export const SupportingTextOnlyBrandTheme: Story = {
	...Template,
	args: {
		...SupportingTextBrandTheme.args,
		label: null,
	},
	parameters: {
		...SupportingTextBrandTheme.parameters,
	},
};

export const IndeterminateDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		checked: undefined,
		indeterminate: true,
	},
};

export const IndeterminateBrandTheme: Story = {
	...Template,
	args: {
		...DefaultBrandTheme.args,
		checked: undefined,
		indeterminate: true,
	},
	parameters: {
		...DefaultBrandTheme.parameters,
	},
};

export const UnlabelledDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		label: null,
		'aria-label': 'Checkbox',
	},
};

export const LongLabelMobileDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		label:
			'Circulation / Visitors / Audience (for News media, Magazine and Exhibition requests)',
	},
	parameters: {
		viewport: { defaultViewport: 'mobile' },
		chromatic: {
			viewports: [breakpoints.mobile],
		},
	},
};

export const DefaultCustomTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		theme: {
			fillSelected: palette.brand[800],
			fillUnselected: palette.neutral[20],
			borderSelected: palette.brand[800],
			borderUnselected: palette.neutral[60],
			borderHover: palette.brand[800],
			textLabel: palette.neutral[86],
		},
	},
	parameters: {
		backgrounds: {
			default: 'palette.neutral[10]',
		},
	},
};
