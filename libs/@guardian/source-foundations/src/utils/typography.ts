const REGEX_FONT_SIZE = /font-size:\s(\d+\.\d+)rem/;

export const presetToPx = (preset: string) => {
	const matches = preset.match(REGEX_FONT_SIZE);
	if (matches?.[1]) {
		const pxVal = parseFloat(matches[1]) * 16;
		return preset.replace(REGEX_FONT_SIZE, `font-size: ${pxVal}px`);
	}
	return preset;
};
