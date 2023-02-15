import { breakpoints } from '@guardian/source-foundations';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

const customViewports = {
	desktop: {
		name: 'Wide',
		styles: {
			width: `${breakpoints.wide}px`,
			height: '100%',
		},
		type: 'wide',
	},
	desktop: {
		name: 'Desktop',
		styles: {
			width: `${breakpoints.desktop}px`,
			height: '100%',
		},
		type: 'desktop',
	},
	tablet: {
		name: 'Tablet',
		styles: {
			width: `${breakpoints.tablet}px`,
			height: MINIMAL_VIEWPORTS.tablet.styles.height,
		},
		type: 'tablet',
	},
	phablet: {
		name: 'Phablet',
		styles: {
			width: `${breakpoints.phablet}px`,
			height: MINIMAL_VIEWPORTS.mobile2.styles.height,
		},
		type: 'other',
	},
	mobileLandscape: {
		name: 'Mobile Landscape',
		styles: {
			width: `${breakpoints.mobileLandscape}px`,
			height: MINIMAL_VIEWPORTS.mobile2.styles.width,
		},
		type: 'mobile',
	},
	mobileMedium: {
		name: 'Mobile Medium',
		styles: {
			width: `${breakpoints.mobileMedium}px`,
			height: MINIMAL_VIEWPORTS.mobile2.styles.height,
		},
		type: 'mobile',
	},
	mobile: {
		name: 'Mobile',
		styles: {
			width: `${breakpoints.mobile}px`,
			height: MINIMAL_VIEWPORTS.mobile1.styles.height,
		},
		type: 'mobile',
	},
};

export const parameters = {
	viewport: {
		defaultViewport: 'wide',
		viewports: customViewports,
	},
};
