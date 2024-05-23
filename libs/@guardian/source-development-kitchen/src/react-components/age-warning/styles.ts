import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';

export const darkModeCss =
	(supportsDarkMode: boolean) =>
	(styles: TemplateStringsArray, ...placeholders: string[]): SerializedStyles =>
		supportsDarkMode
			? css`
					@media (prefers-color-scheme: dark) {
						${styles
							.map((style, i) => {
								const placeholder = placeholders[i];
								if (placeholder) {
									return `${style}${placeholder ? placeholder : ''}`;
								}
								return style;
							})
							.join('')}
					}
				`
			: css``;
