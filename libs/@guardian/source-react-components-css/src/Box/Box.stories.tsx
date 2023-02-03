import { Box } from './Box';
import type { BoxProps } from './Box';
import { Story } from '@storybook/react';

export default {
	title: 'Box with CSS modules',
	component: Box,
	args: {
		children: "This box's styles are applied in the component",
	},
};

const Template: Story<BoxProps> = (args: BoxProps) => <Box {...args} />;

// *****************************************************************************

export const Default = Template.bind({});
Default.args = {
	children: 'this red text is a nested element',
};

export const InlineStyles = Template.bind({});
InlineStyles.args = {
	style: { color: 'blue' },
	children: 'You can only style the outermost element, this text is still red',
};
