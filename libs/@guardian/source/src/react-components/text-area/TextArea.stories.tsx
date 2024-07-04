import type { StoryObj, Meta } from '@storybook/react';
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

const TextAreaTemplate: Story = {
	render: (args) => {
		const [value, setValue] = useState(args.value);
		const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
			setValue(e.target.value);

		return <TextArea {...args} onChange={onChange} value={value} />;
	},
};

export const DefaultDefaultTheme: Story = {
	...TextAreaTemplate,
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
	...TextAreaTemplate,
	args: {
		...DefaultDefaultTheme.args,
		rows: 10,
	},
};

export const OptionalDefaultTheme: Story = {
	...TextAreaTemplate,
	args: {
		...DefaultDefaultTheme.args,
		optional: true,
	},
};

export const VisuallyHideLabelDefaultTheme: Story = {
	...TextAreaTemplate,
	args: {
		...DefaultDefaultTheme.args,
		hideLabel: true,
	},
};

export const SupportingTextDefaultTheme: Story = {
	...TextAreaTemplate,
	args: {
		...DefaultDefaultTheme.args,
		supporting:
			'Please keep comments respectful and abide by the community guidelines.',
	},
};

export const ErrorWithMessageDefaultTheme: Story = {
	...TextAreaTemplate,
	args: {
		...DefaultDefaultTheme.args,
		error: 'error',
	},
};

export const SuccessWithMessageDefaultTheme: Story = {
	...TextAreaTemplate,
	args: {
		...DefaultDefaultTheme.args,
		success: 'success',
	},
};

export const WithMaxLengthDefaultTheme: Story = {
	...TextAreaTemplate,
	args: {
		...DefaultDefaultTheme.args,
		maxLength: 10,
	},
};

export const WithDefaultValue: Story = {
	...TextAreaTemplate,
	args: {
		...DefaultDefaultTheme.args,
		value: 'This is a value passed in as a prop',
	},
};

export const DefaultSmallDefaultTheme: Story = {
	...TextAreaTemplate,
	args: {
		...DefaultDefaultTheme.args,
		size: 'small',
	},
};

export const WithRowsSmallDefaultTheme: Story = {
	...TextAreaTemplate,
	args: {
		...DefaultDefaultTheme.args,
		rows: 10,
		size: 'small',
	},
};

export const OptionalSmallDefaultTheme: Story = {
	...TextAreaTemplate,
	args: {
		...DefaultDefaultTheme.args,
		optional: true,
		size: 'small',
	},
};

export const VisuallyHideLabelSmallDefaultTheme: Story = {
	...TextAreaTemplate,
	args: {
		...DefaultDefaultTheme.args,
		hideLabel: true,
		size: 'small',
	},
};

export const SupportingTextSmallDefaultTheme: Story = {
	...TextAreaTemplate,
	args: {
		...DefaultDefaultTheme.args,
		supporting:
			'Please keep comments respectful and abide by the community guidelines.',
		size: 'small',
	},
};

export const ErrorWithMessageSmallDefaultTheme: Story = {
	...TextAreaTemplate,
	args: {
		...DefaultDefaultTheme.args,
		error: 'error',
		size: 'small',
	},
};

export const SuccessWithMessageSmallDefaultTheme: Story = {
	...TextAreaTemplate,
	args: {
		...DefaultDefaultTheme.args,
		success: 'success',
		size: 'small',
	},
};

export const SupportingTextCustomTheme: Story = {
	...TextAreaTemplate,
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
	parameters: {
		backgrounds: {
			default: 'background.inverse',
		},
	},
};

export const ErrorWithMessageCustomTheme: Story = {
	...TextAreaTemplate,
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
