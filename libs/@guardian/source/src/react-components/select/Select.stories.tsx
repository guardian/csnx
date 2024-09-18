import type { Meta, StoryObj } from '@storybook/react';
import { palette } from '../../foundations';
import { Option } from './Option';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
	title: 'React Components/Select',
	component: Select,
	argTypes: {
		error: {
			options: ['undefined', 'error'],
			mapping: {
				undefined: undefined,
				error:
					'Please select your home state. This service is unavailable outside of the US.',
			},
			control: { type: 'radio' },
		},
		success: {
			options: ['undefined', 'success'],
			mapping: {
				undefined: undefined,
				success: 'This service is available in your state',
			},
			control: { type: 'radio' },
		},
	},
};

export default meta;
type Story = StoryObj<typeof Select>;

const Template: Story = {
	render: (args) => (
		<Select {...args}>
			<Option value="">Select a state</Option>
			<Option value="al">Alabama</Option>
			<Option value="ca">California</Option>
		</Select>
	),
};

export const DefaultDefaultTheme: Story = {
	...Template,
	args: {
		label: 'State',
		optional: false,
		hideLabel: false,
		supporting: '',
		error: 'undefined',
		success: 'undefined',
	},
};

export const VisuallyHideLabelDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		hideLabel: true,
	},
};

export const OptionalDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		optional: true,
	},
};

export const ErrorWithMessageDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		error: 'error',
	},
};

export const SuccessWithMessageDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		success: 'success',
	},
};

export const SupportingTextDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		supporting: 'Leave blank if you are not within the US',
	},
};

export const SupportingSuccessTextDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		supporting: 'Leave blank if you are not within the US',
		success: 'success',
	},
};

export const SupportingErrorTextDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		supporting: 'Leave blank if you are not within the US',
		error:
			'Please select your home state. This service is unavailable outside of the US.',
	},
};

export const SupportingTextCustomTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		supporting: 'Leave blank if you are not within the US',
		theme: {
			textLabel: palette.neutral[86],
			textSupporting: palette.neutral[60],
			textUserInput: palette.neutral[86],
			iconFill: palette.neutral[86],
			border: palette.neutral[60],
			backgroundInput: palette.neutral[20],
		},
	},
	parameters: {
		backgrounds: {
			default: 'palette.neutral[10]',
		},
	},
};

export const ErrorWithMessageCustomTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		error: 'error',
		theme: {
			textLabel: palette.neutral[86],
			textError: palette.error[500],
			iconFill: palette.error[500],
			borderError: palette.error[500],
			backgroundInput: palette.neutral[20],
		},
	},
	parameters: {
		backgrounds: {
			default: 'palette.neutral[10]',
		},
	},
};
