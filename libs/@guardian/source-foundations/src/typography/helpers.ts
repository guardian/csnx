import { tokens } from '@guardian/design-tokens';
import type { TypographyPreset } from './types';

const { textDecorationThicknessForFontSize, fontSize } = tokens.typography;
const fontSizeRegex = /font-size:\s(\d\.\d+)rem/;

type FontSize = keyof typeof fontSize;
export const textDecorationThicknessFromPreset = (
	typographyPreset?: TypographyPreset,
) => {
	if (typographyPreset) {
		const matches = typographyPreset.match(fontSizeRegex);
		if (matches?.[1]) {
			const rem = parseFloat(matches[1]);
			return textDecorationThicknessForFontSize[
				(rem * 16).toString() as FontSize
			];
		}
	}
	return 'auto';
};
