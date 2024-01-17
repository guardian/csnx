import type { Story } from '@storybook/react';
import { useState } from 'react';
import { TextInput } from './TextInput';
import type { TextInputProps } from './TextInput';

export default {
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

const Template: Story<TextInputProps> = (args: TextInputProps) => {
	const [state, setState] = useState('');
	return (
		<TextInput
			{...args}
			value={state}
			onChange={(event) => setState(event.target.value)}
		/>
	);
};

export const DefaultDefaultTheme = Template.bind({});

// *****************************************************************************

export const OptionalDefaultTheme = Template.bind({});
OptionalDefaultTheme.args = {
	optional: true,
};

// *****************************************************************************

export const HideLabelDefaultTheme = Template.bind({});
HideLabelDefaultTheme.args = {
	hideLabel: true,
};

// *****************************************************************************

export const SupportingTextDefaultTheme = Template.bind({});
SupportingTextDefaultTheme.args = {
	supporting: 'alex@example.com',
};

// *****************************************************************************

export const Width30DefaultTheme = Template.bind({});
Width30DefaultTheme.args = {
	width: 30,
	label: 'First name',
};

// *****************************************************************************

export const Width10DefaultTheme = Template.bind({});
Width10DefaultTheme.args = {
	width: 10,
	label: 'Postcode',
};

// *****************************************************************************

export const Width4DefaultTheme = Template.bind({});
Width4DefaultTheme.args = {
	width: 4,
	label: 'Year of birth',
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

export const ConstraintDefaultTheme = Template.bind({});
ConstraintDefaultTheme.args = {
	label: 'Phone number',
	pattern: '[0-9]{1,11}',
	title: '11 digit phone number',
	type: 'tel',
};

// *****************************************************************************

export const DefaultSmallDefaultTheme = Template.bind({});
DefaultSmallDefaultTheme.args = {
	size: 'small',
};

// *****************************************************************************

export const OptionalSmallDefaultTheme = Template.bind({});
OptionalSmallDefaultTheme.args = {
	optional: true,
	size: 'small',
};

// *****************************************************************************

export const HideLabelSmallDefaultTheme = Template.bind({});
HideLabelSmallDefaultTheme.args = {
	hideLabel: true,
	size: 'small',
};

// *****************************************************************************

export const SupportingTextSmallDefaultTheme = Template.bind({});
SupportingTextSmallDefaultTheme.args = {
	supporting: 'alex@example.com',
	size: 'small',
};

// *****************************************************************************

export const Width30SmallDefaultTheme = Template.bind({});
Width30SmallDefaultTheme.args = {
	width: 30,
	label: 'First name',
	size: 'small',
};

// *****************************************************************************

export const Width10SmallDefaultTheme = Template.bind({});
Width10SmallDefaultTheme.args = {
	width: 10,
	label: 'Postcode',
	size: 'small',
};

// *****************************************************************************

export const Width4SmallDefaultTheme = Template.bind({});
Width4SmallDefaultTheme.args = {
	width: 4,
	label: 'Year of birth',
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

export const ConstraintSmallDefaultTheme = Template.bind({});
ConstraintSmallDefaultTheme.args = {
	label: 'Phone number',
	pattern: '[0-9]{1,11}',
	title: '11 digit phone number',
	type: 'tel',
	size: 'small',
};

// *****************************************************************************
