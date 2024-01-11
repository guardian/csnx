import { palette } from '@guardian/source-foundations';
import type { Story } from '@storybook/react';
import { SvgCamera } from '../../vendor/icons/SvgCamera';
import { ChoiceCard } from './ChoiceCard';
import type { ChoiceCardProps } from './ChoiceCard';

const choiceCardThemeDark = {
	textUnSelected: palette.neutral[86],
	textSelected: palette.brand[400],
	textHover: palette.brand[800],
	textError: palette.error[500],
	borderUnSelected: palette.neutral[86],
	borderSelected: palette.brand[800],
	borderHover: palette.brand[800],
	borderError: palette.error[500],
	backgroundUnSelected: palette.neutral[20],
	backgroundHover: palette.neutral[20],
	backgroundSelected: palette.neutral[100],
	backgroundTick: palette.brand[500],
};

export default {
	title: 'ChoiceCard Theming',
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
const Template: Story<ChoiceCardProps> = (args: ChoiceCardProps) => (
	<ChoiceCard {...args} theme={choiceCardThemeDark} />
);

// *****************************************************************************

export const ThemeExample = Template.bind({});

// *****************************************************************************

export const CheckedDarkTheme = Template.bind({});
CheckedDarkTheme.args = {
	checked: true,
};

// *****************************************************************************

export const ErrorDarkTheme = Template.bind({});
ErrorDarkTheme.args = {
	error: true,
};

// *****************************************************************************

export const IconDarkTheme = Template.bind({});
IconDarkTheme.args = {
	label: 'Camera',
	// @ts-expect-error - Storybook maps 'JSX element' to <em>Option 1</em>
	icon: 'JSX element',
};
