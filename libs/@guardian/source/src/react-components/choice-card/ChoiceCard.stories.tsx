import type { Meta, StoryFn } from '@storybook/react';
import { palette } from '../../foundations';
import { SvgCamera } from '../__generated__/icons/SvgCamera';
import { ChoiceCard } from './ChoiceCard';
import type { ChoiceCardProps } from './ChoiceCard';

const meta: Meta<typeof ChoiceCard> = {
	title: 'React Components/ChoiceCard',
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

export const IconCustomTheme: StoryFn<typeof ChoiceCard> = Template.bind({});
IconCustomTheme.args = {
	label: 'Camera',
	// @ts-expect-error - Storybook maps 'JSX element' to <em>Option 1</em>
	icon: 'JSX element',
	theme: {
		textUnselected: palette.neutral[86],
		borderUnselected: palette.neutral[86],
		backgroundUnselected: palette.neutral[20],
		textSelected: palette.brand[400],
		borderSelected: palette.brand[800],
		backgroundSelected: palette.neutral[100],
		textHover: palette.brand[800],
		borderHover: palette.brand[800],
		backgroundHover: palette.neutral[20],
		backgroundTick: palette.brand[400],
	},
};
IconCustomTheme.parameters = {
	backgrounds: {
		default: 'background.inverse',
	},
};
