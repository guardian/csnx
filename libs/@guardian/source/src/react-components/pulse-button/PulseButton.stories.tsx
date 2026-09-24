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

const Heading = ({ children }: { children: React.ReactNode }) => (
	<h2
		css={css`
			font: var(--fixed-heading-sans-bold-s);
			margin-top: var(--margin-200);
			margin-bottom: var(--margin-100);
			:first-of-type {
				margin-top: 0;
			}
		`}
	>
		{children}
	</h2>
);

const Section = ({
	style,
	mode,
	children,
}: {
	style: 'default' | 'inverse';
	mode: 'light' | 'dark';
	children: React.ReactNode;
}) => {
	const backgroundColour =
		mode === 'dark'
			? 'var(--base-color-dark-neutral-50)'
			: style === 'default'
				? 'transparent'
				: 'var(--base-color-brand-blue-400)';

	return (
		<section
			css={css`
				display: flex;
				flex-wrap: wrap;
				gap: var(--gap-200);
				padding: var(--padding-200);
				background-color: ${backgroundColour};
			`}
		>
			{children}
		</section>
	);
};

const ButtonThemes = ({ style }: { style: 'default' | 'inverse' }) =>
	themes.map((theme) => (
		<PulseProvider theme={theme} key={theme}>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					gap: var(--gap-200);
				`}
			>
				<PulseButton style={style}>Primary button</PulseButton>
				<PulseButton style={style} priority="secondary">
					Secondary button
				</PulseButton>
				<PulseButton style={style} priority="tertiary">
					Tertiary button
				</PulseButton>
			</div>
		</PulseProvider>
	));

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
			<Section style="inverse" mode="light">
				<PulseButton {...args} />
			</Section>
		</PulseProvider>
	),
};

export const Themes: Story = {
	render: () => (
		<PulseProvider>
			<Heading>Default (Light)</Heading>
			<Section style="default" mode="light">
				<ButtonThemes style="default" />
			</Section>
			<Heading>Inverse (Light)</Heading>
			<Section style="inverse" mode="light">
				<ButtonThemes style="inverse" />
			</Section>
			<PulseProvider mode="dark">
				<Heading>Default (Dark)</Heading>
				<Section style="default" mode="dark">
					<ButtonThemes style="default" />
				</Section>
				<Heading>Inverse (Dark)</Heading>
				<Section style="inverse" mode="dark">
					<ButtonThemes style="inverse" />
				</Section>
			</PulseProvider>
		</PulseProvider>
	),
};
