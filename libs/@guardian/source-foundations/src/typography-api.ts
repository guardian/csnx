import {
	bodyObjectStyles,
	headlineObjectStyles,
	textSansObjectStyles,
	titlepieceObjectStyles,
} from '.';
import { body, headline, textSans, titlepiece } from './typography';
import { lineHeights } from './typography/data';
import type {
	BodySizes,
	Categories,
	FontScaleArgs,
	FontStyle,
	FontWeight,
	HeadlineSizes,
	LineHeight,
	TextSansSizes,
	TitlepieceSizes,
} from './typography/types';

/**
 * Enumerate all combinations of font family, size and options, and collect
 * output from typography API as CSS abd object style CSS.
 */

/**
 * Allowed font style and weight combinations for each font family
 */
const typographicOptions: Record<
	keyof Categories,
	{ fontWeight: FontWeight; fontStyle: FontStyle }[]
> = {
	textSans: [
		{ fontStyle: 'normal', fontWeight: 'regular' },
		{ fontStyle: 'normal', fontWeight: 'bold' },
		{ fontStyle: 'italic', fontWeight: 'regular' },
	],
	body: [
		{ fontStyle: 'normal', fontWeight: 'regular' },
		{ fontStyle: 'normal', fontWeight: 'bold' },
		{ fontStyle: 'italic', fontWeight: 'regular' },
		{ fontStyle: 'italic', fontWeight: 'bold' },
	],
	headline: [
		{ fontStyle: 'normal', fontWeight: 'light' },
		{ fontStyle: 'normal', fontWeight: 'medium' },
		{ fontStyle: 'normal', fontWeight: 'bold' },
		{ fontStyle: 'italic', fontWeight: 'light' },
		{ fontStyle: 'italic', fontWeight: 'medium' },
	],
	titlepiece: [{ fontStyle: 'normal', fontWeight: 'bold' }],
};

let output = '';

/**
 * Iterate over all line height values. There are no restrictions on how these
 * can be combined with the other API options.
 */
for (const lineHeight of Object.keys(lineHeights)) {
	/**
	 * Iterate over text sizes and allowed combinations of font style and weight
	 * for each font family
	 */
	for (const textSansSize of Object.keys(textSans)) {
		for (const textSansOptions of typographicOptions.textSans) {
			const textSansConfig: FontScaleArgs = {
				...textSansOptions,
				lineHeight: lineHeight as LineHeight,
			};

			output += `
				textSans.${textSansSize}(${JSON.stringify(textSansConfig)})

				${JSON.stringify(
					textSansObjectStyles[textSansSize as keyof TextSansSizes](
						textSansConfig,
					),
				)}

				${textSans[textSansSize as keyof TextSansSizes](textSansConfig)}
			`;
		}
	}

	for (const bodySize of Object.keys(body)) {
		for (const bodyOptions of typographicOptions.body!) {
			const bodyConfig: FontScaleArgs = {
				...bodyOptions,
				lineHeight: lineHeight as LineHeight,
			};

			output += `
				body.${bodySize}(${JSON.stringify(bodyConfig)})

				${JSON.stringify(bodyObjectStyles[bodySize as keyof BodySizes](bodyConfig))}

				${body[bodySize as keyof BodySizes](bodyConfig)}
			`;
		}
	}

	for (const headlineSize of Object.keys(headline)) {
		for (const headlineOptions of typographicOptions.headline!) {
			const headlineConfig: FontScaleArgs = {
				...headlineOptions,
				lineHeight: lineHeight as LineHeight,
			};

			output += `
				headline.${headlineSize}(${JSON.stringify(headlineConfig)})

				${JSON.stringify(
					headlineObjectStyles[headlineSize as keyof HeadlineSizes](
						headlineConfig,
					),
				)}

				${headline[headlineSize as keyof HeadlineSizes](headlineConfig)}
			`;
		}
	}

	for (const titlepieceSize of Object.keys(titlepiece)) {
		for (const titlepieceOptions of typographicOptions.titlepiece!) {
			const titlepieceConfig: FontScaleArgs = {
				...titlepieceOptions,
				lineHeight: lineHeight as LineHeight,
			};

			output += `
				titlepiece.${titlepieceSize}(${JSON.stringify(titlepieceConfig)})

				${JSON.stringify(
					titlepieceObjectStyles[titlepieceSize as keyof TitlepieceSizes](
						titlepieceConfig,
					),
				)}

				${titlepiece[titlepieceSize as keyof TitlepieceSizes](titlepieceConfig)}
			`;
		}
	}
}

console.log(output.replace(/\t/g, ''));
