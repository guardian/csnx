import type { Story } from '@storybook/react';
import { useState } from 'react';
import type { NumericInputProps } from './NumericInput';
import { NumericInput } from './NumericInput';

export default {
	title: 'NumericInput',
	component: NumericInput,
	args: {
		label: 'Account number',
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
				error: 'The account number entered is not valid',
			},
			control: { type: 'radio' },
		},
		success: {
			options: ['undefined', 'success'],
			mapping: {
				undefined: undefined,
				success: 'Your account number has been validated successfully',
			},
			control: { type: 'radio' },
		},
		id: { control: null },
	},
};

const Template: Story<NumericInputProps> = (args: NumericInputProps) => {
	const [state, setState] = useState('');
	return (
		<NumericInput
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
	supporting: 'Must be between 6 and 8 digits long',
};

// *****************************************************************************

export const Width30DefaultTheme = Template.bind({});
Width30DefaultTheme.args = {
	width: 30,
	label: 'Card number',
};

// *****************************************************************************

export const Width10DefaultTheme = Template.bind({});
Width10DefaultTheme.args = {
	width: 10,
	label: 'Sort code',
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

export const WithPrefix = Template.bind({});
WithPrefix.args = {
	prefixText: '£',
	label: 'Contribution amount',
};

// *****************************************************************************

export const WithSuffix = Template.bind({});
WithSuffix.args = {
	suffixText: 'kr.',
	label: 'Contribution amount',
};

// *****************************************************************************

export const WithPrefixAndSuffix = Template.bind({});
WithPrefixAndSuffix.args = {
	prefixText: '£',
	suffixText: 'per month',
	label: 'Contribution amount',
	supporting: 'Will be charged monthly starting from today',
};

// *****************************************************************************

export const WithPrefixAndError = Template.bind({});
WithPrefixAndError.args = {
	prefixText: '£',
	label: 'Contribution amount',
	error: 'The amount entered is not valid',
};

// *****************************************************************************

export const WithSuffixAndSuccess = Template.bind({});
WithSuffixAndSuccess.args = {
	suffixText: 'kr.',
	label: 'Contribution amount',
	success: 'success',
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
	supporting: 'Must be between 6 and 8 digits long',
	size: 'small',
};

// *****************************************************************************

export const Width30SmallDefaultTheme = Template.bind({});
Width30SmallDefaultTheme.args = {
	width: 30,
	label: 'Card number',
	size: 'small',
};

// *****************************************************************************

export const Width10SmallDefaultTheme = Template.bind({});
Width10SmallDefaultTheme.args = {
	width: 10,
	label: 'Sort code',
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

export const WithPrefixSmall = Template.bind({});
WithPrefixSmall.args = {
	prefixText: '£',
	label: 'Contribution amount',
	size: 'small',
};

// *****************************************************************************

export const WithSuffixSmall = Template.bind({});
WithSuffixSmall.args = {
	suffixText: 'kr.',
	label: 'Contribution amount',
	size: 'small',
};

// *****************************************************************************

export const WithPrefixAndSuffixSmall = Template.bind({});
WithPrefixAndSuffixSmall.args = {
	prefixText: '£',
	suffixText: 'per month',
	label: 'Contribution amount',
	supporting: 'Will be charged monthly starting from today',
	size: 'small',
};

// *****************************************************************************

export const WithPrefixAndErrorSmall = Template.bind({});
WithPrefixAndErrorSmall.args = {
	prefixText: '£',
	label: 'Contribution amount',
	error: 'The amount entered is not valid',
	size: 'small',
};

// *****************************************************************************

export const WithSuffixAndSuccessSmall = Template.bind({});
WithSuffixAndSuccessSmall.args = {
	suffixText: 'kr.',
	label: 'Contribution amount',
	success: 'success',
	size: 'small',
};
