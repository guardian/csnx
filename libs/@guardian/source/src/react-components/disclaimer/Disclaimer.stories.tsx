import type { Meta, StoryObj } from '@storybook/react-vite';
import { palette } from '../../foundations';
import { Disclaimer } from './Disclaimer';

const meta: Meta<typeof Disclaimer> = {
	component: Disclaimer,
	title: 'React Components/Disclaimer',
};

export default meta;
type Story = StoryObj<typeof Disclaimer>;

const themeGlobals = {
	default: {},
	custom: {
		backgrounds: {
			value: 'palette.neutral[10]',
		},
	},
};

const disclaimerContent = (
	<p
		style={{
			marginInline: 'auto',
			marginTop: 0,
			marginBottom: 0,
			width: 'fit-content',
		}}
	>
		The Guardian’s journalism is independent. We will earn a commission if you
		buy something through an affiliate link.&nbsp;
		<a href="https://www.theguardian.com/info/2017/nov/01/reader-information-on-affiliate-links">
			Learn more
		</a>
		.
	</p>
);

export const LightTheme: Story = {
	render: (args) => <Disclaimer {...args}>{disclaimerContent}</Disclaimer>,
};

export const DarkTheme: Story = {
	args: {
		theme: {
			backgroundPrimary: palette.neutral[20],
			textPrimary: palette.neutral[86],
			linkPrimary: palette.lifestyle[450],
		},
	},
	globals: {
		...themeGlobals.custom,
	},
	render: (args) => <Disclaimer {...args}>{disclaimerContent}</Disclaimer>,
};
