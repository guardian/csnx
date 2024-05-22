import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryFn } from '@storybook/react';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
	title: 'Logo',
	component: Logo,
	args: {
		logoType: 'standard',
	},
	parameters: {
		backgrounds: {
			default: 'brandBackground.primary',
		},
	},
};

export default meta;

const TripleTemplate: StoryFn<typeof Logo> = () => (
	<div>
		<Logo logoType="standard" />
		<br />
		<Logo logoType="anniversary" />
		<br />
		<Logo logoType="bestWebsite" />
	</div>
);

// *****************************************************************************

export const Desktop: StoryFn<typeof Logo> = TripleTemplate.bind({});
Desktop.parameters = {
	viewport: {
		defaultViewport: 'desktop',
	},
	chromatic: {
		viewports: [breakpoints.desktop],
	},
};

// *****************************************************************************

export const Tablet: StoryFn<typeof Logo> = TripleTemplate.bind({});
Tablet.parameters = {
	viewport: {
		defaultViewport: 'tablet',
	},
	chromatic: {
		viewports: [breakpoints.tablet],
	},
};

// *****************************************************************************

export const MobileMedium: StoryFn<typeof Logo> = TripleTemplate.bind({});
MobileMedium.parameters = {
	viewport: {
		defaultViewport: 'mobileMedium',
	},
	chromatic: {
		viewports: [breakpoints.mobileMedium],
	},
};

// *****************************************************************************

export const Mobile: StoryFn<typeof Logo> = TripleTemplate.bind({});
Mobile.parameters = {
	viewport: {
		defaultViewport: 'mobile',
	},
	chromatic: {
		viewports: [breakpoints.mobile],
	},
};

// *****************************************************************************
