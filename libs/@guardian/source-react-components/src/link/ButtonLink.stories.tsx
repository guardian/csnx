import { palette } from '@guardian/source-foundations';
import type { Meta, StoryFn } from '@storybook/react';
import { SvgExternal } from '.././__generated__/icons/SvgExternal';
import type { ButtonLinkProps } from './ButtonLink';
import { ButtonLink } from './ButtonLink';

const meta: Meta<typeof ButtonLink> = {
	title: 'ButtonLink',
	component: ButtonLink,
	args: {
		priority: 'primary',
		icon: <SvgExternal />,
		iconSide: 'left',
	},
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

const Template: StoryFn<typeof ButtonLink> = (args: ButtonLinkProps) => (
	<ButtonLink {...args}>Return to home page</ButtonLink>
);

export const PrimaryButtonLinkDefaultTheme: StoryFn<typeof ButtonLink> =
	Template.bind({});
PrimaryButtonLinkDefaultTheme.args = {
	icon: undefined,
};

// *****************************************************************************

export const SecondaryButtonLinkDefaultTheme: StoryFn<typeof ButtonLink> =
	Template.bind({});
SecondaryButtonLinkDefaultTheme.args = {
	priority: 'secondary',
	icon: undefined,
};

// *****************************************************************************

export const PrimaryIconButtonLinkDefaultTheme: StoryFn<typeof ButtonLink> =
	Template.bind({});

// *****************************************************************************

export const SecondaryIconButtonLinkDefaultTheme: StoryFn<typeof ButtonLink> =
	Template.bind({});
SecondaryIconButtonLinkDefaultTheme.args = {
	priority: 'secondary',
};

// *****************************************************************************

export const RightIconButtonLinkDefaultTheme: StoryFn<typeof ButtonLink> =
	Template.bind({});
RightIconButtonLinkDefaultTheme.args = {
	iconSide: 'right',
};

// *****************************************************************************

export const PrimaryIconLinkCustomTheme: StoryFn<typeof ButtonLink> =
	Template.bind({});
PrimaryIconLinkCustomTheme.args = {
	theme: {
		textPrimary: palette.neutral[86],
		textPrimaryHover: palette.brand[800],
	},
};
PrimaryIconLinkCustomTheme.parameters = {
	backgrounds: {
		default: 'background.inverse',
	},
};
