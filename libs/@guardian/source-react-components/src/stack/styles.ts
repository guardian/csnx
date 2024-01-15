import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import type { StackSpace } from './Stack';

export const stack = css`
	& > * {
		width: 100%;
	}
`;

export const stackSpace = (number: StackSpace): SerializedStyles => {
	if (typeof number === 'object') {
		return css``;
	}
	return css`
		& > * + * {
			margin-top: ${space[number]}px;
		}
	`;
};
