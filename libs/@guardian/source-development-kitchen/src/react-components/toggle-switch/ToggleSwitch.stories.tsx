import { css } from '@emotion/react';
import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { ToggleSwitch } from './ToggleSwitch';
import type { ToggleSwitchProps } from './ToggleSwitch';

const meta: Meta<typeof ToggleSwitch> = {
	title: 'React Components/ToggleSwitch',
	component: ToggleSwitch,
};

export default meta;

const Template: StoryFn<typeof ToggleSwitch> = (args: ToggleSwitchProps) => {
	const [checked, setChecked] = useState(args.checked);
	return (
		<div
			css={css`
				padding: 10px;
				margin: 10px 0;
				width: 350px;
			`}
		>
			<ToggleSwitch
				{...args}
				checked={checked}
				onClick={() => {
					setChecked(!checked);
				}}
			/>
		</div>
	);
};

export const WithNoLabel: StoryFn<typeof ToggleSwitch> = Template.bind({});

// *****************************************************************************

export const WithLabel: StoryFn<typeof ToggleSwitch> = Template.bind({});
WithLabel.args = {
	label: 'Get alerts on this story',
};

// *****************************************************************************

export const WithLabelLeft: StoryFn<typeof ToggleSwitch> = Template.bind({});
WithLabelLeft.args = {
	label: 'Get alerts on this story',
	labelPosition: 'left',
};

// *****************************************************************************

export const WithBorder: StoryFn<typeof ToggleSwitch> = Template.bind({});
WithBorder.args = {
	label: 'Get alerts on this story',
	labelBorder: true,
};

// *****************************************************************************

export const WithMediumFont: StoryFn<typeof ToggleSwitch> = Template.bind({});
WithMediumFont.args = {
	label: 'Get alerts on this story',
	fontSize: 'medium',
};

// *****************************************************************************

export const WithBoldFont: StoryFn<typeof ToggleSwitch> = Template.bind({});
WithBoldFont.args = {
	label: 'Get alerts on this story',
	fontWeight: 'bold',
};

// *****************************************************************************

export const WithBoldMediumFont: StoryFn<typeof ToggleSwitch> = Template.bind(
	{},
);
WithBoldMediumFont.args = {
	label: 'Get alerts on this story',
	fontWeight: 'bold',
	fontSize: 'medium',
};

// *****************************************************************************

export const WithMediumFontAndBorder: StoryFn<typeof ToggleSwitch> =
	Template.bind({});
WithMediumFontAndBorder.args = {
	label: 'Get alerts on this story',
	fontSize: 'medium',
	labelBorder: true,
};

// *****************************************************************************

export const WithBoldMediumFontAndBorder: StoryFn<typeof ToggleSwitch> =
	Template.bind({});
WithBoldMediumFontAndBorder.args = {
	label: 'Get alerts on this story',
	fontWeight: 'bold',
	fontSize: 'medium',
	labelBorder: true,
};
