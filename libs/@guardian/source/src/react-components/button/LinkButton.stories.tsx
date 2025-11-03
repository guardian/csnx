import type { Meta, StoryObj } from '@storybook/react-vite';
import { palette } from '../../foundations';
import { SvgArrowRightStraight } from '../__generated__/icons/SvgArrowRightStraight';
import { LinkButton } from './LinkButton';

const meta: Meta<typeof LinkButton> = {
	title: 'React Components/LinkButton',
	component: LinkButton,
	argTypes: {
		icon: {
			options: ['None', 'Arrow'],
			mapping: {
				None: undefined,
				Arrow: <SvgArrowRightStraight />,
			},
			control: { type: 'radio' },
		},
	},
};

export default meta;
type Story = StoryObj<typeof LinkButton>;

export const PrimaryPriorityDefaultTheme: Story = {
	args: {
		children: 'Subscribe now',
		size: 'default',
		hideLabel: false,
		// @ts-expect-error - Name from control options which Storybook maps to `undefined`
		icon: 'None',
		priority: 'primary',
		iconSide: 'left',
		nudgeIcon: false,
		href: '#',
	},
};

export const SecondaryPriorityDefaultTheme: Story = {
	args: {
		...PrimaryPriorityDefaultTheme.args,
		priority: 'secondary',
	},
};

export const TertiaryPriorityDefaultTheme: Story = {
	args: {
		...PrimaryPriorityDefaultTheme.args,
		priority: 'tertiary',
	},
};

export const SubduedPriorityDefaultTheme: Story = {
	args: {
		...PrimaryPriorityDefaultTheme.args,
		priority: 'subdued',
	},
};

export const TextAndIconLeftDefaultSizeDefaultTheme: Story = {
	args: {
		...PrimaryPriorityDefaultTheme.args,
		// @ts-expect-error - Name from control options which Storybook maps to `<SvgCross />`
		icon: 'Arrow',
	},
};

export const TextAndIconRightDefaultSizeDefaultTheme: Story = {
	args: {
		...TextAndIconLeftDefaultSizeDefaultTheme.args,
		iconSide: 'right',
	},
};

export const TextAndIconLeftSmallSizeDefaultTheme: Story = {
	args: {
		...TextAndIconLeftDefaultSizeDefaultTheme.args,
		size: 'small',
	},
};

export const TextAndIconRightSmallSizeDefaultTheme: Story = {
	args: {
		...TextAndIconRightDefaultSizeDefaultTheme.args,
		size: 'small',
	},
};

export const TextAndIconLeftXSmallSizeDefaultTheme: Story = {
	args: {
		...TextAndIconLeftDefaultSizeDefaultTheme.args,
		size: 'xsmall',
	},
};

export const TextAndIconRightXSmallSizeDefaultTheme: Story = {
	args: {
		...TextAndIconRightDefaultSizeDefaultTheme.args,
		size: 'xsmall',
	},
};

export const TextAndIconLeftWithNudgeDefaultTheme: Story = {
	args: {
		...TextAndIconLeftDefaultSizeDefaultTheme.args,
		nudgeIcon: true,
	},
};

export const TextAndIconRightWithNudgeDefaultTheme: Story = {
	args: {
		...TextAndIconRightDefaultSizeDefaultTheme.args,
		nudgeIcon: true,
	},
};

export const IconOnlyDefaultSizeDefaultTheme: Story = {
	args: {
		...TextAndIconLeftDefaultSizeDefaultTheme.args,
		hideLabel: true,
	},
};

export const IconOnlySmallSizeDefaultTheme: Story = {
	args: {
		...IconOnlyDefaultSizeDefaultTheme.args,
		size: 'small',
	},
};

export const IconOnlyXSmallSizeDefaultTheme: Story = {
	args: {
		...IconOnlyDefaultSizeDefaultTheme.args,
		size: 'xsmall',
	},
};

export const PrimaryPriorityCustomTheme: Story = {
	args: {
		...TextAndIconRightDefaultSizeDefaultTheme.args,
		theme: {
			textPrimary: palette.brand[400],
			backgroundPrimary: palette.brandAlt[400],
			backgroundPrimaryHover: palette.brandAlt[200],
		},
	},
	parameters: {
		backgrounds: {
			default: 'palette.neutral[10]',
		},
	},
};
