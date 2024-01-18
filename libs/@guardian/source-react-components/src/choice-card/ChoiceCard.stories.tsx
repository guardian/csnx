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

// *****************************************************************************

export const DefaultDefaultTheme: StoryFn<ChoiceCardProps> = (
	args: ChoiceCardProps,
) => <ChoiceCard {...args} />;

// *****************************************************************************

export const CheckedDefaultTheme: StoryFn<ChoiceCardProps> = (
	args: ChoiceCardProps,
) => <ChoiceCard {...args} checked={true} />;

// *****************************************************************************

export const ErrorDefaultTheme: StoryFn<ChoiceCardProps> = (
	args: ChoiceCardProps,
) => <ChoiceCard {...args} error={true} />;

// *****************************************************************************

export const IconDefaultTheme: StoryFn<ChoiceCardProps> = (
	args: ChoiceCardProps,
) => <ChoiceCard {...args} label="Camera" icon={<SvgCamera />} />;

// *****************************************************************************

export const NewOptionName: StoryFn<ChoiceCardProps> = (
	args: ChoiceCardProps,
) => <ChoiceCard {...args} label={'Option 2'} />;
