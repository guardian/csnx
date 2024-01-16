import type { Meta, StoryFn } from '@storybook/react';
import { SvgCamera } from '../../vendor/icons/SvgCamera';
import { ChoiceCard } from './ChoiceCard';
import type { ChoiceCardProps } from './ChoiceCard';

const choiceCardThemeDark = {
	textUnselected: palette.neutral[86],
	textSelected: palette.brand[400],
	textHover: palette.brand[800],
	textError: palette.error[500],
	borderUnselected: palette.neutral[86],
	borderSelected: palette.brand[800],
	borderHover: palette.brand[800],
	borderError: palette.error[500],
	backgroundUnselected: palette.neutral[20],
	backgroundHover: palette.neutral[20],
	backgroundSelected: palette.neutral[100],
	backgroundTick: palette.brand[500],
};
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

const Template: StoryFn<ChoiceCardProps> = (args: ChoiceCardProps) => (
	<ChoiceCard {...args} />
);

// *****************************************************************************

export const DefaultDefaultTheme: StoryFn<ChoiceCardProps> = Template.bind({});

// *****************************************************************************

export const CheckedDefaultTheme: StoryFn<ChoiceCardProps> = Template.bind({});
CheckedDefaultTheme.args = {
	checked: true,
};

// *****************************************************************************

export const ErrorDefaultTheme: StoryFn<ChoiceCardProps> = Template.bind({});
ErrorDefaultTheme.args = {
	error: true,
};

// *****************************************************************************

export const IconDefaultTheme: StoryFn<ChoiceCardProps> = Template.bind({});
IconDefaultTheme.args = {
	label: 'Camera',
	// @ts-expect-error - Storybook maps 'JSX element' to <em>Option 1</em>
	icon: 'JSX element',
};

// *****************************************************************************

export const DarkTheme = Template.bind({});
DarkTheme.args = {
	theme: choiceCardThemeDark,
};
