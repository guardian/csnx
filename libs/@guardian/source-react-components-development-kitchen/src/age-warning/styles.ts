import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';

export const darkModeCss = (
	styles: TemplateStringsArray,
	...placeholders: string[]
): SerializedStyles => {
	const darkStyles = styles
		.map((style, i) => `${style}${placeholders[i] ? placeholders[i] : ''}`)
		.join('');
	return css`
		@media (prefers-color-scheme: dark) {
			${darkStyles}
		}
	`;
};
