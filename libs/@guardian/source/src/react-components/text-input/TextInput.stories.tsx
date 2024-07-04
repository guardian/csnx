import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { palette } from '../../foundations';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
	title: 'React Components/TextInput',
	component: TextInput,
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
		id: { control: { disable: true } },
	},
};

export default meta;
type Story = StoryObj<typeof TextInput>;

const TextInputTemplate: Story = {
	render: (args) => {
		const [state, setState] = useState('');
		return (
			<TextInput
				{...args}
				value={state}
				onChange={(event) => setState(event.target.value)}
			/>
		);
	},
};

export const DefaultDefaultTheme: Story = {
	...TextInputTemplate,
	args: {
		label: 'Email',
		optional: false,
		hideLabel: false,
		supporting: '',
		size: 'medium',
		error: 'undefined',
		success: 'undefined',
	},
};

export const OptionalDefaultTheme: Story = {
	...TextInputTemplate,
	args: {
		...DefaultDefaultTheme.args,
		optional: true,
	},
};

export const HideLabelDefaultTheme: Story = {
	...TextInputTemplate,
	args: {
		...DefaultDefaultTheme.args,
		hideLabel: true,
	},
};

export const SupportingTextDefaultTheme: Story = {
	...TextInputTemplate,
	args: {
		...DefaultDefaultTheme.args,
		supporting: 'alex@example.com',
	},
};

export const Width30DefaultTheme: Story = {
	...TextInputTemplate,
	args: {
		...DefaultDefaultTheme.args,
		width: 30,
		label: 'First name',
	},
};

export const Width10DefaultTheme: Story = {
	...TextInputTemplate,
	args: {
		...DefaultDefaultTheme.args,
		width: 10,
		label: 'Postcode',
	},
};

export const Width4DefaultTheme: Story = {
	...TextInputTemplate,
	args: {
		...DefaultDefaultTheme.args,
		width: 4,
		label: 'Year of birth',
	},
};

export const ErrorWithMessageDefaultTheme: Story = {
	...TextInputTemplate,
	args: {
		...DefaultDefaultTheme.args,
		error: 'error',
	},
};

export const SuccessWithMessageDefaultTheme: Story = {
	...TextInputTemplate,
	args: {
		...DefaultDefaultTheme.args,
		success: 'success',
	},
};

export const ConstraintDefaultTheme: Story = {
	...TextInputTemplate,
	args: {
		...DefaultDefaultTheme.args,
		label: 'Phone number',
		pattern: '[0-9]{1,11}',
		title: 'React Components/11 digit phone number',
		type: 'tel',
	},
};

export const DefaultSmallDefaultTheme: Story = {
	...TextInputTemplate,
	args: {
		...DefaultDefaultTheme.args,
		size: 'small',
	},
};

export const OptionalSmallDefaultTheme: Story = {
	...TextInputTemplate,
	args: {
		...DefaultDefaultTheme.args,
		optional: true,
		size: 'small',
	},
};

export const HideLabelSmallDefaultTheme: Story = {
	...TextInputTemplate,
	args: {
		...DefaultDefaultTheme.args,
		hideLabel: true,
		size: 'small',
	},
};

export const SupportingTextSmallDefaultTheme: Story = {
	...TextInputTemplate,
	args: {
		...DefaultDefaultTheme.args,
		supporting: 'alex@example.com',
		size: 'small',
	},
};

export const Width30SmallDefaultTheme: Story = {
	...TextInputTemplate,
	args: {
		...DefaultDefaultTheme.args,
		width: 30,
		label: 'First name',
		size: 'small',
	},
};

export const Width10SmallDefaultTheme: Story = {
	...TextInputTemplate,
	args: {
		...DefaultDefaultTheme.args,
		width: 10,
		label: 'Postcode',
		size: 'small',
	},
};

export const Width4SmallDefaultTheme: Story = {
	...TextInputTemplate,
	args: {
		...DefaultDefaultTheme.args,
		width: 4,
		label: 'Year of birth',
		size: 'small',
	},
};

export const ErrorWithMessageSmallDefaultTheme: Story = {
	...TextInputTemplate,
	args: {
		...DefaultDefaultTheme.args,
		error: 'error',
		size: 'small',
	},
};

export const SuccessWithMessageSmallDefaultTheme: Story = {
	...TextInputTemplate,
	args: {
		...DefaultDefaultTheme.args,
		success: 'success',
		size: 'small',
	},
};

export const ConstraintSmallDefaultTheme: Story = {
	...TextInputTemplate,
	args: {
		...DefaultDefaultTheme.args,
		label: 'Phone number',
		pattern: '[0-9]{1,11}',
		title: 'React Components/11 digit phone number',
		type: 'tel',
		size: 'small',
	},
};

export const SupportingTextCustomTheme: Story = {
	...TextInputTemplate,
	args: {
		...DefaultDefaultTheme.args,
		supporting: 'alex@example.com',
		theme: {
			textUserInput: palette.neutral[86],
			textLabel: palette.neutral[86],
			textSupporting: palette.neutral[60],
			border: palette.neutral[60],
			backgroundInput: palette.neutral[20],
		},
	},
	parameters: {
		backgrounds: {
			default: 'background.inverse',
		},
	},
};

export const ErrorWithMessageCustomTheme: Story = {
	...TextInputTemplate,
	args: {
		...DefaultDefaultTheme.args,
		error: 'error',
		theme: {
			textLabel: palette.neutral[86],
			textError: palette.error[500],
			borderError: palette.error[500],
			backgroundInput: palette.neutral[20],
		},
	},
	parameters: {
		backgrounds: {
			default: 'background.inverse',
		},
	},
};
