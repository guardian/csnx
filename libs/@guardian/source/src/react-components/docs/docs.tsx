import { css } from '@emotion/react';
import type { ReactNode } from 'react';
import { article17, headlineBold20, palette, space } from '../../foundations';

const exampleCss = css`
	padding: ${space[4]}px;
	border: 1px solid ${palette.neutral[86]};
	border-radius: 4px;
`;

const placeholderCss = css`
	display: grid;
	place-items: center;
	padding: ${space[2]}px ${space[3]}px;
	background: ${palette.news[800]};
	border: 1px solid ${palette.news[600]};
	border-radius: 4px;
`;

const headingCss = css`
	${headlineBold20};
	margin: 0;
	padding: 0;
	border: none;
`;

const textCss = css`
	${article17};
	margin: 0;
	padding: 0;
`;

export const Example = ({ children }: { children: ReactNode }) => (
	<section css={exampleCss}>{children}</section>
);

export const Placeholder = ({ children }: { children: ReactNode }) => (
	<div css={placeholderCss}>{children}</div>
);

export const Heading = ({ children }: { children: ReactNode }) => (
	<div>
		<h3 css={headingCss}>{children}</h3>
	</div>
);

export const Text = ({ children }: { children: ReactNode }) => (
	<div>
		<p css={textCss}>{children}</p>
	</div>
);
