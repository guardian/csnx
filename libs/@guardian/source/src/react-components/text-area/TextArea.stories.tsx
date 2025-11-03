import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { palette } from '../../foundations';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
	title: 'React Components/TextArea',
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
};

export default meta;
type Story = StoryObj<typeof TextArea>;

const Template: Story = {
	render: (args) => {
		const [value, setValue] = useState(args.value);
		const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
			setValue(e.target.value);

		return <TextArea {...args} onChange={onChange} value={value} />;
	},
};

export const DefaultDefaultTheme: Story = {
	...Template,
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

export const WithRowsDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		rows: 10,
	},
};

export const OptionalDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		optional: true,
	},
};

export const VisuallyHideLabelDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		hideLabel: true,
	},
};

export const SupportingTextDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		supporting:
			'Please keep comments respectful and abide by the community guidelines.',
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

export const WithMaxLengthDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		maxLength: 10,
	},
};

export const WithDefaultValue: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		value: 'This is a value passed in as a prop',
	},
};

export const DefaultSmallDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		size: 'small',
	},
};

export const WithRowsSmallDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		rows: 10,
		size: 'small',
	},
};

export const OptionalSmallDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		optional: true,
		size: 'small',
	},
};

export const VisuallyHideLabelSmallDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		hideLabel: true,
		size: 'small',
	},
};

export const SupportingTextSmallDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		supporting:
			'Please keep comments respectful and abide by the community guidelines.',
		size: 'small',
	},
};

export const ErrorWithMessageSmallDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		error: 'error',
		size: 'small',
	},
};

export const SuccessWithMessageSmallDefaultTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		success: 'success',
		size: 'small',
	},
};

export const SupportingTextCustomTheme: Story = {
	...Template,
	args: {
		...DefaultDefaultTheme.args,
		supporting:
			'Please keep comments respectful and abide by the community guidelines.',
		theme: {
			textUserInput: palette.neutral[86],
			textLabel: palette.neutral[86],
			textSupporting: palette.neutral[60],
			border: palette.neutral[60],
			backgroundInput: palette.neutral[20],
		},
	},
	globals: {
		backgrounds: {
			value: 'palette.neutral[10]',
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
			borderError: palette.error[500],
			backgroundInput: palette.neutral[20],
		},
	},
	globals: {
		backgrounds: {
			value: 'palette.neutral[10]',
		},
	},
};
