import { css } from '@emotion/react';
import { palette, space } from '@guardian/source/foundations';
import {
	Button,
	LinkButton,
	SvgInfoRound,
} from '@guardian/source/react-components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { userEvent, within } from 'storybook/test';
import { Popover, type PopoverProps } from './Popover';

const PopoverWithWrapper = (args: PopoverProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const handleButtonClick = () => setIsExpanded(!isExpanded);

	return (
		<div
			css={css`
				position: relative;
				width: fit-content;
				left: 300px;
				top: 200px;
				min-height: 300px;
			`}
		>
			<Popover
				{...args}
				anchorElement={
					<Button
						id="info-icon"
						icon={<SvgInfoRound />}
						size="xsmall"
						priority="secondary"
						hideLabel={true}
						onClick={handleButtonClick}
					>
						More information
					</Button>
				}
				isOpen={isExpanded}
				handleClose={() => setIsExpanded(false)}
			>
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
			</Popover>
		</div>
	);
};

const meta: Meta<typeof Popover> = {
	title: 'React Components/Popover',
	component: Popover,
	args: {
		title: 'Title',
		showPointer: true,
		width: '250px',
	},
	render: (args) => <PopoverWithWrapper {...args} />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Click anchor element', async () => {
			await userEvent.click(canvas.getByText('More information'));
		});
	},
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const WithTitleAndPointer: Story = {
	args: {
		title: 'Title',
		showPointer: true,
		position: 'top',
	},
};

export const WithoutTitleAndPointer: Story = {
	args: {
		title: undefined,
		showPointer: false,
		position: 'top',
	},
};

export const WithDarkTheme: Story = {
	args: {
		title: 'Title',
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
