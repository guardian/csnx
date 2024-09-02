import { isUndefined } from '@guardian/libs';
import type { HTMLAttributes } from 'react';
import type { SourceComponentProps } from '../@types/SourceComponentProps';
import type { Space } from '../@types/Space';
import { stack, stackSpace } from './styles';

export interface StackProps
	extends HTMLAttributes<HTMLDivElement>,
		SourceComponentProps {
	/**
	 * [Units of space](https://www.theguardian.design/2a1e5182b/p/449bd5-space) between inline items (one unit is 4px).
	 */
	space?: Space;
}

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/story/source_react-components-stack--default) •
 * [Design System](https://theguardian.design/2a1e5182b/p/827581-stack) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source/src/react-components/stack/Stack.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source)
 *
 * `Stack` components will be stacked one on top of the other.
 */
export const Stack = ({
	cssOverrides,
	children,
	space,
	...props
}: StackProps) => {
	return (
		<div
			css={[stack, isUndefined(space) ? '' : stackSpace(space), cssOverrides]}
			{...props}
		>
			{children}
		</div>
	);
};
