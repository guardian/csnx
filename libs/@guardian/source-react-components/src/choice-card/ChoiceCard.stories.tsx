import { palette } from '@guardian/source-foundations';
import type { Meta, StoryFn } from '@storybook/react';
import { SvgCamera } from '../../vendor/icons/SvgCamera';
import { ChoiceCard } from './ChoiceCard';
import type { ChoiceCardProps } from './ChoiceCard';

const meta: Meta<typeof ChoiceCard> = {
	title: 'ChoiceCard',
	component: ChoiceCard,
	args: {
		id: 'option-1-id',
		value: 'option-1',
		label: 'string',
	},
	argTypes: {
		label: {
			options: ['string', 'JSX element'],
			mapping: {
				string: 'Option 1',
				'JSX element': <em>Option 1</em>,
			},
		},
		defaultChecked: {
			control: { disable: true },
		},
		icon: {
			options: ['undefined', 'JSX element'],
			mapping: {
				undefined: undefined,
				'JSX element': <SvgCamera />,
			},
			control: { type: 'radio' },
		},
		onChange: { action: 'choice changed' },
	},
};

export default meta;

const Template: StoryFn<typeof ChoiceCard> = (args: ChoiceCardProps) => (
	<ChoiceCard {...args} />
);

// *****************************************************************************

export const DefaultDefaultTheme: StoryFn<typeof ChoiceCard> = Template.bind(
	{},
);

// *****************************************************************************

export const CheckedDefaultTheme: StoryFn<typeof ChoiceCard> = Template.bind(
	{},
);
CheckedDefaultTheme.args = {
	checked: true,
};

// *****************************************************************************

export const ErrorDefaultTheme: StoryFn<typeof ChoiceCard> = Template.bind({});
ErrorDefaultTheme.args = {
	error: true,
};

// *****************************************************************************

export const IconDefaultTheme: StoryFn<typeof ChoiceCard> = Template.bind({});
IconDefaultTheme.args = {
	label: 'Camera',
	// @ts-expect-error - Storybook maps 'JSX element' to <em>Option 1</em>
	icon: 'JSX element',
};

// *****************************************************************************

export const CustomTheme: StoryFn<typeof ChoiceCard> = Template.bind({});
CustomTheme.args = {
	theme: {
		backgroundUnselected: palette.neutral[0],
		textUnselected: palette.lifestyle[500],
	},
};
