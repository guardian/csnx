import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { breakpoints, palette, space } from '../../foundations';
import { Inline } from './Inline';

const meta: Meta<typeof Inline> = {
	title: 'React Components/Inline',
	component: Inline,
};

export default meta;
type Story = StoryObj<typeof Inline>;

const wrapper = css`
	outline: 1px dashed ${palette.neutral[46]};
`;

const box = css`
	display: grid;
	place-items: center;
	min-width: ${space[12]}px;
	min-height: ${space[12]}px;
	background: ${palette.news[600]};
`;

const InlineTemplate: Story = {
	render: (args) => (
		<div css={wrapper}>
			<Inline {...args}>
				{args.children ?? (
					<>
						<div css={box}>1</div>
						<div css={box}>2</div>
						<div css={box}>3</div>
					</>
				)}
			</Inline>
		</div>
	),
};

export const NoSpace: Story = {
	...InlineTemplate,
};

export const Space0: Story = {
	...InlineTemplate,
	args: {
		space: 0,
	},
};

export const Space1: Story = {
	...InlineTemplate,
	args: {
		space: 1,
	},
};

export const Space2: Story = {
	...InlineTemplate,
	args: {
		space: 2,
	},
};

export const Space3: Story = {
	...InlineTemplate,
	args: {
		space: 3,
	},
};

export const Space4: Story = {
	...InlineTemplate,
	args: {
		space: 4,
	},
};

export const Space5: Story = {
	...InlineTemplate,
	args: {
		space: 5,
	},
};

export const Space6: Story = {
	...InlineTemplate,
	args: {
		space: 6,
	},
};

export const Space8: Story = {
	...InlineTemplate,
	args: {
		space: 8,
	},
};

export const Space9: Story = {
	...InlineTemplate,
	args: {
		space: 9,
	},
};

export const Space10: Story = {
	...InlineTemplate,
	args: {
		space: 10,
	},
};

export const Space12: Story = {
	...InlineTemplate,
	args: {
		space: 12,
	},
};

export const Space14: Story = {
	...InlineTemplate,
	args: {
		space: 14,
	},
};

export const Space16: Story = {
	...InlineTemplate,
	args: {
		space: 16,
	},
};

export const Space18: Story = {
	...InlineTemplate,
	args: {
		space: 18,
	},
};

export const Space24: Story = {
	...InlineTemplate,
	args: {
		space: 24,
	},
};

export const MultipleChildElements: Story = {
	...InlineTemplate,
	render: (args) => (
		<div css={wrapper}>
			<Inline {...args}>
				{Array.from({ length: 24 }, (_, i) => (
					<div key={i} css={box}>
						{i + 1}
					</div>
				))}
			</Inline>
		</div>
	),
	args: {
		space: 2,
	},
};

export const CollapseUntilTablet: Story = {
	...InlineTemplate,
	args: {
		space: 2,
		collapseUntil: 'tablet',
	},
	parameters: {
		viewport: { defaultViewport: 'mobile' },
		chromatic: {
			viewports: [breakpoints.mobile],
		},
	},
};
