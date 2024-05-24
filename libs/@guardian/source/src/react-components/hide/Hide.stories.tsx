import type { Meta, StoryFn } from '@storybook/react';
import { breakpoints } from '../../foundations';
import type { HideProps } from './Hide';
import { Hide } from './Hide';

const meta: Meta<typeof Hide> = {
	title: 'React Components/Hide',
	component: Hide,
	argTypes: {
		above: {
			control: { disable: true },
		},
		below: {
			control: { disable: true },
		},
	},
};

export default meta;

const Template: StoryFn<typeof Hide> = (args: HideProps) => (
	<Hide {...args}>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliud igitur esse
		censet gaudere, aliud non dolere. Quid turpius quam sapientis vitam ex
		insipientium sermone pendere? Nam illud quidem adduci vix possum, ut ea,
		quae senserit ille, tibi non vera videantur. At iam decimum annum in
		spelunca iacet.
	</Hide>
);

// *****************************************************************************

export const HiddenFromTabletAtMobile: StoryFn<typeof Hide> = Template.bind({});
HiddenFromTabletAtMobile.args = {
	from: 'tablet',
};
HiddenFromTabletAtMobile.parameters = {
	viewport: { defaultViewport: 'mobile' },
	chromatic: {
		viewports: [breakpoints.mobile],
	},
};

// *****************************************************************************

export const HiddenFromTabletAtTablet: StoryFn<typeof Hide> = Template.bind({});
HiddenFromTabletAtTablet.args = {
	from: 'tablet',
};
HiddenFromTabletAtTablet.parameters = {
	viewport: { defaultViewport: 'tablet' },
	chromatic: {
		viewports: [breakpoints.tablet],
	},
};

// *****************************************************************************

export const HiddenUntilTabletAtMobile: StoryFn<typeof Hide> = Template.bind(
	{},
);
HiddenUntilTabletAtMobile.args = {
	until: 'tablet',
};
HiddenUntilTabletAtMobile.parameters = {
	viewport: { defaultViewport: 'mobile' },
	chromatic: {
		viewports: [breakpoints.mobile],
	},
};

// *****************************************************************************

export const HiddenUntilTabletAtTablet: StoryFn<typeof Hide> = Template.bind(
	{},
);
HiddenUntilTabletAtTablet.args = {
	until: 'tablet',
};
HiddenUntilTabletAtTablet.parameters = {
	viewport: { defaultViewport: 'tablet' },
	chromatic: {
		viewports: [breakpoints.tablet],
	},
};
