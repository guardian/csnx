import { css } from '@emotion/react';
import type { Meta, StoryFn } from '@storybook/react';
import { palette, space } from '../../foundations';
import type { InlineProps } from './Inline';
import { Inline } from './Inline';

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

export const MultipleChildElements: StoryFn<typeof Inline> = Template.bind({});
MultipleChildElements.args = {
	space: 2,
	children: Array.from({ length: 24 }, (_, i) => (
		<div key={i} css={box}>
			{i + 1}
		</div>
	)),
};
