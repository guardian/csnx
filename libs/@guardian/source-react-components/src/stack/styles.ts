import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { from, space } from '@guardian/source-foundations';
import type { Breakpoint } from '@guardian/source-foundations';
import type { StackSpace } from './Stack';

export const stack = css`
	& > * {
		width: 100%;
	}
`;

export const stackSpace = (spacing: StackSpace): SerializedStyles[] => {
	if (typeof spacing === 'object') {
		const styles = [
			css`
				& > * + * {
					margin-top: ${space[spacing.base]}px;
				}
			`,
		];

		const breakpoints = Object.keys(spacing) as (Breakpoint | 'base')[];
		breakpoints.forEach((breakpoint) => {
			if (breakpoint !== 'base') {
				styles.push(css`
					${from[breakpoint]} {
						& > * + * {
							margin-top: ${space[spacing[breakpoint]!]}px;
						}
					}
				`);
			}
		});
		return styles;
	}

	return [
		css`
			& > * + * {
				margin-top: ${space[spacing]}px;
			}
		`,
	];
};
