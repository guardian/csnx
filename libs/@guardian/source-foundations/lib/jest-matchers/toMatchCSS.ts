import type { Warning } from 'lightningcss';
import { transform } from 'lightningcss';

expect.extend({
	/**
	 * Uses lightningcss library to normalise and compare given CSS
	 *
	 * @param received - The CSS to compare
	 * @param options - Specify whether the CSS being compared is a fragment (not wrapped in a selector)
	 */
	toMatchCSS(
		received: string,
		expected: string,
		options: CSSMatcherOptions = {},
	): jest.CustomMatcherResult {
		const { isFragment = false } = options;

		// We wrap the CSS in a selector if it is a fragment to ensure it is valid.
		const recievedCSS = isFragment ? `* { ${received} }` : received;
		const expectedCSS = isFragment ? `* { ${expected} }` : expected;

		try {
			const normalisedReceivedCSS = transform({
				code: Buffer.from(recievedCSS, 'utf8'),
				filename: '',
			});

			const normalisedExpectedCSS = transform({
				code: Buffer.from(expectedCSS, 'utf8'),
				filename: '',
			});

			if (
				normalisedReceivedCSS.code.toString() !==
				normalisedExpectedCSS.code.toString()
			) {
				throw new Error(
					'Received CSS does not match expected CSS\n\n' +
						normalisedReceivedCSS.code.toString(),
				);
			}

			return {
				pass: true,
				message: () => '',
			};
		} catch (error) {
			const message = (error as Warning).message;
			if (!message) {
				throw error;
			}
			return {
				pass: false,
				message: () => message,
			};
		}
	},
});
