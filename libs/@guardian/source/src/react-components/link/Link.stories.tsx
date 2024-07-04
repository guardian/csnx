import { css } from '@emotion/react';
import type { StoryObj, Meta } from '@storybook/react';
import {
	headlineMedium14,
	headlineMedium17,
	headlineMedium20,
	headlineMedium24,
	headlineMedium28,
	headlineMedium34,
	headlineMedium42,
	headlineMedium50,
	palette,
	textSans12,
	textSans14,
	textSans15,
	textSans17,
	textSans20,
	textSans24,
	textSans28,
	textSans34,
} from '../../foundations';
import { SvgExternal } from '../__generated__/icons/SvgExternal';
import { Link } from './Link';
import { themeLinkBrand, themeLinkBrandAlt } from './theme';

const meta: Meta<typeof Link> = {
	title: 'React Components/Link',
	component: Link,
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
type Story = StoryObj<typeof Link>;

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
	headlineMedium50,
	headlineMedium42,
	headlineMedium34,
	headlineMedium28,
	headlineMedium24,
	headlineMedium20,
	headlineMedium17,
	headlineMedium14,
];

const LinkTemplate: Story = {
	render: (args) => <Link {...args}>Return to home page</Link>,
};

const UnderlineHoverHeadlineTemplate: Story = {
	render: (args) => (
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
					This is a guardian help link
				</Link>
			))}
		</div>
	),
};

const UnderlineHoverTextSansTemplate: Story = {
	render: (args) => (
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
						link
					</Link>{' '}
					in the middle of it
				</div>
			))}
		</div>
	),
};

export const PrimaryLinkDefaultTheme: Story = {
	...LinkTemplate,
	args: {
		priority: 'primary',
		icon: undefined,
		iconSide: 'left',
		href: '#',
	},
};

export const PrimaryLinkBrandTheme: Story = {
	...LinkTemplate,
	args: {
		...PrimaryLinkDefaultTheme.args,
		theme: themeLinkBrand,
	},
	parameters: {
		backgrounds: {
			default: 'brandBackground.primary',
		},
	},
};

export const PrimaryLinkBrandAltTheme: Story = {
	...LinkTemplate,
	args: {
		...PrimaryLinkDefaultTheme.args,
		theme: themeLinkBrandAlt,
	},
	parameters: {
		backgrounds: {
			default: 'brandAltBackground.primary',
		},
	},
};

export const SecondaryLinkDefaultTheme: Story = {
	...LinkTemplate,
	args: {
		...PrimaryLinkDefaultTheme.args,
		priority: 'secondary',
	},
};

export const PrimaryIconLinkDefaultTheme: Story = {
	...LinkTemplate,
	args: {
		...PrimaryLinkDefaultTheme.args,
		icon: <SvgExternal />,
	},
};

export const SecondaryIconLinkDefaultTheme: Story = {
	...LinkTemplate,
	args: {
		...PrimaryIconLinkDefaultTheme.args,
		priority: 'secondary',
	},
};

export const RightIconLinkDefaultTheme: Story = {
	...LinkTemplate,
	args: {
		...PrimaryIconLinkDefaultTheme.args,
		iconSide: 'right',
	},
};

export const UnderlineHoverHeadline: Story = {
	...UnderlineHoverHeadlineTemplate,
	args: {
		...PrimaryLinkDefaultTheme.args,
	},
};

export const UnderlineHoverTextSans: Story = {
	...UnderlineHoverTextSansTemplate,
	args: {
		...PrimaryLinkDefaultTheme.args,
	},
};

export const PrimaryIconLinkCustomTheme: Story = {
	...LinkTemplate,
	args: {
		...PrimaryIconLinkDefaultTheme.args,
		theme: {
			textPrimary: palette.neutral[86],
			textPrimaryHover: palette.brand[800],
		},
	},
	parameters: {
		backgrounds: {
			default: 'background.inverse',
		},
	},
};
