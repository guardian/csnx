import { css } from '@emotion/react';
import type { Breakpoint } from '@guardian/source-foundations';
import { space, until } from '@guardian/source-foundations';
import type { Space } from '../@types/Space';

export const inline = css`
	overflow: hidden;
`;

export const inlineWrapper = css`
	display: flex;
	flex-wrap: wrap;
`;

export const collapseBreakpoint = (breakpoint: Breakpoint) => css`
	${until[breakpoint]} {
		flex-direction: column;
	}
`;

export const inlineSpace = (number: Space) => css`
	margin: -${space[number] / 2}px;
	> * {
		margin: ${space[number] / 2}px;
	}
`;
