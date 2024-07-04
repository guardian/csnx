import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
	title: 'React Components/Container',
	component: Container,
	argTypes: {
		border: {
			control: {
				disable: true,
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof Container>;

const ContainerTemplate: Story = {
	render: (args) => (
		<Container {...args}>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliud igitur esse
			censet gaudere, aliud non dolere. Quid turpius quam sapientis vitam ex
			insipientium sermone pendere? Nam illud quidem adduci vix possum, ut ea,
			quae senserit ille, tibi non vera videantur. At iam decimum annum in
			spelunca iacet.
		</Container>
	),
};

export const Default: Story = {
	...ContainerTemplate,
	args: {
		sideBorders: false,
		topBorder: false,
	},
};

export const WithSideBorders: Story = {
	...ContainerTemplate,
	args: {
		...Default.args,
		sideBorders: true,
	},
};

export const WithTopBorder: Story = {
	...ContainerTemplate,
	args: {
		...Default.args,
		topBorder: true,
	},
};

export const WithBorderColour: Story = {
	...ContainerTemplate,
	args: {
		...Default.args,
		sideBorders: true,
		topBorder: true,
		borderColor: 'red',
	},
};

export const WithBackgroundColour: Story = {
	...ContainerTemplate,
	args: {
		...Default.args,
		backgroundColor: 'red',
	},
};

export const WithAsideElement: Story = {
	...ContainerTemplate,
	args: {
		...Default.args,
		element: 'aside',
	},
};
