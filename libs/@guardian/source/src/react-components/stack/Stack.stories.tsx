import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { palette, space } from '../../foundations';
import { Stack } from './Stack';

const meta: Meta<typeof Stack> = {
	title: 'React Components/Stack',
	component: Stack,
};

export default meta;
type Story = StoryObj<typeof Stack>;

const wrapper = css`
	outline: 1px dashed ${palette.neutral[46]};
`;

const box = css`
	display: grid;
	place-items: center;
	height: ${space[12]}px;
	background: ${palette.news[600]};
`;

const StackTemplate: Story = {
	render: (args) => (
		<div css={wrapper}>
			<Stack {...args}>
				<div css={box}>1</div>
				<div css={box}>2</div>
				<div css={box}>3</div>
			</Stack>
		</div>
	),
};

export const Default: Story = {
	...StackTemplate,
};

export const Space0: Story = {
	...StackTemplate,
	args: {
		space: 0,
	},
};

export const Space1: Story = {
	...StackTemplate,
	args: {
		space: 1,
	},
};

export const Space2: Story = {
	...StackTemplate,
	args: {
		space: 2,
	},
};

export const Space3: Story = {
	...StackTemplate,
	args: {
		space: 3,
	},
};

export const Space4: Story = {
	...StackTemplate,
	args: {
		space: 4,
	},
};

export const Space5: Story = {
	...StackTemplate,
	args: {
		space: 5,
	},
};

export const Space6: Story = {
	...StackTemplate,
	args: {
		space: 6,
	},
};

export const Space8: Story = {
	...StackTemplate,
	args: {
		space: 8,
	},
};

export const Space9: Story = {
	...StackTemplate,
	args: {
		space: 9,
	},
};

export const Space10: Story = {
	...StackTemplate,
	args: {
		space: 10,
	},
};

export const Space12: Story = {
	...StackTemplate,
	args: {
		space: 12,
	},
};

export const Space14: Story = {
	...StackTemplate,
	args: {
		space: 14,
	},
};

export const Space16: Story = {
	...StackTemplate,
	args: {
		space: 16,
	},
};

export const Space18: Story = {
	...StackTemplate,
	args: {
		space: 18,
	},
};

export const Space24: Story = {
	...StackTemplate,
	args: {
		space: 24,
	},
};
