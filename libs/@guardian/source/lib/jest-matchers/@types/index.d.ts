declare namespace jest {
	interface Matchers<R> {
		toBeValidCSS(options?: CSSMatcherOptions): R;
		toMatchCSS(expected: string, options?: CSSMatcherOptions): R;
	}
}

type CSSMatcherOptions = {
	/**
	 * Set this to true if the CSS is a fragment (e.g. not wrapped in a selector and valid on its own)
	 */
	isFragment?: boolean;
};
