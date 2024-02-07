import { palette } from '@guardian/source-foundations';
import type { Meta, StoryFn } from '@storybook/react';
import { Option } from './Option';
import type { SelectProps } from './Select';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
	title: 'Select',
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
	args: {
		label: 'State',
		optional: false,
		hideLabel: false,
		supporting: '',
		error: 'undefined',
		success: 'undefined',
	},
};

export default meta;

const Template: StoryFn<typeof Select> = (args: SelectProps) => (
	<Select {...args}>
		<Option value="">Select a state</Option>
		<Option value="al">Alabama</Option>
		<Option value="ca">California</Option>
	</Select>
);

// *****************************************************************************

export const DefaultDefaultTheme: StoryFn<typeof Select> = Template.bind({});

// *****************************************************************************

export const VisuallyHideLabelDefaultTheme: StoryFn<typeof Select> =
	Template.bind({});
VisuallyHideLabelDefaultTheme.args = {
	hideLabel: true,
};

// *****************************************************************************

export const OptionalDefaultTheme: StoryFn<typeof Select> = Template.bind({});
OptionalDefaultTheme.args = {
	optional: true,
};

// *****************************************************************************

export const ErrorWithMessageDefaultTheme: StoryFn<typeof Select> =
	Template.bind({});
ErrorWithMessageDefaultTheme.args = {
	error: 'error',
};

// *****************************************************************************

export const SuccessWithMessageDefaultTheme: StoryFn<typeof Select> =
	Template.bind({});
SuccessWithMessageDefaultTheme.args = {
	success: 'success',
};

// *****************************************************************************

export const SupportingTextDefaultTheme: StoryFn<typeof Select> = Template.bind(
	{},
);
SupportingTextDefaultTheme.args = {
	supporting: 'Leave blank if you are not within the US',
};

// *****************************************************************************

export const SupportingSuccessTextDefaultTheme: StoryFn<typeof Select> =
	Template.bind({});
SupportingSuccessTextDefaultTheme.args = {
	supporting: 'Leave blank if you are not within the US',

	success: 'success',
};

// *****************************************************************************

export const SupportingErrorTextDefaultTheme: StoryFn<typeof Select> =
	Template.bind({});
SupportingErrorTextDefaultTheme.args = {
	supporting: 'Leave blank if you are not within the US',
	error:
		'Please select your home state. This service is unavailable outside of the US.',
};

// *****************************************************************************

export const CustomTheme: StoryFn<typeof Select> = Template.bind({});
CustomTheme.args = {
	theme: {
		textUserInput: palette.brandAlt[200],
		iconFill: palette.labs[400],
	},
};
