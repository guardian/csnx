import { palette } from '../../foundations';
import type { Meta, StoryFn } from '@storybook/react';
import { SvgArrowRightStraight } from '../__generated__/icons/SvgArrowRightStraight';
import { LinkButton } from './LinkButton';
import type { LinkButtonProps } from './LinkButton';

const meta: Meta<typeof LinkButton> = {
	title: 'LinkButton',
	component: LinkButton,
	argTypes: {
		icon: {
			options: ['undefined', 'arrow'],
			mapping: {
				undefined: undefined,
				arrow: <SvgArrowRightStraight />,
			},
			control: { type: 'radio' },
		},
	},
	args: {
		children: 'Subscribe now',
		size: 'default',
		hideLabel: false,
		icon: undefined,
		priority: 'primary',
		iconSide: 'left',
		nudgeIcon: false,
		href: '#',
	},
};

export default meta;

const Template: StoryFn<typeof LinkButton> = (args: LinkButtonProps) => (
	<LinkButton {...args} />
);

// *****************************************************************************

export const PrimaryPriorityDefaultTheme: StoryFn<typeof LinkButton> =
	Template.bind({});
PrimaryPriorityDefaultTheme.args = {
	priority: 'primary',
};

// *****************************************************************************

export const SecondaryPriorityDefaultTheme: StoryFn<typeof LinkButton> =
	Template.bind({});
SecondaryPriorityDefaultTheme.args = {
	priority: 'secondary',
};

// *****************************************************************************

export const TertiaryPriorityDefaultTheme: StoryFn<typeof LinkButton> =
	Template.bind({});
TertiaryPriorityDefaultTheme.args = {
	priority: 'tertiary',
};

// *****************************************************************************

export const SubduedPriorityDefaultTheme: StoryFn<typeof LinkButton> =
	Template.bind({});
SubduedPriorityDefaultTheme.args = {
	priority: 'subdued',
};

// *****************************************************************************

export const TextAndIconLeftDefaultSizeDefaultTheme: StoryFn<
	typeof LinkButton
> = Template.bind({});
TextAndIconLeftDefaultSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'arrow' to <SvgArrowRightStraight />
	icon: 'arrow',
};

// *****************************************************************************

export const TextAndIconRightDefaultSizeDefaultTheme: StoryFn<
	typeof LinkButton
> = Template.bind({});
TextAndIconRightDefaultSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'arrow' to <SvgArrowRightStraight />
	icon: 'arrow',
	iconSide: 'right',
};

// *****************************************************************************

export const TextAndIconLeftSmallSizeDefaultTheme: StoryFn<typeof LinkButton> =
	Template.bind({});
TextAndIconLeftSmallSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'arrow' to <SvgArrowRightStraight />
	icon: 'arrow',
	size: 'small',
};

// *****************************************************************************

export const TextAndIconRightSmallSizeDefaultTheme: StoryFn<typeof LinkButton> =
	Template.bind({});
TextAndIconRightSmallSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'arrow' to <SvgArrowRightStraight />
	icon: 'arrow',
	iconSide: 'right',
	size: 'small',
};

// *****************************************************************************

export const TextAndIconLeftXSmallSizeDefaultTheme: StoryFn<typeof LinkButton> =
	Template.bind({});
TextAndIconLeftXSmallSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'arrow' to <SvgArrowRightStraight />
	icon: 'arrow',
	size: 'xsmall',
};

// *****************************************************************************

export const TextAndIconRightXSmallSizeDefaultTheme: StoryFn<
	typeof LinkButton
> = Template.bind({});
TextAndIconRightXSmallSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'arrow' to <SvgArrowRightStraight />
	icon: 'arrow',
	iconSide: 'right',
	size: 'xsmall',
};

// *****************************************************************************

export const TextAndIconLeftWithNudgeDefaultTheme: StoryFn<typeof LinkButton> =
	Template.bind({});
TextAndIconLeftWithNudgeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'arrow' to <SvgArrowRightStraight />
	icon: 'arrow',
	nudgeIcon: true,
};

// *****************************************************************************

export const TextAndIconRightWithNudgeDefaultTheme: StoryFn<typeof LinkButton> =
	Template.bind({});
TextAndIconRightWithNudgeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'arrow' to <SvgArrowRightStraight />
	icon: 'arrow',
	iconSide: 'right',
	nudgeIcon: true,
};

// *****************************************************************************

export const IconOnlyDefaultSizeDefaultTheme: StoryFn<typeof LinkButton> =
	Template.bind({});
IconOnlyDefaultSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'arrow' to <SvgArrowRightStraight />
	icon: 'arrow',
	hideLabel: true,
};

// *****************************************************************************

export const IconOnlySmallSizeDefaultTheme: StoryFn<typeof LinkButton> =
	Template.bind({});
IconOnlySmallSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'arrow' to <SvgArrowRightStraight />
	icon: 'arrow',
	size: 'small',
	hideLabel: true,
};

// *****************************************************************************

export const IconOnlyXSmallSizeDefaultTheme: StoryFn<typeof LinkButton> =
	Template.bind({});
IconOnlyXSmallSizeDefaultTheme.args = {
	// @ts-expect-error - Storybook maps 'arrow' to <SvgArrowRightStraight />
	icon: 'arrow',
	size: 'xsmall',
	hideLabel: true,
};

// *****************************************************************************

export const PrimaryPriorityCustomTheme: StoryFn<typeof LinkButton> =
	Template.bind({});
PrimaryPriorityCustomTheme.args = {
	priority: 'primary',
	iconSide: 'right',
	// @ts-expect-error - Storybook maps 'arrow' to <SvgArrowRightStraight />
	icon: 'arrow',
	theme: {
		textPrimary: palette.brand[400],
		backgroundPrimary: palette.brandAlt[400],
		backgroundPrimaryHover: palette.brandAlt[200],
	},
};
PrimaryPriorityCustomTheme.parameters = {
	backgrounds: {
		default: 'background.inverse',
	},
};
