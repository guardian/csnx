import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { TextInput } from './TextInput';
import type { TextInputProps } from './TextInput';
import { palette } from '@guardian/source-foundations';

const meta: Meta<typeof TextInput> = {
	title: 'TextInput',
	component: TextInput,
	args: {
		label: 'Email',
		optional: false,
		hideLabel: false,
		supporting: '',
		size: 'medium',
		error: 'undefined',
		success: 'undefined',
	},
	argTypes: {
		error: {
			options: ['undefined', 'error'],
			mapping: {
				undefined: undefined,
				error: 'The email address entered is not valid',
			},
			control: { type: 'radio' },
		},
		success: {
			options: ['undefined', 'success'],
			mapping: {
				undefined: undefined,
				success: 'Your email address has been registered successfully',
			},
			control: { type: 'radio' },
		},
		id: { control: null },
	},
};

export default meta;

const Template: StoryFn<typeof TextInput> = (args: TextInputProps) => {
	const [state, setState] = useState('');
	return (
		<TextInput
			{...args}
			value={state}
			onChange={(event) => setState(event.target.value)}
		/>
	);
};

export const DefaultDefaultTheme: StoryFn<typeof TextInput> = Template.bind({});

// *****************************************************************************

export const OptionalDefaultTheme: StoryFn<typeof TextInput> = Template.bind(
	{},
);
OptionalDefaultTheme.args = {
	optional: true,
};

// *****************************************************************************

export const HideLabelDefaultTheme: StoryFn<typeof TextInput> = Template.bind(
	{},
);
HideLabelDefaultTheme.args = {
	hideLabel: true,
};

// *****************************************************************************

export const SupportingTextDefaultTheme: StoryFn<typeof TextInput> =
	Template.bind({});
SupportingTextDefaultTheme.args = {
	supporting: 'alex@example.com',
};

// *****************************************************************************

export const Width30DefaultTheme: StoryFn<typeof TextInput> = Template.bind({});
Width30DefaultTheme.args = {
	width: 30,
	label: 'First name',
};

// *****************************************************************************

export const Width10DefaultTheme: StoryFn<typeof TextInput> = Template.bind({});
Width10DefaultTheme.args = {
	width: 10,
	label: 'Postcode',
};

// *****************************************************************************

export const Width4DefaultTheme: StoryFn<typeof TextInput> = Template.bind({});
Width4DefaultTheme.args = {
	width: 4,
	label: 'Year of birth',
};

// *****************************************************************************

export const ErrorWithMessageDefaultTheme: StoryFn<typeof TextInput> =
	Template.bind({});
ErrorWithMessageDefaultTheme.args = {
	error: 'error',
};

// *****************************************************************************

export const SuccessWithMessageDefaultTheme: StoryFn<typeof TextInput> =
	Template.bind({});
SuccessWithMessageDefaultTheme.args = {
	success: 'success',
};

// *****************************************************************************

export const ConstraintDefaultTheme: StoryFn<typeof TextInput> = Template.bind(
	{},
);
ConstraintDefaultTheme.args = {
	label: 'Phone number',
	pattern: '[0-9]{1,11}',
	title: '11 digit phone number',
	type: 'tel',
};

// *****************************************************************************

export const DefaultSmallDefaultTheme: StoryFn<typeof TextInput> =
	Template.bind({});
DefaultSmallDefaultTheme.args = {
	size: 'small',
};

// *****************************************************************************

export const OptionalSmallDefaultTheme: StoryFn<typeof TextInput> =
	Template.bind({});
OptionalSmallDefaultTheme.args = {
	optional: true,
	size: 'small',
};

// *****************************************************************************

export const HideLabelSmallDefaultTheme: StoryFn<typeof TextInput> =
	Template.bind({});
HideLabelSmallDefaultTheme.args = {
	hideLabel: true,
	size: 'small',
};

// *****************************************************************************

export const SupportingTextSmallDefaultTheme: StoryFn<typeof TextInput> =
	Template.bind({});
SupportingTextSmallDefaultTheme.args = {
	supporting: 'alex@example.com',
	size: 'small',
};

// *****************************************************************************

export const Width30SmallDefaultTheme: StoryFn<typeof TextInput> =
	Template.bind({});
Width30SmallDefaultTheme.args = {
	width: 30,
	label: 'First name',
	size: 'small',
};

// *****************************************************************************

export const Width10SmallDefaultTheme: StoryFn<typeof TextInput> =
	Template.bind({});
Width10SmallDefaultTheme.args = {
	width: 10,
	label: 'Postcode',
	size: 'small',
};

// *****************************************************************************

export const Width4SmallDefaultTheme: StoryFn<typeof TextInput> = Template.bind(
	{},
);
Width4SmallDefaultTheme.args = {
	width: 4,
	label: 'Year of birth',
	size: 'small',
};

// *****************************************************************************

export const ErrorWithMessageSmallDefaultTheme: StoryFn<typeof TextInput> =
	Template.bind({});
ErrorWithMessageSmallDefaultTheme.args = {
	error: 'error',
	size: 'small',
};

// *****************************************************************************

export const SuccessWithMessageSmallDefaultTheme: StoryFn<typeof TextInput> =
	Template.bind({});
SuccessWithMessageSmallDefaultTheme.args = {
	success: 'success',
	size: 'small',
};

// *****************************************************************************

export const ConstraintSmallDefaultTheme: StoryFn<typeof TextInput> =
	Template.bind({});
ConstraintSmallDefaultTheme.args = {
	label: 'Phone number',
	pattern: '[0-9]{1,11}',
	title: '11 digit phone number',
	type: 'tel',
	size: 'small',
};
// *****************************************************************************

export const ErrorWithMessageCustomTheme: StoryFn<typeof TextInput> =
	Template.bind({});
ErrorWithMessageCustomTheme.args = {
	error: 'error',
	theme: {
		textError: palette.lifestyle[300],
		borderError: palette.lifestyle[300],
		background: palette.lifestyle[800],
	},
};

// *****************************************************************************
