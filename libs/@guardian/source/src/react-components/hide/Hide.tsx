import { css } from '@emotion/react';
import type { HTMLAttributes } from 'react';
import { from as fromMq, until as untilMq } from '../../foundations';
import type { Breakpoint } from '../../foundations';
import type { Props } from '../@types/Props';

export interface HideProps extends HTMLAttributes<HTMLDivElement>, Props {
	/**
	 * Hide child content if the viewport is narrower than the specified breakpoint.
	 */
	until?: Breakpoint;
	/**
	 * Hide child content if the viewport is as wide, or wider than, the specified breakpoint.
	 */
	from?: Breakpoint;
	/**
	 * **Deprecated**
	 *
	 * Use `from` instead.
	 *
	 * @deprecated Use `from` instead.
	 */
	above?: Breakpoint;
	/**
	 * **Deprecated**
	 *
	 * Use `until` instead.
	 *
	 * @deprecated Use `until` instead.
	 */
	below?: Breakpoint;
}

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components_hide--hidden-from-tablet-at-mobile) •
 * [Design System](https://theguardian.design/2a1e5182b/p/78cb73-hide) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source/src/react-components/hide/Hide.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source)
 *
 * Hides child content `until` and/or `from` a given breakpoint.
 */
export const Hide = ({
	children,
	above, // deprecated
	below, // deprecated
	from = above,
	until = below,
}: HideProps) => {
	let whenToHide;
	if (until) {
		whenToHide = css`
			${untilMq[until]} {
				display: none;
			}
		`;
	}
	if (from) {
		whenToHide = css`
			${whenToHide}
			${fromMq[from]} {
				display: none;
			}
		`;
	}

	return <span css={whenToHide}>{children}</span>;
};
