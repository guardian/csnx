import { css } from '@emotion/react';
import { SvgInfoRound } from '@guardian/source/react-components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Popover } from './Popover';

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
		ctaButtonText: 'Primary button xs',
		ctaButtonOnClick: fn(),
		position: 'top',
		showPointer: true,
		refButtonOverrides: {
			icon: <SvgInfoRound />,
			size: 'xsmall',
			priority: 'tertiary',
			hideLabel: true,
		},
		width: 200,
	},
	render: (args) => (
		<div
			css={css`
				position: relative;
				width: fit-content;
				left: 300px;
				top: 300px;
			`}
		>
			<Popover {...args} theme="medium" />
		</div>
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
		ctaButtonText: undefined,
	},
};
