import { palette } from '../../foundations';
import type { Meta, StoryObj } from '@csnx/storybooks/react';
import { SvgExternal } from '../__generated__/icons/SvgExternal';
import { ButtonLink } from './ButtonLink';

const meta: Meta<typeof ButtonLink> = {
	title: 'React Components/ButtonLink',
	component: ButtonLink,
	argTypes: {
		icon: {
			options: ['undefined', 'SvgExternal'],
			mapping: {
				undefined: undefined,
				SvgExternal: <SvgExternal />,
			},
			control: { type: 'radio' },
		},
	},
};

export default meta;
type Story = StoryObj<typeof ButtonLink>;

export const PrimaryButtonLinkDefaultTheme: Story = {
	args: {
		priority: 'primary',
		icon: undefined,
		iconSide: 'left',
		children: 'Return to home page',
	},
};

export const SecondaryButtonLinkDefaultTheme: Story = {
	args: {
		...PrimaryButtonLinkDefaultTheme.args,
		priority: 'secondary',
	},
};

export const PrimaryIconButtonLinkDefaultTheme: Story = {
	args: {
		...PrimaryButtonLinkDefaultTheme.args,
		icon: <SvgExternal />,
	},
};

export const SecondaryIconButtonLinkDefaultTheme: Story = {
	args: {
		...PrimaryIconButtonLinkDefaultTheme.args,
		priority: 'secondary',
	},
};

export const RightIconButtonLinkDefaultTheme: Story = {
	args: {
		...PrimaryIconButtonLinkDefaultTheme.args,
		iconSide: 'right',
	},
};

export const PrimaryIconLinkCustomTheme: Story = {
	args: {
		...PrimaryIconButtonLinkDefaultTheme.args,
		theme: {
			textPrimary: palette.neutral[86],
			textPrimaryHover: palette.brand[800],
		},
	},
	parameters: {
		backgrounds: {
			default: 'palette.neutral[10]',
		},
	},
};
