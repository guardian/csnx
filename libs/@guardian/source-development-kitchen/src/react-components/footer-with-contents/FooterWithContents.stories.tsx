import type { Meta, StoryFn } from '@storybook/react';
import { FooterLinks } from './FooterLinks';
import {
	DefaultFooterLinks,
	FooterLinksInColumns,
} from './FooterLinks.stories';
import type { FooterWithContentsProps } from './FooterWithContents';
import { FooterWithContents } from './FooterWithContents';

const meta: Meta<typeof FooterWithContents> = {
	title: 'React Components/FooterWithContents',
	component: FooterWithContents,
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;

const Template: StoryFn<typeof FooterWithContents> = (
	args: FooterWithContentsProps,
) => <FooterWithContents {...args} />;

// *****************************************************************************

export const DefaultFooterWithContents: StoryFn<typeof FooterWithContents> =
	Template.bind({});
DefaultFooterWithContents.args = {
	children: <FooterLinks {...DefaultFooterLinks.args} />,
};

// *****************************************************************************

export const FooterWithColumnLinks: StoryFn<typeof FooterWithContents> =
	Template.bind({});
FooterWithColumnLinks.args = {
	children: <FooterLinks {...FooterLinksInColumns.args} />,
};
