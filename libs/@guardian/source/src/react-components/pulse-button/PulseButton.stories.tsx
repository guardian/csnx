import { css } from '@emotion/react';
import { PulseProvider } from '@guardian/pulse';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PulseButton } from './PulseButton';

const meta: Meta<typeof PulseButton> = {
	title: 'React Components/Pulse Button',
	component: PulseButton,
};

export default meta;
type Story = StoryObj<typeof PulseButton>;

export const Default: Story = {
	args: {
		children: 'Primary button',
	},
	render: (args) => (
		<PulseProvider>
			<PulseButton {...args} />
		</PulseProvider>
	),
};

export const Inverse: Story = {
	args: {
		children: 'Primary button',
		style: 'inverse',
	},
	render: (args) => (
		<PulseProvider>
			<div
				css={css`
					background-color: var(--base-color-brand-blue-400);
					padding: var(--padding-200);
				`}
			>
				<PulseButton {...args} />
			</div>
		</PulseProvider>
	),
};

export const BrandsAndModes: Story = {
	args: {
		children: 'Subscribe now',
	},
	render: (args) => (
		<PulseProvider>
			<PulseButton {...args} />
			<PulseProvider theme="core-alt">
				<PulseButton {...args} />
			</PulseProvider>
			<PulseProvider mode="dark">
				<PulseButton {...args} />
				<PulseProvider theme="core-alt">
					<PulseButton {...args} />
				</PulseProvider>
			</PulseProvider>
		</PulseProvider>
	),
};
