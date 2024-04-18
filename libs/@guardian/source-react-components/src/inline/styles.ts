import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import type { InlineSpace } from './@types/InlineSpace';

export const inline = css`
	overflow: hidden;
`;

export const inlineWrapper = css`
	display: flex;
	flex-wrap: wrap;
`;

export const inlineSpace = (number: InlineSpace): SerializedStyles => css`
	margin: -${space[number] / 2}px;
	> * {
		margin: ${space[number] / 2}px;
	}
`;
