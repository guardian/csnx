import fs from 'node:fs';
import { tokens } from '@guardian/design-tokens';
import { fontArrayToString, pxStringToRem } from '../src/utils/convert-value';

const STRIP_WHITESPACE = /^\s+/gm;
const STRIP_TABS = /^\t{3}|\t{2}/gm;

const { presets, fontSize, textDecorationThicknessForFontSize } =
	tokens.typography;

type FontSize = keyof typeof fontSize;

const textDecorationThickness = (size: string) =>
	textDecorationThicknessForFontSize[size.slice(0, -2) as FontSize];

console.log('Building typography presets…');

const presetTotal = Object.keys(presets).length;
const cssOutputPath = `${process.cwd()}/src/typography/css.ts`;
const objectOutputPath = `${process.cwd()}/src/typography/objects.ts`;

const banner = `
	// Typography presets
	// Auto-generated by scripts/build-type-presets.ts
	// DO NOT EDIT
`.replace(STRIP_WHITESPACE, '');

// Generate CSS representation of presets as a string
const css = Object.entries(presets)
	.map(
		([preset, properties]) => `
			export const ${preset} = \`
				font-family: ${fontArrayToString(properties.fontFamily)};
				font-size: ${pxStringToRem(properties.fontSize)}rem;
				line-height: ${properties.lineHeight};
				font-weight: ${properties.fontWeight};
				font-style: ${properties.fontStyle};
				--source-text-decoration-thickness: ${textDecorationThickness(properties.fontSize)};
			\`;
		`,
	)
	.join('')
	.replace(STRIP_TABS, '');

// Generate object literal representation of presets
const object = Object.entries(presets)
	.map(
		([preset, properties]) => `
			export const ${preset}Object = {
				fontFamily: '${fontArrayToString(properties.fontFamily)}',
				fontSize: '${pxStringToRem(properties.fontSize)}rem',
				lineHeight: ${properties.lineHeight},
				fontWeight: ${properties.fontWeight},
				fontStyle: '${properties.fontStyle}',
			};
		`,
	)
	.join('')
	.replace(STRIP_TABS, '');

fs.writeFileSync(cssOutputPath, banner + css);
fs.writeFileSync(objectOutputPath, banner + object);
console.log(`✓ ${presetTotal} presets built`);
