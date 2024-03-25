import { TypographyPresets } from './storybookTypographyPresets';

export default {
	title: 'Typography',

	parameters: {
		previewTabs: {
			canvas: {
				hidden: true,
			},
		},

		viewMode: 'docs',
	},
};

export const Presets = {
	render: () => <TypographyPresets />,
	name: 'presets',
};
