import { palette as colours } from './palette';
import { ColorPalette, ColorItem } from './storybookColorPalette';

export default {
	title: 'palette',

	parameters: {
		previewTabs: {
			canvas: {
				hidden: true,
			},
		},

		viewMode: 'docs',
	},
};

export const Palette = {
	render: () => (
		<ColorPalette>
			{Object.entries(colours).map(([category, shades]) => {
				/* Storybook is adding displayName and __docgenInfo to exported TS enum:
						https://github.com/storybookjs/storybook/issues/9832 */
				// These colours have been deprecated and should not be used.
				// Skip deprecated colours
				if (category !== '__docgenInfo' && category !== 'displayName') {
					const deprecatedColours = {
						opinion: ['300'],
						culture: ['350'],
					};

					const shadesWithoutDeprecated = {};

					for (const shade in shades) {
						const isShadeDeprecated =
							deprecatedColours[category] &&
							deprecatedColours[category].includes(shade);

						if (isShadeDeprecated) {
							continue;
						} else {
							shadesWithoutDeprecated[shade] = shades[shade];
						}
					}

					return (
						<ColorItem
							key={category}
							title={category}
							colors={{
								...shadesWithoutDeprecated,
							}}
						/>
					);
				}
			})}
		</ColorPalette>
	),

	name: 'palette',
};
