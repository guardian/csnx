import { css } from '@emotion/react';
import type { ReactNode } from 'react';
import { palette, space } from '../../foundations';

const exampleCss = css`
	padding: ${space[4]}px;
	border: 1px solid ${palette.neutral[86]};
	border-radius: 4px;
`;

const placeholderCss = css`
	display: grid;
	place-items: center;
	min-height: ${space[12]}px;
	min-width: ${space[12]}px;
	background: ${palette.news[600]};
`;

export const Example = ({ children }: { children: ReactNode }) => (
	<section css={exampleCss}>{children}</section>
);

export const Placeholder = ({ children }: { children: ReactNode }) => (
	<div css={placeholderCss}>{children}</div>
);
