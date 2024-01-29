import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import type { TextAreaProps } from './TextArea';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
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

export default meta;

const Template: StoryFn<typeof TextArea> = (args: TextAreaProps) => {
	const [value, setValue] = useState(args.value);

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
		setValue(e.target.value);

	return <TextArea {...args} onChange={onChange} value={value} />;
};

// *****************************************************************************

export const DefaultDefaultTheme: StoryFn<typeof TextArea> = Template.bind({});

// *****************************************************************************

export const WithRowsDefaultTheme: StoryFn<typeof TextArea> = Template.bind({});
WithRowsDefaultTheme.args = {
	rows: 10,
};

// *****************************************************************************

export const OptionalDefaultTheme: StoryFn<typeof TextArea> = Template.bind({});
OptionalDefaultTheme.args = {
	optional: true,
};

// *****************************************************************************

export const VisuallyHideLabelDefaultTheme: StoryFn<typeof TextArea> =
	Template.bind({});
VisuallyHideLabelDefaultTheme.args = {
	hideLabel: true,
};

// *****************************************************************************

export const SupportingTextDefaultTheme: StoryFn<typeof TextArea> =
	Template.bind({});
SupportingTextDefaultTheme.args = {
	supporting:
		'Please keep comments respectful and abide by the community guidelines.',
};

// *****************************************************************************

export const ErrorWithMessageDefaultTheme: StoryFn<typeof TextArea> =
	Template.bind({});
ErrorWithMessageDefaultTheme.args = {
	error: 'error',
};

// *****************************************************************************

export const SuccessWithMessageDefaultTheme: StoryFn<typeof TextArea> =
	Template.bind({});
SuccessWithMessageDefaultTheme.args = {
	success: 'success',
};

// *****************************************************************************

export const WithMaxLengthDefaultTheme: StoryFn<typeof TextArea> =
	Template.bind({});
WithMaxLengthDefaultTheme.args = {
	maxLength: 10,
};

// *****************************************************************************

export const WithDefaultValue: StoryFn<typeof TextArea> = Template.bind({});
WithDefaultValue.args = {
	value: 'This is a value passed in as a prop',
};

// *****************************************************************************

export const DefaultSmallDefaultTheme: StoryFn<typeof TextArea> = Template.bind(
	{},
);
DefaultSmallDefaultTheme.args = {
	size: 'small',
};

// *****************************************************************************

export const WithRowsSmallDefaultTheme: StoryFn<typeof TextArea> =
	Template.bind({});
WithRowsSmallDefaultTheme.args = {
	rows: 10,
	size: 'small',
};

// *****************************************************************************

export const OptionalSmallDefaultTheme: StoryFn<typeof TextArea> =
	Template.bind({});
OptionalSmallDefaultTheme.args = {
	optional: true,
	size: 'small',
};

// *****************************************************************************

export const VisuallyHideLabelSmallDefaultTheme: StoryFn<typeof TextArea> =
	Template.bind({});
VisuallyHideLabelSmallDefaultTheme.args = {
	hideLabel: true,
	size: 'small',
};

// *****************************************************************************

export const SupportingTextSmallDefaultTheme: StoryFn<typeof TextArea> =
	Template.bind({});
SupportingTextSmallDefaultTheme.args = {
	supporting:
		'Please keep comments respectful and abide by the community guidelines.',
	size: 'small',
};

// *****************************************************************************

export const ErrorWithMessageSmallDefaultTheme: StoryFn<typeof TextArea> =
	Template.bind({});
ErrorWithMessageSmallDefaultTheme.args = {
	error: 'error',
	size: 'small',
};

// *****************************************************************************

export const SuccessWithMessageSmallDefaultTheme: StoryFn<typeof TextArea> =
	Template.bind({});
SuccessWithMessageSmallDefaultTheme.args = {
	success: 'success',
	size: 'small',
};

// *****************************************************************************
