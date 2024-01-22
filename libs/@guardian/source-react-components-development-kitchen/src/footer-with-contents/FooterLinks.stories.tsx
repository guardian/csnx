import type { Meta, StoryFn } from '@storybook/react';
import type { FooterLinksProps } from './FooterLinks';
import { defaultGuardianLinks, FooterLinks } from './FooterLinks';

const meta: Meta<typeof FooterLinks> = {
	title: 'FooterLinks',
	component: FooterLinks,
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;

const Template: StoryFn<typeof FooterLinks> = (args: FooterLinksProps) => (
	<FooterLinks {...args} />
);

// *****************************************************************************

export const DefaultFooterLinks: StoryFn<typeof FooterLinks> = Template.bind(
	{},
);

// *****************************************************************************

export const FooterLinksInColumns: StoryFn<typeof FooterLinks> = Template.bind(
	{},
);
FooterLinksInColumns.args = {
	links: [
		...defaultGuardianLinks,
		{
			href: '/',
			text: 'About us',
		},
	],
};

// *****************************************************************************

export const FooterLinksWithFooterButton: StoryFn<typeof FooterLinks> =
	Template.bind({});
FooterLinksWithFooterButton.args = {
	links: [
		...defaultGuardianLinks,
		{
			text: 'Hello world',
			onClick: () => alert('Hello world'),
		},
	],
};
