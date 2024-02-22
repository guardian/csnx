import { tokens } from '@guardian/design-tokens';
import { fontArrayToString } from '../utils/convert-value';

const { presets } = tokens.typography;

type Presets = keyof typeof presets;
const typography = {} as { [key in Presets]: string };

for (const [preset, properties] of Object.entries(presets)) {
	typography[preset as Presets] = `
		font-family: ${fontArrayToString(properties.fontFamily)};
		font-size: ${properties.fontSize};
		line-height: ${properties.lineHeight};
		font-weight: ${properties.fontWeight};
		font-style: ${properties.fontStyle};
	`;
}

export { typography };
