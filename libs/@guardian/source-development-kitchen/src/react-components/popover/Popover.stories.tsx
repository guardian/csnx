import { css } from '@emotion/react';
import { palette, space } from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
	title: 'React Components/Popover',
	component: Popover,
	args: {
		title: 'Title',
		width: '250px',
		showPointer: true,
		position: 'top',
		content: (
			<>
				<span>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</span>
				<div
					css={css`
						margin-top: ${space[3]}px;
					`}
				>
					<LinkButton
						priority="primary"
						size="xsmall"
						href="https://www.theguardian.com/uk"
					>
						Primary button xs
					</LinkButton>
				</div>
			</>
		),
	},
	render: (args) => (
		<div
			css={css`
				position: relative;
				width: fit-content;
				margin: 200px 300px;
			`}
		>
			<Popover {...args} />
		</div>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Click trigger button', async () => {
			await userEvent.click(canvas.getByTestId('popover-trigger'));
		});
	},
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const WithTitleAndPointer: Story = {
	args: {
		showPointer: true,
		position: 'top',
	},
};

export const WithoutTitleAndPointer: Story = {
	args: {
		hideTitle: true,
		showPointer: false,
		position: 'top',
	},
};

export const WithDarkTheme: Story = {
	args: {
		showPointer: true,
		position: 'top',
		theme: {
			text: palette.neutral[97],
			background: palette.neutral[10],
			dismissButtonText: palette.neutral[100],
			dismissButtonBackground: palette.neutral[20],
			dismissButtonBackgroundHover: palette.neutral[38],
		},
	},
};

export const WithLightTheme: Story = {
	args: {
		title: 'Title',
		showPointer: true,
		position: 'top',
		theme: {
			text: palette.neutral[7],
			background: palette.neutral[100],
			dismissButtonText: palette.neutral[0],
			dismissButtonBackground: palette.neutral[97],
			dismissButtonBackgroundHover: palette.neutral[93],
		},
	},
};
