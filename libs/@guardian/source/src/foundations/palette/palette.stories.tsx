import { palette as colours } from './palette';
import { ColorItem, ColorPalette } from './storybookColorPalette';

export const Palette = {
	render: () => (
		<ColorPalette>
			{Object.entries(colours).map(([category, shades]) => {
				const usableShades = { ...shades };

				// These colours have been deprecated and should not be documented.
				if (category === 'opinion') {
					delete usableShades['300' as keyof typeof usableShades];
				}
				if (category === 'culture') {
					delete usableShades['350' as keyof typeof usableShades];
				}

				return (
					<ColorItem
						key={category}
						title={category}
						colors={{
							...usableShades,
						}}
					/>
				);
			})}
		</ColorPalette>
	),

	name: 'palette',
};

export default {
	title: 'Foundations/palette',
	component: Palette,

	parameters: {
		previewTabs: {
			canvas: {
				hidden: true,
			},
		},

		viewMode: 'docs',
	},
};
