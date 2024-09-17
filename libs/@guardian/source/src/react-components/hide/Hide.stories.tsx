import { breakpoints } from '../../foundations';
import type { Meta, StoryObj } from '@csnx/storybooks/react';
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
type Story = StoryObj<typeof Hide>;

const Template: Story = {
	render: (args) => (
		<Hide {...args}>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliud igitur esse
			censet gaudere, aliud non dolere. Quid turpius quam sapientis vitam ex
			insipientium sermone pendere? Nam illud quidem adduci vix possum, ut ea,
			quae senserit ille, tibi non vera videantur. At iam decimum annum in
			spelunca iacet.
		</Hide>
	),
};

export const HiddenFromTabletAtMobile: Story = {
	...Template,
	args: {
		from: 'tablet',
	},
	parameters: {
		viewport: { defaultViewport: 'mobile' },
		chromatic: {
			viewports: [breakpoints.mobile],
		},
	},
};

export const HiddenFromTabletAtTablet: Story = {
	...HiddenFromTabletAtMobile,
	parameters: {
		viewport: { defaultViewport: 'tablet' },
		chromatic: {
			viewports: [breakpoints.tablet],
		},
	},
};

export const HiddenUntilTabletAtMobile: Story = {
	...Template,
	args: {
		until: 'tablet',
	},
	parameters: {
		viewport: { defaultViewport: 'mobile' },
		chromatic: {
			viewports: [breakpoints.mobile],
		},
	},
};

export const HiddenUntilTabletAtTablet: Story = {
	...HiddenUntilTabletAtMobile,
	parameters: {
		viewport: { defaultViewport: 'tablet' },
		chromatic: {
			viewports: [breakpoints.tablet],
		},
	},
};
