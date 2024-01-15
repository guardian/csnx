import type { Meta, StoryFn } from '@storybook/react';
import type { StackProps } from './Stack';
import { Stack } from './Stack';

const meta: Meta<typeof Stack> = {
	title: 'Stack',
	component: Stack,
};

export default meta;

const Template: StoryFn<typeof Stack> = (args: StackProps) => (
	<Stack space={{ mobile: 4 }}>
		<div>Item 1</div>
		<div>Item 2</div>
		<div>Item 3</div>
	</Stack>
);

export const Default: StoryFn<typeof Stack> = Template.bind({});

// *****************************************************************************

export const Space1: StoryFn<typeof Stack> = Template.bind({});
Space1.args = {
	space: 1,
};

// *****************************************************************************

export const Space2: StoryFn<typeof Stack> = Template.bind({});
Space2.args = {
	space: 2,
};

// *****************************************************************************

export const Space3: StoryFn<typeof Stack> = Template.bind({});
Space3.args = {
	space: 3,
};

// *****************************************************************************

export const Space4: StoryFn<typeof Stack> = Template.bind({});
Space4.args = {
	space: 4,
};

// *****************************************************************************

export const Space5: StoryFn<typeof Stack> = Template.bind({});
Space5.args = {
	space: 5,
};

// *****************************************************************************

export const Space6: StoryFn<typeof Stack> = Template.bind({});
Space6.args = {
	space: 6,
};

// *****************************************************************************

export const Space9: StoryFn<typeof Stack> = Template.bind({});
Space9.args = {
	space: 9,
};

// *****************************************************************************

export const Space12: StoryFn<typeof Stack> = Template.bind({});
Space12.args = {
	space: 12,
};

// *****************************************************************************

export const Space24: StoryFn<typeof Stack> = Template.bind({});
Space24.args = {
	space: 24,
};

// *****************************************************************************

// export const Responsive = Template.bind({});
// Space24.args = {
// 	space: {{'mobile'}},
// };
