import { useState } from 'react';
import { ColorItem } from '../palette/storybookColorPalette';
import { calculateHoverColour } from './hoverColour';

export const HoverColours = {
	render: () => {
		const [inputColour, setInputColour] = useState('#AD99C2');
		const calculatedHoverColour = calculateHoverColour(inputColour);
		return (
			<>
				<label htmlFor="colour-picker">Pick a colour: </label>
				<input
					id="colour-picker"
					title="Pick a colour"
					value={inputColour}
					type="color"
					onChange={(e) => {
						setInputColour(e.target.value);
					}}
				/>
				<ColorItem title={'Chosen colour'} colors={[inputColour]} />
				<ColorItem
					title={'Calculated button hover colour'}
					colors={[calculatedHoverColour]}
				/>
			</>
		);
	},

	name: 'Hover colours',
};

export default {
	title: 'Foundations/Hover Colours',
	component: HoverColours,

	parameters: {
		previewTabs: {
			canvas: {
				hidden: true,
			},
		},

		viewMode: 'docs',
	},
};
