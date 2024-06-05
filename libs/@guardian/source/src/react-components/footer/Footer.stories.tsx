import type { Meta, StoryFn } from '@storybook/react';
import { breakpoints } from '../../foundations';
import type { FooterProps } from './Footer';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
	component: Footer,
	title: 'React Components/Footer',
	argTypes: {
		children: {
			options: ['with', 'without'],
			mapping: {
				without: undefined,
				with: (
					<p>
						<strong>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						</strong>
						<br />
						Ut proverbia non nulla veriora sint quam vestra dogmata. Ampulla
						enim sit necne sit, quis non iure optimo irrideatur, si laboret?
						Quae quo sunt excelsiores, eo dant clariora indicia naturae.
					</p>
				),
			},
			control: { type: 'radio' },
		},
	},
};

export default meta;

const Template: StoryFn<typeof Footer> = (args: FooterProps) => (
	<Footer {...args} />
);

export const DefaultDefaultTheme: StoryFn<typeof Footer> = Template.bind({});
DefaultDefaultTheme.args = { children: 'with' };

export const DefaultTabletDefaultTheme: StoryFn<typeof Footer> = Template.bind(
	{},
);
DefaultTabletDefaultTheme.args = { children: 'with' };
DefaultTabletDefaultTheme.parameters = {
	viewport: { defaultViewport: 'tablet' },
	chromatic: {
		viewports: [breakpoints.tablet],
	},
};

export const DefaultMobileDefaultTheme: StoryFn<typeof Footer> = Template.bind(
	{},
);
DefaultMobileDefaultTheme.args = { children: 'with' };
DefaultMobileDefaultTheme.parameters = {
	viewport: { defaultViewport: 'mobileMedium' },
	chromatic: {
		viewports: [breakpoints.mobileMedium],
	},
};

export const WithBackToTopDefaultTheme: StoryFn<typeof Footer> = Template.bind(
	{},
);
WithBackToTopDefaultTheme.args = { showBackToTop: true, children: 'with' };

export const WithBackToTopTabletDefaultTheme: StoryFn<typeof Footer> =
	Template.bind({});
WithBackToTopTabletDefaultTheme.args = {
	showBackToTop: true,
	children: 'with',
};
WithBackToTopTabletDefaultTheme.parameters = {
	viewport: { defaultViewport: 'tablet' },
	chromatic: {
		viewports: [breakpoints.tablet],
	},
};

export const WithBackToTopMobileDefaultTheme: StoryFn<typeof Footer> =
	Template.bind({});
WithBackToTopMobileDefaultTheme.args = {
	showBackToTop: true,
	children: 'with',
};
WithBackToTopMobileDefaultTheme.parameters = {
	viewport: { defaultViewport: 'mobileMedium' },
	chromatic: {
		viewports: [breakpoints.mobileMedium],
	},
};

export const WithoutChildrenDefaultTheme: StoryFn<typeof Footer> =
	Template.bind({});
WithoutChildrenDefaultTheme.args = { children: 'without' };

export const WithoutChildrenTabletDefaultTheme: StoryFn<typeof Footer> =
	Template.bind({});
WithoutChildrenTabletDefaultTheme.args = { children: 'without' };
WithoutChildrenTabletDefaultTheme.parameters = {
	viewport: { defaultViewport: 'tablet' },
	chromatic: {
		viewports: [breakpoints.tablet],
	},
};

export const WithoutChildrenMobileDefaultTheme: StoryFn<typeof Footer> =
	Template.bind({});
WithoutChildrenMobileDefaultTheme.args = { children: 'without' };
WithoutChildrenMobileDefaultTheme.parameters = {
	viewport: { defaultViewport: 'mobileMedium' },
	chromatic: {
		viewports: [breakpoints.mobileMedium],
	},
};

export const WithoutChildrenWithBackToTopDefaultTheme: StoryFn<typeof Footer> =
	Template.bind({});
WithoutChildrenWithBackToTopDefaultTheme.args = {
	showBackToTop: true,
	children: 'without',
};

export const WithoutChildrenWithBackToTopTabletDefaultTheme: StoryFn<
	typeof Footer
> = Template.bind({});
WithoutChildrenWithBackToTopTabletDefaultTheme.args = {
	showBackToTop: true,
	children: 'without',
};
WithoutChildrenWithBackToTopTabletDefaultTheme.parameters = {
	viewport: { defaultViewport: 'tablet' },
	chromatic: {
		viewports: [breakpoints.tablet],
	},
};

export const WithoutChildrenWithBackToTopMobileDefaultTheme: StoryFn<
	typeof Footer
> = Template.bind({});
WithoutChildrenWithBackToTopMobileDefaultTheme.args = {
	showBackToTop: true,
	children: 'without',
};
WithoutChildrenWithBackToTopMobileDefaultTheme.parameters = {
	viewport: { defaultViewport: 'mobileMedium' },
	chromatic: {
		viewports: [breakpoints.mobileMedium],
	},
};
