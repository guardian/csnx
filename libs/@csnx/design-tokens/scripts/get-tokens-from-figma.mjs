import fs from 'fs';
const headers = new Headers();
import { fileURLToPath } from 'url';
import { dirname } from 'path';

headers.append('X-FIGMA-TOKEN', process.env.FIGMA_TOKEN);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const requestOptions = {
	method: 'GET',
	headers: headers,
	redirect: 'follow',
};
/**
 * Converts a kebab-case string to camelCase.
 * @param {string} str - The kebab-case string to convert.
 * @returns {string} The converted camelCase string.
 */
function kebabToCamelCase(str) {
	return str
		.split('-')
		.map((word, index) => {
			if (index === 0) {
				return word; // Return the first word as is
			}
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join('');
}
/**
 * Converts a single RGB component to a hex string.
 * @param {number} c - The RGB component (either red, green, or blue) value.
 * @returns {string} The two-character hex representation of the RGB component.
 */
function componentToHex(c) {
	const hex = c.toString(16).toUpperCase();
	return hex.length === 1 ? '0' + hex : hex;
}

/**
 * Converts RGB color values to their hexadecimal color code.
 * @param {number} r - The red component of the color (0-255).
 * @param {number} g - The green component of the color (0-255).
 * @param {number} b - The blue component of the color (0-255).
 * @returns {string} The hexadecimal color code as a string.
 */
function rgbToHex(r, g, b) {
	return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/**
 * Extracts category and value from a variable's name.
 * @param {string} name - The name of the variable.
 * @returns {{category: string, value: string}} The extracted category and value.
 */
function extractCategoryAndValue(name) {
	const category = kebabToCamelCase(name.slice(0, name.lastIndexOf('-')));
	const value = name.split('-').slice(-1)[0];
	return { category, value };
}

/**
 * Converts RGB values from normalized format to 255 scale.
 * @param {object} rgbValues - The RGB values in normalized format.
 * @returns {{red: number, green: number, blue: number}} RGB values on a 0-255 scale.
 */
function normalizeRGBValues(rgbValues) {
	return {
		red: Math.round(rgbValues.r * 255),
		green: Math.round(rgbValues.g * 255),
		blue: Math.round(rgbValues.b * 255),
	};
}

/**
 * Processes a variable object and extracts color information if the variable type is 'COLOR'.
 * @param {object} variable - The variable object containing color data.
 * @returns {?{category: string, value: string, rgb: {red: number, green: number, blue: number}, hex: string}}
 *           An object containing color category, value, RGB and HEX values, or null if the variable type is not 'COLOR'.
 */
function processColorVariable(variable) {
	if (variable.resolvedType !== 'COLOR') {
		return null;
	}

	const { category, value } = extractCategoryAndValue(
		variable.name.split('/')[2],
	);
	const rgb = normalizeRGBValues(variable.valuesByMode?.['4:0']);
	const hex = rgbToHex(rgb.red, rgb.green, rgb.blue);

	return { category, value, rgb, hex };
}

/**
 * Restructures a color entry into a specific format.
 * @param {object} color - The color object to restructure.
 * @returns {object} The restructured color object.
 */
function restructureColor(color) {
	return {
		[color.value]: { $value: color.hex },
	};
}

/**
 * Processes an array of colors and organizes them into categories.
 * @param {Array} colors - The array of color objects.
 * @returns {object} An object with color categories as keys and restructured colors as values.
 */
function categorizeColors(colors) {
	return colors.reduce((acc, cur) => {
		const category = cur.category;
		const newEntry = restructureColor(cur);

		if (!(category in acc)) {
			acc[category] = {};
		}

		Object.assign(acc[category], newEntry);
		return acc;
	}, {});
}

const colours = [];
const response = await fetch(
	'https://api.figma.com/v1/files/pFyKEeR5PLCA3ZuUEOiXoR/variables/local',
	requestOptions,
);
const result = await response.text();
const data = JSON.parse(result);
if (data.status !== 200) {
	console.error(data.message ?? `Error occurred ${result}`);
	process.exit(0);
}
Object.values(data.meta.variables).forEach((variable) => {
	const colorInfo = processColorVariable(variable);
	if (colorInfo) {
		colours.push(colorInfo);
	}
});

const restructuredColors = categorizeColors(colours);

const tokensJson = fs.readFileSync(`${__dirname}/../tokens.json`).toString();
const currentTokens = JSON.parse(tokensJson);
const updatedTokens = { ...currentTokens };
updatedTokens.palette = { $type: 'color', ...restructuredColors };

fs.writeFile(
	`${__dirname}/../tokens.json`,
	JSON.stringify(updatedTokens, null, 2),
	'utf8',
	() => {},
);
