declare namespace jest {
	interface Matchers<R> {
		toBeValidCSS(options?: ToBeValidCSSOptions): R;
	}
}

type ToBeValidCSSOptions = {
	/**
	 * Set this to true if the CSS is a fragment (e.g. not wrapped in a selector and valid on its own)
	 */
	isFragment?: boolean;
};
