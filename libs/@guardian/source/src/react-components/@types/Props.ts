import type { SerializedStyles } from '@emotion/react';

export interface Props {
	className?: string;
	/**
	 * Override component styles by passing in the result of [emotion's `css` function/prop](https://emotion.sh/docs/introduction).
	 */
	cssOverrides?: SerializedStyles | SerializedStyles[];
	/**
	 * Do not use `css` on Source components, use `cssOverrides` instead.
	 *
	 * **Why?**
	 *
	 * `css` is an emotion prop, and while
	 * Source components _are_ emotion components, it's an internal implementation detail that is liable to break/change
	 * at any point.
	 */
	css?: never;
}
