import type { Meta, StoryFn } from '@csnx/storybooks/react';
import { useState } from 'react';
import type { NumericInputProps } from './NumericInput';
import { NumericInput } from './NumericInput';

const meta: Meta<typeof NumericInput> = {
	title: 'React Components/NumericInput',
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
		id: { control: { disable: true } },
	},
};

export default meta;

const Template: StoryFn<typeof NumericInput> = (args: NumericInputProps) => {
	const [state, setState] = useState('');
	return (
		<NumericInput
			{...args}
			value={state}
			onChange={(event) => setState(event.target.value)}
		/>
	);
};

export const DefaultDefaultTheme: StoryFn<typeof NumericInput> = Template.bind(
	{},
);

// *****************************************************************************

export const OptionalDefaultTheme: StoryFn<typeof NumericInput> = Template.bind(
	{},
);
OptionalDefaultTheme.args = {
	optional: true,
};

// *****************************************************************************

export const HideLabelDefaultTheme: StoryFn<typeof NumericInput> =
	Template.bind({});
HideLabelDefaultTheme.args = {
	hideLabel: true,
};

// *****************************************************************************

export const SupportingTextDefaultTheme: StoryFn<typeof NumericInput> =
	Template.bind({});
SupportingTextDefaultTheme.args = {
	supporting: 'Must be between 6 and 8 digits long',
};

// *****************************************************************************

export const Width30DefaultTheme: StoryFn<typeof NumericInput> = Template.bind(
	{},
);
Width30DefaultTheme.args = {
	width: 30,
	label: 'Card number',
};

// *****************************************************************************

export const Width10DefaultTheme: StoryFn<typeof NumericInput> = Template.bind(
	{},
);
Width10DefaultTheme.args = {
	width: 10,
	label: 'Sort code',
};

// *****************************************************************************

export const Width4DefaultTheme: StoryFn<typeof NumericInput> = Template.bind(
	{},
);
Width4DefaultTheme.args = {
	width: 4,
	label: 'Year of birth',
};

// *****************************************************************************

export const ErrorWithMessageDefaultTheme: StoryFn<typeof NumericInput> =
	Template.bind({});
ErrorWithMessageDefaultTheme.args = {
	error: 'error',
};

// *****************************************************************************

export const SuccessWithMessageDefaultTheme: StoryFn<typeof NumericInput> =
	Template.bind({});
SuccessWithMessageDefaultTheme.args = {
	success: 'success',
};

// *****************************************************************************
export const WithPrefix: StoryFn<typeof NumericInput> = Template.bind({});
WithPrefix.args = {
	prefixText: '£',
	label: 'Contribution amount',
};

// *****************************************************************************
export const WithSuffix: StoryFn<typeof NumericInput> = Template.bind({});
WithSuffix.args = {
	suffixText: 'kr.',
	label: 'Contribution amount',
};

// *****************************************************************************
export const WithPrefixAndSuffix: StoryFn<typeof NumericInput> = Template.bind(
	{},
);
WithPrefixAndSuffix.args = {
	prefixText: '£',
	suffixText: 'per month',
	label: 'Contribution amount',
	supporting: 'Will be charged monthly starting from today',
};

// *****************************************************************************
export const WithPrefixAndError: StoryFn<typeof NumericInput> = Template.bind(
	{},
);
WithPrefixAndError.args = {
	prefixText: '£',
	label: 'Contribution amount',
	error: 'The amount entered is not valid',
};

// *****************************************************************************
export const WithSuffixAndSuccess: StoryFn<typeof NumericInput> = Template.bind(
	{},
);
WithSuffixAndSuccess.args = {
	suffixText: 'kr.',
	label: 'Contribution amount',
	success: 'success',
};

// *****************************************************************************

export const DefaultSmallDefaultTheme: StoryFn<typeof NumericInput> =
	Template.bind({});
DefaultSmallDefaultTheme.args = {
	size: 'small',
};

// *****************************************************************************

export const OptionalSmallDefaultTheme: StoryFn<typeof NumericInput> =
	Template.bind({});
OptionalSmallDefaultTheme.args = {
	optional: true,
	size: 'small',
};

// *****************************************************************************

export const HideLabelSmallDefaultTheme: StoryFn<typeof NumericInput> =
	Template.bind({});
HideLabelSmallDefaultTheme.args = {
	hideLabel: true,
	size: 'small',
};

// *****************************************************************************

export const SupportingTextSmallDefaultTheme: StoryFn<typeof NumericInput> =
	Template.bind({});
SupportingTextSmallDefaultTheme.args = {
	supporting: 'Must be between 6 and 8 digits long',
	size: 'small',
};

// *****************************************************************************

export const Width30SmallDefaultTheme: StoryFn<typeof NumericInput> =
	Template.bind({});
Width30SmallDefaultTheme.args = {
	width: 30,
	label: 'Card number',
	size: 'small',
};

// *****************************************************************************

export const Width10SmallDefaultTheme: StoryFn<typeof NumericInput> =
	Template.bind({});
Width10SmallDefaultTheme.args = {
	width: 10,
	label: 'Sort code',
	size: 'small',
};

// *****************************************************************************

export const Width4SmallDefaultTheme: StoryFn<typeof NumericInput> =
	Template.bind({});
Width4SmallDefaultTheme.args = {
	width: 4,
	label: 'Year of birth',
	size: 'small',
};

// *****************************************************************************

export const ErrorWithMessageSmallDefaultTheme: StoryFn<typeof NumericInput> =
	Template.bind({});
ErrorWithMessageSmallDefaultTheme.args = {
	error: 'error',
	size: 'small',
};

// *****************************************************************************

export const SuccessWithMessageSmallDefaultTheme: StoryFn<typeof NumericInput> =
	Template.bind({});
SuccessWithMessageSmallDefaultTheme.args = {
	success: 'success',
	size: 'small',
};

// *****************************************************************************

export const WithPrefixSmall: StoryFn<typeof NumericInput> = Template.bind({});
WithPrefixSmall.args = {
	prefixText: '£',
	label: 'Contribution amount',
	size: 'small',
};

// *****************************************************************************

export const WithSuffixSmall: StoryFn<typeof NumericInput> = Template.bind({});
WithSuffixSmall.args = {
	suffixText: 'kr.',
	label: 'Contribution amount',
	size: 'small',
};

// *****************************************************************************

export const WithPrefixAndSuffixSmall: StoryFn<typeof NumericInput> =
	Template.bind({});
WithPrefixAndSuffixSmall.args = {
	prefixText: '£',
	suffixText: 'per month',
	label: 'Contribution amount',
	supporting: 'Will be charged monthly starting from today',
	size: 'small',
};

// *****************************************************************************

export const WithPrefixAndErrorSmall: StoryFn<typeof NumericInput> =
	Template.bind({});
WithPrefixAndErrorSmall.args = {
	prefixText: '£',
	label: 'Contribution amount',
	error: 'The amount entered is not valid',
	size: 'small',
};

// *****************************************************************************

export const WithSuffixAndSuccessSmall: StoryFn<typeof NumericInput> =
	Template.bind({});
WithSuffixAndSuccessSmall.args = {
	suffixText: 'kr.',
	label: 'Contribution amount',
	success: 'success',
	size: 'small',
};
