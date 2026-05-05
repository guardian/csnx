import { css } from '@emotion/react';
import { textSans20 } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Popover } from './Popover';

const popoverWrapperStyles = css`
	${textSans20}
	margin: auto;
	padding: 20px;
	min-height: 200px;
`;
const meta: Meta<typeof Popover> = {
	title: 'React Components/Popover',
	component: Popover,
	args: {
		content: (
			<span>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua.
			</span>
		),
		onDismiss: fn(),
		title: 'Title',
		buttonText: 'Primary button xs',
		buttonOnClick: fn(),
	},
	render: (args) => (
		<>
			<div css={popoverWrapperStyles}>
				<h2>Medium</h2>
				<Popover {...args} />
			</div>
			<hr />

			<div css={popoverWrapperStyles}>
				<h2>Light</h2>
				<Popover {...args} theme="light" />
			</div>
			<hr />

			<div css={popoverWrapperStyles}>
				<h2>Dark</h2>
				<Popover {...args} theme="dark" />
			</div>
		</>
	),
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const WithTitle: Story = {};

export const WithoutTitle: Story = {
	args: {
		title: undefined,
	},
};

export const WithoutButton: Story = {
	args: {
		buttonText: undefined,
	},
};
