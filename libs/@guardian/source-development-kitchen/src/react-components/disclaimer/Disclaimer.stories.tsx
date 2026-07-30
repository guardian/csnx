import type { Meta, StoryObj } from '@storybook/react-vite';
import { Disclaimer } from './Disclaimer';

const meta: Meta<typeof Disclaimer> = {
	component: Disclaimer,
	title: 'React Components/Disclaimer',
};

export default meta;
type Story = StoryObj<typeof Disclaimer>;

export const Template: Story = {
	render: (args) => (
		<Disclaimer {...args}>
			<p style={{ marginInline: 'auto', width: 'fit-content' }}>
				The Guardian’s journalism is independent. We will earn a commission if
				you buy something through an affiliate link.&nbsp;
				<a href="https://www.theguardian.com/info/2017/nov/01/reader-information-on-affiliate-links">
					Learn more
				</a>
				.
			</p>
		</Disclaimer>
	),
};
