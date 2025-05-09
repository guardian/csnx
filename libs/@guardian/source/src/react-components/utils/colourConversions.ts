/*
	Implementation from https://github.com/Qix-/color-convert
*/

type RGB = [r: number, g: number, b: number];
type HSL = [h: number, s: number, l: number];

export const hexToHsl = (hex: string): HSL => rgbToHsl(hexToRgb(hex));

export const hexToRgb = (hex: string): RGB => {
	const match = hex.match(/[a-f\d]{6}|[a-f\d]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	let colorString = match[0];

	if (match[0].length === 3) {
		colorString = [...colorString].map((char) => char + char).join('');
	}

	const integer = Number.parseInt(colorString, 16);
	const r = (integer >> 16) & 0xff;
	const g = (integer >> 8) & 0xff;
	const b = integer & 0xff;

	return [r, g, b];
};

export const rgbToHsl = (rgb: RGB): HSL => {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const min = Math.min(r, g, b);
	const max = Math.max(r, g, b);
	const delta = max - min;
	let h = 0;
	let s;

	switch (max) {
		case min: {
			h = 0;

			break;
		}

		case r: {
			h = (g - b) / delta;

			break;
		}

		case g: {
			h = 2 + (b - r) / delta;

			break;
		}

		case b: {
			h = 4 + (r - g) / delta;

			break;
		}
		// No default
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	const l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
};

export const hslToHex = (hsl: HSL): string => rgbToHex(hslToRgb(hsl));

export const hslToRgb = (hsl: HSL): RGB => {
	const h = hsl[0] / 360;
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;
	let t3;
	let value;

	if (s === 0) {
		value = l * 255;
		return [value, value, value];
	}

	const t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;

	const t1 = 2 * l - t2;

	const rgb: RGB = [0, 0, 0];
	for (let i = 0; i < 3; i++) {
		t3 = h + (1 / 3) * -(i - 1);
		if (t3 < 0) {
			t3++;
		}

		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			value = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			value = t2;
		} else if (3 * t3 < 2) {
			value = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			value = t1;
		}

		rgb[i] = value * 255;
	}

	return rgb;
};

export const rgbToHex = (rgb: RGB): string => {
	const integer =
		((Math.round(rgb[0]) & 0xff) << 16) +
		((Math.round(rgb[1]) & 0xff) << 8) +
		(Math.round(rgb[2]) & 0xff);

	const string = integer.toString(16).toUpperCase();
	return '000000'.slice(string.length) + string;
};

/* LICENSE

Copyright (c) 2011-2016 Heather Arthur <fayearthur@gmail.com>.
Copyright (c) 2016-2021 Josh Junon <josh@junon.me>.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
