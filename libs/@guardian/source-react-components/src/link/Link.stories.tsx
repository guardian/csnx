import { css } from '@emotion/react';
import {
	headlineMedium14,
	headlineMedium17,
	headlineMedium20,
	headlineMedium24,
	headlineMedium28,
	headlineMedium34,
	headlineMedium42,
	headlineMedium50,
	headlineMedium70,
	palette,
	textSans12,
	textSans14,
	textSans15,
	textSans17,
	textSans20,
	textSans24,
	textSans28,
	textSans34,
} from '@guardian/source-foundations';
import type { Meta, StoryFn } from '@storybook/react';
import { SvgExternal } from '../../vendor/icons/SvgExternal';
import { Link } from './Link';
import type { LinkProps } from './Link';
import { themeLinkBrand, themeLinkBrandAlt } from './theme';

const meta: Meta<typeof Link> = {
	title: 'Link',
	component: Link,
	args: {
		priority: 'primary',
		icon: <SvgExternal />,
		iconSide: 'left',
		href: '#',
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

const textSans = [
	textSans34,
	textSans28,
	textSans24,
	textSans20,
	textSans17,
	textSans15,
	textSans14,
	textSans12,
];

const headline = [
	headlineMedium70,
	headlineMedium50,
	headlineMedium42,
	headlineMedium34,
	headlineMedium28,
	headlineMedium24,
	headlineMedium20,
	headlineMedium17,
	headlineMedium14,
];

const Template: StoryFn<typeof Link> = (args: LinkProps) => (
	<Link {...args}>Return to home page</Link>
);

const UnderlineHoverHeadlineTemplate: StoryFn<typeof Link> = (
	args: LinkProps,
) => {
	const headlineText = 'This is a guardian help link';

	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;

				a {
					padding: 20px 0;
				}
			`}
		>
			{headline.map((preset, i) => (
				<Link
					key={i}
					{...args}
					cssOverrides={css`
						${preset}
					`}
				>
					{headlineText}
				</Link>
			))}
		</div>
	);
};

const UnderlineHoverTextSansTemplate: StoryFn<typeof Link> = (
	args: LinkProps,
) => {
	const headlineText = 'link';

	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;

				a {
					padding: 20px 0;
				}
			`}
		>
			{textSans.map((preset, i) => (
				<div
					css={css`
						padding: 10px 0;
						${preset}
					`}
					key={i}
				>
					Some text sans, with a{' '}
					<Link
						{...args}
						cssOverrides={css`
							${preset}
						`}
					>
						{headlineText}
					</Link>{' '}
					in the middle of it
				</div>
			))}
		</div>
	);
};

export const PrimaryLinkDefaultTheme: StoryFn<typeof Link> = Template.bind({});
PrimaryLinkDefaultTheme.args = {
	icon: undefined,
};

// *****************************************************************************

export const PrimaryLinkBrandTheme: StoryFn<typeof Link> = Template.bind({});
PrimaryLinkBrandTheme.args = {
	icon: undefined,
	theme: themeLinkBrand,
};
PrimaryLinkBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};

// *****************************************************************************

export const PrimaryLinkBrandAltTheme: StoryFn<typeof Link> = Template.bind({});
PrimaryLinkBrandAltTheme.args = {
	icon: undefined,
	theme: themeLinkBrandAlt,
};
PrimaryLinkBrandAltTheme.parameters = {
	backgrounds: {
		default: 'brandAltBackground.primary',
	},
};

// *****************************************************************************

export const SecondaryLinkDefaultTheme: StoryFn<typeof Link> = Template.bind(
	{},
);
SecondaryLinkDefaultTheme.args = {
	priority: 'secondary',
	icon: undefined,
};

// *****************************************************************************

export const PrimaryIconLinkDefaultTheme: StoryFn<typeof Link> = Template.bind(
	{},
);

// *****************************************************************************

export const SecondaryIconLinkDefaultTheme: StoryFn<typeof Link> =
	Template.bind({});
SecondaryIconLinkDefaultTheme.args = {
	priority: 'secondary',
};

// *****************************************************************************

export const RightIconLinkDefaultTheme: StoryFn<typeof Link> = Template.bind(
	{},
);
RightIconLinkDefaultTheme.args = {
	iconSide: 'right',
};

// *****************************************************************************

export const UnderlineHoverHeadline: StoryFn<typeof Link> =
	UnderlineHoverHeadlineTemplate.bind({});

UnderlineHoverHeadline.args = {
	icon: undefined,
};

// *****************************************************************************

export const UnderlineHoverTextSans: StoryFn<typeof Link> =
	UnderlineHoverTextSansTemplate.bind({});

UnderlineHoverTextSans.args = {
	icon: undefined,
};

// *****************************************************************************

export const PrimaryIconLinkCustomTheme: StoryFn<typeof Link> = Template.bind(
	{},
);
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
