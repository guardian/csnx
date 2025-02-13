import type { SerializedStyles } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import type { HTMLAttributes } from 'react';
import type { Breakpoint } from '../../foundations';
import type { Props } from '../@types/Props';
import type { Space } from '../@types/Space';
import {
	collapseBelowColumnsCSS,
	collapseBelowDesktop,
	collapseBelowleftCol,
	collapseBelowSpaceYCSS,
	collapseBelowTablet,
	collapseBelowWide,
	columns,
} from './styles';

type GridBreakpoint = Extract<
	Breakpoint,
	'mobile' | 'tablet' | 'desktop' | 'leftCol' | 'wide'
>;

export type CollapseBreakpoint = Extract<
	GridBreakpoint,
	'tablet' | 'desktop' | 'leftCol' | 'wide'
>;

const collapseBelowMap: Record<CollapseBreakpoint, SerializedStyles> = {
	tablet: collapseBelowTablet,
	desktop: collapseBelowDesktop,
	leftCol: collapseBelowleftCol,
	wide: collapseBelowWide,
};

const collapseBelowColumnsMap: Record<CollapseBreakpoint, SerializedStyles> = {
	tablet: collapseBelowColumnsCSS('tablet'),
	desktop: collapseBelowColumnsCSS('desktop'),
	leftCol: collapseBelowColumnsCSS('leftCol'),
	wide: collapseBelowColumnsCSS('wide'),
};

export interface ColumnsProps extends HTMLAttributes<HTMLDivElement>, Props {
	/**
	 * Child components will be stacked in a single column at viewport widths
	 * narrower than the specified breakpoint (they will always be collapsed
	 * into a single column if the viewport is narrower than `mobileLandscape`).
	 */
	collapseUntil?: CollapseBreakpoint;
	/**
	 * **Deprecated**
	 *
	 * Use `collapseUntil` instead.
	 *
	 * @deprecated Use `collapseUntil` instead.
	 */
	collapseBelow?: CollapseBreakpoint;
	/**
	 * Vertical [units of
	 * space](https://www.theguardian.design/2a1e5182b/p/449bd5-space) between
	 * between columns vertically when collapsed (one unit is 4px).
	 */
	spaceY?: Space;
}

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/story/source_react-components-columns--with-container) •
 * [Design System](https://theguardian.design/2a1e5182b/p/41cd49-columns) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source/src/react-components/columns/Columns.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source)
 *
 * `Columns` arranges child `Column`s side by side on a single row, with the
 * specified width.
 *
 * They become really useful when used in conjunction with the [Container](https://guardian.github.io/storybooks/?path=/story/source_react-components-container--default)
 * component. This ensures the columns conform to the Guardian's grid layouts at
 * every breakpoint.
 */
export const Columns = ({
	collapseBelow,
	collapseUntil = collapseBelow, // deprecated
	cssOverrides,
	children,
	spaceY,
	...props
}: ColumnsProps) => {
	return (
		<div
			css={[
				columns,
				collapseUntil ? collapseBelowColumnsMap[collapseUntil] : '',
				collapseUntil ? collapseBelowMap[collapseUntil] : '',
				isUndefined(spaceY) ? '' : collapseBelowSpaceYCSS(spaceY),
				cssOverrides,
			]}
			{...props}
		>
			{children}
		</div>
	);
};
