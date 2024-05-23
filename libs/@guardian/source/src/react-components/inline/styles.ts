import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { space } from '../../foundations';
import type { Space } from '../@types/Space';

export const inline = css`
	overflow: hidden;
`;

export const inlineWrapper = css`
	display: flex;
	flex-wrap: wrap;
`;

export const inlineSpace = (number: Space): SerializedStyles => css`
	margin: -${space[number] / 2}px;
	> * {
		margin: ${space[number] / 2}px;
	}
`;
