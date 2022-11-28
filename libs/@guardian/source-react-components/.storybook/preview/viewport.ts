import type { Breakpoint } from '@guardian/source-foundations';
import { breakpoints } from '@guardian/source-foundations';

type ViewportMeta = {
	[key in Breakpoint]: {
		name: string;
		type: string;
	};
};
const viewportMeta: ViewportMeta = {
	mobile: {
		name: 'Mobile',
		type: 'mobile',
	},
	mobileMedium: {
		name: 'Mobile Medium',
		type: 'mobile',
	},
	mobileLandscape: {
		name: 'Mobile Landscape',
		type: 'mobile',
	},
	phablet: {
		name: 'Phablet',
		type: 'mobile',
	},
	tablet: {
		name: 'Tablet',
		type: 'tablet',
	},
	desktop: {
		name: 'Desktop',
		type: 'desktop',
	},
	leftCol: {
		name: 'Left Col',
		type: 'desktop',
	},
	wide: {
		name: 'Wide',
		type: 'desktop',
	},
};

type Viewports = {
	[key in Breakpoint]: {
		styles: {
			width: string;
			height: string;
		};
		type: string;
	};
};

const viewportEntries = Object.entries(breakpoints).map(([name, width]) => {
	return [
		name,
		{
			name: viewportMeta[name as Breakpoint].name,
			styles: {
				width: `${width}px`,
				height: '100%',
			},
			type: viewportMeta[name as Breakpoint].type,
		},
	];
});

const viewportEntriesObject = Object.fromEntries(viewportEntries) as Viewports;

export const viewport = {
	viewports: {
		responsive: {
			name: 'Responsive',
			styles: {
				width: '100%',
				height: '100%',
				border: 'none',
				display: 'block',
				margin: '0',
				boxShadow: 'none',
			},
		},
		...viewportEntriesObject,
	},
	defaultViewport: 'responsive',
};
