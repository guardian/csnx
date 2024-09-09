import { TypographyPresets } from './TypographyPresets';

export const Presets = {
	render: () => <TypographyPresets />,
	name: 'presets',
};

export default {
	title: 'Foundations/Typography',
	component: Presets,

	parameters: {
		previewTabs: {
			canvas: {
				hidden: true,
			},
		},

		viewMode: 'docs',
	},
};
