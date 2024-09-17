import { palette } from '../../foundations';
import type { Meta, StoryObj } from '@csnx/storybooks/react';
import { SvgCamera } from '../__generated__/icons/SvgCamera';
import { ChoiceCard } from './ChoiceCard';

const meta: Meta<typeof ChoiceCard> = {
	title: 'React Components/ChoiceCard',
	component: ChoiceCard,
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
type Story = StoryObj<typeof ChoiceCard>;

export const DefaultDefaultTheme: Story = {
	args: {
		id: 'option-1-id',
		value: 'option-1',
		label: 'string',
	},
};

export const CheckedDefaultTheme: Story = {
	args: {
		...DefaultDefaultTheme.args,
		checked: true,
	},
};

export const ErrorDefaultTheme: Story = {
	args: {
		...DefaultDefaultTheme.args,
		error: true,
	},
};

export const IconDefaultTheme: Story = {
	args: {
		...DefaultDefaultTheme.args,
		label: 'Camera',
		// @ts-expect-error - Storybook maps `JSX element` to `<em>Option 1</em>`
		icon: 'JSX element',
	},
};

export const IconCustomTheme: Story = {
	args: {
		...DefaultDefaultTheme.args,
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
	},
	parameters: {
		backgrounds: {
			default: 'palette.neutral[10]',
		},
	},
};
