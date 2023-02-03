import type { Story } from '@storybook/react';

import { Button } from './Button';
import type { ButtonProps } from './Button';
import styled from '@emotion/styled';

export default {
	title: 'Styled Button',
	component: Button,
	args: {
		children: "This button's styles are applied in the component",
	},
};

const Template: Story<ButtonProps> = (args: ButtonProps) => (
	<Button {...args} />
);

const overrideStyles = {
	backgroundColor: 'yellow',
};

// *****************************************************************************

export const Default = Template.bind({});

export const InlineOverride = Template.bind({});
InlineOverride.args = {
	style: overrideStyles,
	children: 'Inline styles override the defaults',
};

export const EmotionOverride: any = styled(Button)(overrideStyles);
EmotionOverride.args = {
	children: 'Emotion overrides the defaults',
};
