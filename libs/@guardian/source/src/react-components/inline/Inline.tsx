import { isUndefined } from '@guardian/libs';
import type { HTMLAttributes } from 'react';
import type { Props } from '../@types/Props';
import type { Space } from '../@types/Space';
import { inline, inlineSpace, inlineWrapper } from './styles';

export interface InlineProps extends HTMLAttributes<HTMLDivElement>, Props {
	/**
	 * [Units of space](https://guardian.github.io/storybooks/?path=/docs/source_foundations-space--docs)
	 * between children.
	 */
	space?: Space;
}

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/story/source_react-components-inline--docs) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source/src/react-components/inline/Inline.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source)
 *
 * `Inline` child elements are laid out horizontally, wrapping on to another row
 * if there isn't enough room. Spacing is applied between adjacent children.
 */
export const Inline = ({
	cssOverrides,
	children,
	space,
	...props
}: InlineProps) => {
	return (
		<div css={inline}>
			<div
				css={[
					inlineWrapper,
					isUndefined(space) ? '' : inlineSpace(space),
					cssOverrides,
				]}
				{...props}
			>
				{children}
			</div>
		</div>
	);
};
