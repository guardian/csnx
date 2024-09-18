import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { ToggleSwitchApps } from './ToggleSwitchApps';
import type { ToggleSwitchAppsProps } from './ToggleSwitchApps';

const meta: Meta<typeof ToggleSwitchApps> = {
	title: 'React Components/ToggleSwitchApps',
	component: ToggleSwitchApps,
	args: {},
};

export default meta;

const Template: StoryFn<typeof ToggleSwitchApps> = (
	args: ToggleSwitchAppsProps,
) => {
	const [checked, setChecked] = useState(args.checked);
	return (
		<ToggleSwitchApps
			{...args}
			checked={checked}
			onClick={() => {
				setChecked(!checked);
			}}
		/>
	);
};

export const AndroidNoLabel: StoryFn<typeof ToggleSwitchApps> = Template.bind(
	{},
);
AndroidNoLabel.args = {
	platform: 'android',
};

// *****************************************************************************

export const IosNoLabel: StoryFn<typeof ToggleSwitchApps> = Template.bind({});
IosNoLabel.args = {
	platform: 'ios',
};

// *****************************************************************************

export const AndroidWithLabel: StoryFn<typeof ToggleSwitchApps> = Template.bind(
	{},
);
AndroidWithLabel.args = {
	label: 'Get alerts on this story',
	platform: 'android',
};

// *****************************************************************************

export const IosWithLabel: StoryFn<typeof ToggleSwitchApps> = Template.bind({});
IosWithLabel.args = {
	label: 'Get alerts on this story',
	platform: 'ios',
};

// *****************************************************************************

export const AndroidWithLabelLeft: StoryFn<typeof ToggleSwitchApps> =
	Template.bind({});
AndroidWithLabelLeft.args = {
	label: 'Get alerts on this story',
	labelPosition: 'left',
	platform: 'android',
};

// *****************************************************************************

export const IosWithLabelLeft: StoryFn<typeof ToggleSwitchApps> = Template.bind(
	{},
);
IosWithLabelLeft.args = {
	label: 'Get alerts on this story',
	labelPosition: 'left',
	platform: 'ios',
};
