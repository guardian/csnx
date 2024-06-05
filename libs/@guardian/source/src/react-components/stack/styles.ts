import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { space } from '../../foundations';
import type { Space } from '../@types/Space';

export const stack = css`
	& > * {
		width: 100%;
	}
`;

export const stackSpace = (number: Space): SerializedStyles => css`
	& > * + * {
		margin-top: ${space[number]}px;
	}
`;
