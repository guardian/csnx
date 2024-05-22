import type { Meta, StoryFn } from '@storybook/react';
import type { ContainerProps } from './Container';
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
	args: {
		sideBorders: false,
		topBorder: false,
	},
};

export default meta;

const Template: StoryFn<typeof Container> = (args: ContainerProps) => (
	<Container {...args}>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliud igitur esse
		censet gaudere, aliud non dolere. Quid turpius quam sapientis vitam ex
		insipientium sermone pendere? Nam illud quidem adduci vix possum, ut ea,
		quae senserit ille, tibi non vera videantur. At iam decimum annum in
		spelunca iacet.
	</Container>
);

export const Default: StoryFn<typeof Container> = Template.bind({});

// *****************************************************************************

export const WithSideBorders: StoryFn<typeof Container> = Template.bind({});
WithSideBorders.args = {
	sideBorders: true,
};

// *****************************************************************************

export const WithTopBorder: StoryFn<typeof Container> = Template.bind({});
WithTopBorder.args = {
	topBorder: true,
};

// *****************************************************************************

export const WithBorderColour: StoryFn<typeof Container> = Template.bind({});
WithBorderColour.args = {
	sideBorders: true,
	topBorder: true,
	borderColor: 'red',
};

// *****************************************************************************

export const WithBackgroundColour: StoryFn<typeof Container> = Template.bind(
	{},
);
WithBackgroundColour.args = {
	backgroundColor: 'red',
};

// *****************************************************************************

export const WithAsideElement: StoryFn<typeof Container> = Template.bind({});
WithAsideElement.args = {
	element: 'aside',
};

// *****************************************************************************
