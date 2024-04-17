import type { Meta, StoryFn } from '@storybook/react';
import type { InlineProps } from './Inline';
import { Inline } from './Inline';
import { css } from '@emotion/react';
import { palette, space } from '@guardian/source-foundations';

const meta: Meta<typeof Inline> = {
	title: 'Inline',
	component: Inline,
};

export default meta;

const wrapper = css`
	outline: 1px dashed ${palette.neutral[46]};
`;

const box = css`
	display: grid;
	place-items: center;
	width: ${space[12]}px;
	height: ${space[12]}px;
	background: ${palette.news[600]};
`;

const Template: StoryFn<typeof Inline> = (args: InlineProps) => (
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
);

export const NoSpace: StoryFn<typeof Inline> = Template.bind({});

// *****************************************************************************

export const Space1: StoryFn<typeof Inline> = Template.bind({});
Space1.args = {
	space: 1,
};

// *****************************************************************************

export const Space2: StoryFn<typeof Inline> = Template.bind({});
Space2.args = {
	space: 2,
};

// *****************************************************************************

export const Space3: StoryFn<typeof Inline> = Template.bind({});
Space3.args = {
	space: 3,
};

// *****************************************************************************

export const Space4: StoryFn<typeof Inline> = Template.bind({});
Space4.args = {
	space: 4,
};

// *****************************************************************************

export const Space5: StoryFn<typeof Inline> = Template.bind({});
Space5.args = {
	space: 5,
};

// *****************************************************************************

export const Space6: StoryFn<typeof Inline> = Template.bind({});
Space6.args = {
	space: 6,
};

// *****************************************************************************

export const Space9: StoryFn<typeof Inline> = Template.bind({});
Space9.args = {
	space: 9,
};

// *****************************************************************************

export const Space12: StoryFn<typeof Inline> = Template.bind({});
Space12.args = {
	space: 12,
};

// *****************************************************************************

export const Space24: StoryFn<typeof Inline> = Template.bind({});
Space24.args = {
	space: 24,
};

// *****************************************************************************

export const LotsOfItems: StoryFn<typeof Inline> = Template.bind({});
LotsOfItems.args = {
	space: 2,
	children: [
		<div key={1} css={box}>
			1
		</div>,
		<div key={2} css={box}>
			2
		</div>,
		<div key={3} css={box}>
			3
		</div>,
		<div key={4} css={box}>
			4
		</div>,
		<div key={5} css={box}>
			5
		</div>,
		<div key={6} css={box}>
			6
		</div>,
		<div key={7} css={box}>
			7
		</div>,
		<div key={8} css={box}>
			8
		</div>,
		<div key={9} css={box}>
			9
		</div>,
		<div key={10} css={box}>
			10
		</div>,
		<div key={11} css={box}>
			11
		</div>,
		<div key={12} css={box}>
			12
		</div>,
		<div key={13} css={box}>
			13
		</div>,
		<div key={14} css={box}>
			14
		</div>,
		<div key={15} css={box}>
			15
		</div>,
		<div key={16} css={box}>
			16
		</div>,
		<div key={17} css={box}>
			17
		</div>,
		<div key={18} css={box}>
			18
		</div>,
		<div key={19} css={box}>
			19
		</div>,
		<div key={20} css={box}>
			20
		</div>,
	],
};
