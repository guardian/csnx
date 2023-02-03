import type { Story } from '@storybook/react';
import styled from '@emotion/styled';

import { Button, ButtonStyle } from './Button';
import type { ButtonProps } from './Button';

import styles from './button.module.css';

export default {
	title: 'Unstyled Button',
	component: Button,
	args: {
		children: "This button's styles are applied by the consumer",
	},
};

const Template: Story<ButtonProps> = (args: ButtonProps) => (
	<Button {...args} />
);

// *****************************************************************************

export const InlineStyles = Template.bind({});
InlineStyles.args = {
	style: ButtonStyle,
};

export const Emotion: any = styled(Button)(ButtonStyle);

export const CssModule = Template.bind({});
CssModule.args = {
	className: styles.button,
};
