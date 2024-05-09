import { css } from '@emotion/react';
import { palette, space } from '@guardian/source-foundations';
import type { Meta, StoryFn } from '@storybook/react';
import type { StackProps } from './Stack';
import { Stack } from './Stack';

const meta: Meta<typeof Stack> = {
	title: 'Stack',
	component: Stack,
};

export default meta;

const wrapper = css`
	outline: 1px dashed ${palette.neutral[46]};
`;

const box = css`
	display: grid;
	place-items: center;
	height: ${space[12]}px;
	background: ${palette.news[600]};
`;

const Template: StoryFn<typeof Stack> = (args: StackProps) => (
	<div css={wrapper}>
		<Stack {...args}>
			<div css={box}>1</div>
			<div css={box}>2</div>
			<div css={box}>3</div>
		</Stack>
	</div>
);

export const Default: StoryFn<typeof Stack> = Template.bind({});

// *****************************************************************************

export const Space0: StoryFn<typeof Stack> = Template.bind({});
Space0.args = {
	space: 0,
};

// *****************************************************************************

export const Space1: StoryFn<typeof Stack> = Template.bind({});
Space1.args = {
	space: 1,
};

// *****************************************************************************

export const Space2: StoryFn<typeof Stack> = Template.bind({});
Space2.args = {
	space: 2,
};

// *****************************************************************************

export const Space3: StoryFn<typeof Stack> = Template.bind({});
Space3.args = {
	space: 3,
};

// *****************************************************************************

export const Space4: StoryFn<typeof Stack> = Template.bind({});
Space4.args = {
	space: 4,
};

// *****************************************************************************

export const Space5: StoryFn<typeof Stack> = Template.bind({});
Space5.args = {
	space: 5,
};

// *****************************************************************************

export const Space6: StoryFn<typeof Stack> = Template.bind({});
Space6.args = {
	space: 6,
};

// *****************************************************************************

export const Space8: StoryFn<typeof Stack> = Template.bind({});
Space8.args = {
	space: 8,
};

// *****************************************************************************

export const Space9: StoryFn<typeof Stack> = Template.bind({});
Space9.args = {
	space: 9,
};

// *****************************************************************************

export const Space10: StoryFn<typeof Stack> = Template.bind({});
Space10.args = {
	space: 10,
};

// *****************************************************************************

export const Space12: StoryFn<typeof Stack> = Template.bind({});
Space12.args = {
	space: 12,
};

// *****************************************************************************

export const Space14: StoryFn<typeof Stack> = Template.bind({});
Space14.args = {
	space: 14,
};

// *****************************************************************************

export const Space16: StoryFn<typeof Stack> = Template.bind({});
Space16.args = {
	space: 16,
};

// *****************************************************************************

export const Space18: StoryFn<typeof Stack> = Template.bind({});
Space18.args = {
	space: 18,
};

// *****************************************************************************

export const Space24: StoryFn<typeof Stack> = Template.bind({});
Space24.args = {
	space: 24,
};
