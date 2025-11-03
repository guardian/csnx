import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
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

export const PrimaryLinkDefaultTheme: Story = {
	args: {
		priority: 'primary',
		icon: undefined,
		iconSide: 'left',
		href: '#',
		children: 'Return to home page',
	},
};

export const PrimaryLinkBrandTheme: Story = {
	args: {
		...PrimaryLinkDefaultTheme.args,
		theme: themeLinkBrand,
	},
	parameters: {
		backgrounds: {
			default: 'palette.brand[400]',
		},
	},
};

export const PrimaryLinkBrandAltTheme: Story = {
	args: {
		...PrimaryLinkDefaultTheme.args,
		theme: themeLinkBrandAlt,
	},
	parameters: {
		backgrounds: {
			default: 'palette.brandAlt[400]',
		},
	},
};

export const SecondaryLinkDefaultTheme: Story = {
	args: {
		...PrimaryLinkDefaultTheme.args,
		priority: 'secondary',
	},
};

export const PrimaryIconLinkDefaultTheme: Story = {
	args: {
		...PrimaryLinkDefaultTheme.args,
		icon: <SvgExternal />,
	},
};

export const SecondaryIconLinkDefaultTheme: Story = {
	args: {
		...PrimaryIconLinkDefaultTheme.args,
		priority: 'secondary',
	},
};

export const RightIconLinkDefaultTheme: Story = {
	args: {
		...PrimaryIconLinkDefaultTheme.args,
		iconSide: 'right',
	},
};

export const PrimaryIconLinkCustomTheme: Story = {
	args: {
		...PrimaryIconLinkDefaultTheme.args,
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

export const UnderlineHoverHeadline: Story = {
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
	args: {
		...PrimaryLinkDefaultTheme.args,
	},
};

export const UnderlineHoverTextSans: Story = {
	render: (args) => (
		<div
			css={css`
				display: flex;
				flex-direction: column;
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
	args: {
		...PrimaryLinkDefaultTheme.args,
	},
};
