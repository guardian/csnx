import type { Story } from '@storybook/react';
import { useState } from 'react';
import type { TextAreaProps } from './TextArea';
import { TextArea } from './TextArea';

export default {
	title: 'TextArea',
	component: TextArea,
	argTypes: {
		error: {
			options: ['undefined', 'error'],
			mapping: {
				undefined: undefined,
				error: 'Please tell us your views',
			},
			control: { type: 'radio' },
		},
		success: {
			options: ['undefined', 'success'],
			mapping: {
				undefined: undefined,
				success: 'Thanks for telling us your views',
			},
			control: { type: 'radio' },
		},
	},
	args: {
		label: 'Comments',
		optional: false,
		hideLabel: false,
		supporting: '',
		size: 'medium',
		error: 'undefined',
		success: 'undefined',
	},
};

const Template: Story<TextAreaProps> = (args: TextAreaProps) => {
	const [value, setValue] = useState(args.value);

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
		setValue(e.target.value);

	return <TextArea {...args} onChange={onChange} value={value} />;
};

// *****************************************************************************

export const DefaultDefaultTheme = Template.bind({});

// *****************************************************************************

export const WithRowsDefaultTheme = Template.bind({});
WithRowsDefaultTheme.args = {
	rows: 10,
};

// *****************************************************************************

export const OptionalDefaultTheme = Template.bind({});
OptionalDefaultTheme.args = {
	optional: true,
};

// *****************************************************************************

export const VisuallyHideLabelDefaultTheme = Template.bind({});
VisuallyHideLabelDefaultTheme.args = {
	hideLabel: true,
};

// *****************************************************************************

export const SupportingTextDefaultTheme = Template.bind({});
SupportingTextDefaultTheme.args = {
	supporting:
		'Please keep comments respectful and abide by the community guidelines.',
};

// *****************************************************************************

export const ErrorWithMessageDefaultTheme = Template.bind({});
ErrorWithMessageDefaultTheme.args = {
	error: 'error',
};

// *****************************************************************************

export const SuccessWithMessageDefaultTheme = Template.bind({});
SuccessWithMessageDefaultTheme.args = {
	success: 'success',
};

// *****************************************************************************

export const WithMaxLengthDefaultTheme = Template.bind({});
WithMaxLengthDefaultTheme.args = {
	maxLength: 10,
};

// *****************************************************************************

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
	value: 'This is a value passed in as a prop',
};

// *****************************************************************************

export const DefaultSmallDefaultTheme = Template.bind({});
DefaultSmallDefaultTheme.args = {
	size: 'small',
};

// *****************************************************************************

export const WithRowsSmallDefaultTheme = Template.bind({});
WithRowsSmallDefaultTheme.args = {
	rows: 10,
	size: 'small',
};

// *****************************************************************************

export const OptionalSmallDefaultTheme = Template.bind({});
OptionalSmallDefaultTheme.args = {
	optional: true,
	size: 'small',
};

// *****************************************************************************

export const VisuallyHideLabelSmallDefaultTheme = Template.bind({});
VisuallyHideLabelSmallDefaultTheme.args = {
	hideLabel: true,
	size: 'small',
};

// *****************************************************************************

export const SupportingTextSmallDefaultTheme = Template.bind({});
SupportingTextSmallDefaultTheme.args = {
	supporting:
		'Please keep comments respectful and abide by the community guidelines.',
	size: 'small',
};

// *****************************************************************************

export const ErrorWithMessageSmallDefaultTheme = Template.bind({});
ErrorWithMessageSmallDefaultTheme.args = {
	error: 'error',
	size: 'small',
};

// *****************************************************************************

export const SuccessWithMessageSmallDefaultTheme = Template.bind({});
SuccessWithMessageSmallDefaultTheme.args = {
	success: 'success',
	size: 'small',
};

// *****************************************************************************
