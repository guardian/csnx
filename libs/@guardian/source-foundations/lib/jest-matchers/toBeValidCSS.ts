import type { Warning } from 'lightningcss';
import { transform } from 'lightningcss';

expect.extend({
	/**
	 * Uses the lightningcss library to validate given CSS
	 *
	 * @param received - The CSS to validate
	 * @param options - Specify whether the CSS provided is a fragment (not wrapped in a selector)
	 */
	toBeValidCSS(
		received: string,
		options: CSSMatcherOptions = {},
	): jest.CustomMatcherResult {
		const { isFragment = false } = options;

		// We wrap the CSS in a selector if it is a fragment to ensure it is valid.
		const finalCSS = isFragment ? `* { ${received} }` : received;

		try {
			transform({
				code: Buffer.from(finalCSS, 'utf8'),
				filename: '',
			});

			return {
				pass: true,
				message: () => '',
			};
		} catch (error) {
			const message = (error as Warning).message;
			if (!message) throw error;
			return {
				pass: false,
				message: () => message,
			};
		}
	},
});
