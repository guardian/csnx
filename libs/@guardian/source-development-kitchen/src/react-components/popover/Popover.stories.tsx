import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import {
	Button,
	LinkButton,
	SvgInfoRound,
} from '@guardian/source/react-components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
	title: 'React Components/Popover',
	component: Popover,
	args: {
		title: 'Title',
		position: 'top',
		showPointer: true,
		theme: 'medium',
	},
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks -- Storybook
		const [isExpanded, setIsExpanded] = useState(false);
		const handleButtonClick = () => {
			console.log('isExpanded?', isExpanded);
			setIsExpanded(!isExpanded);
		};

		return (
			<div
				css={css`
					position: relative;
					width: fit-content;
					left: 300px;
					top: 300px;
				`}
			>
				<Popover
					{...args}
					target={
						<Button
							icon={<SvgInfoRound />}
							size="xsmall"
							priority="tertiary"
							theme={{ borderTertiary: 'unset' }}
							hideLabel={true}
							onClick={handleButtonClick}
						/>
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
	},
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const WithTitle: Story = {};

export const WithoutTitle: Story = {
	args: {
		title: undefined,
	},
};
