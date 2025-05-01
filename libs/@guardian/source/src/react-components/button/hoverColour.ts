import convert from 'color-convert';

export const calculateHoverColour = (
	backgroundColour: string,
	borderColour?: string,
): string => {
	if (backgroundColour === 'transparent') {
		if (borderColour !== undefined) {
			return calculateTransparentBackgroundHover(borderColour);
		}
		return backgroundColour;
	}

	const [h, s, l] = convert.hex.hsl(backgroundColour);

	const luminosityAdjustment = calculateLuminosityAdjustment(l);

	const hex = convert.hsl.hex([h, s, l + luminosityAdjustment]);

	return `#${hex}`;
};

/*
	Returns a percentage to adjust the luminosity by based on our design rules
	Either a negative number to darken or a positive to lighten the colour
*/
const calculateLuminosityAdjustment = (luminosity: number): number => {
	// Very Dark
	if (luminosity <= 10) {
		return 20;
	}
	// Dark
	if (luminosity <= 20) {
		return -8;
	}
	// Medium
	if (luminosity <= 80) {
		return -5;
	}
	// Light
	if (luminosity <= 90) {
		return -7;
	}
	// Very Light
	return -10;
};

/*
	If the button has a border with a transparent background,
	the hover colour is derived from the border colour,
	with its opacity adjusted
*/
const calculateTransparentBackgroundHover = (borderColour: string): string => {
	const [, , luminosity] = convert.hex.hsl(borderColour);
	const [r, g, b] = convert.hex.rgb(borderColour);

	const opacity = calculateOpacityForTransparentBackground(luminosity);

	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const calculateOpacityForTransparentBackground = (
	luminosity: number,
): number => {
	if (luminosity <= 40) {
		return 0.1;
	}
	if (luminosity <= 50) {
		return 0.15;
	}
	return 0.2;
};
