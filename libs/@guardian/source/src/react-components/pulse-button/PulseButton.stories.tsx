import { css } from '@emotion/react';
import { PulseProvider, type Theme } from '@guardian/pulse';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PulseButton } from './PulseButton';

const meta: Meta<typeof PulseButton> = {
	title: 'React Components/Pulse Button',
	component: PulseButton,
};

export default meta;
type Story = StoryObj<typeof PulseButton>;

const themes: Theme[] = [
	'core',
	'core-alt',
	'core-support',
	'culture',
	'lifestyle',
	'news',
	'opinion',
	'sport',
];

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

export const Themes: Story = {
	render: () => (
		<PulseProvider>
			<h2
				css={css`
					font: var(--fixed-heading-sans-bold-m);
				`}
			>
				Light
			</h2>
			<section
				css={css`
					display: flex;
					flex-wrap: wrap;
					gap: var(--gap-200);
					padding: var(--padding-200);
				`}
			>
				{themes.map((theme) => (
					<PulseProvider theme={theme} key={theme}>
						<PulseButton>Primary button</PulseButton>
					</PulseProvider>
				))}
			</section>
			<section
				css={css`
					display: flex;
					flex-wrap: wrap;
					gap: var(--gap-200);
					padding: var(--padding-200);
					background-color: var(--base-color-brand-blue-400);
				`}
			>
				{themes.map((theme) => (
					<PulseProvider theme={theme} key={theme}>
						<PulseButton style="inverse">Primary button</PulseButton>
					</PulseProvider>
				))}
			</section>
			<h2
				css={css`
					font: var(--fixed-heading-sans-bold-m);
				`}
			>
				Dark
			</h2>
			<PulseProvider mode="dark">
				<section
					css={css`
						display: flex;
						flex-wrap: wrap;
						gap: var(--gap-200);
						padding: var(--padding-200);
						background-color: var(--base-color-dark-neutral-50);
					`}
				>
					{themes.map((theme) => (
						<PulseProvider theme={theme} key={theme}>
							<PulseButton>Primary button</PulseButton>
						</PulseProvider>
					))}
				</section>
				<section
					css={css`
						display: flex;
						flex-wrap: wrap;
						gap: var(--gap-200);
						padding: var(--padding-200);
						background-color: var(--base-color-dark-neutral-50);
					`}
				>
					{themes.map((theme) => (
						<PulseProvider theme={theme} key={theme}>
							<PulseButton style="inverse">Primary button</PulseButton>
						</PulseProvider>
					))}
				</section>
			</PulseProvider>
		</PulseProvider>
	),
};
