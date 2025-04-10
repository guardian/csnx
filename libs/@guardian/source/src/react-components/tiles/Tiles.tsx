import type { SerializedStyles } from '@emotion/react';
import type { HTMLAttributes } from 'react';
import type { Breakpoint } from '../../foundations';
import type { Props } from '../@types/Props';
import type { Columns } from './@types/Columns';
import {
	collapseUntilDesktopTiles,
	collapseUntilLeftColTiles,
	collapseUntilTabletTiles,
	collapseUntilWideTiles,
	tileGridColumns,
	tilesCollapseUntilDesktop,
	tilesCollapseUntilleftCol,
	tilesCollapseUntilTablet,
	tilesCollapseUntilWide,
	tilesGridContainer,
} from './styles';

type GridBreakpoint = Extract<
	Breakpoint,
	'mobile' | 'tablet' | 'desktop' | 'leftCol' | 'wide'
>;

type CollapseBreakpoint = Extract<
	GridBreakpoint,
	'tablet' | 'desktop' | 'leftCol' | 'wide'
>;

const collapseUntilMap: Record<CollapseBreakpoint, SerializedStyles> = {
	tablet: tilesCollapseUntilTablet,
	desktop: tilesCollapseUntilDesktop,
	leftCol: tilesCollapseUntilleftCol,
	wide: tilesCollapseUntilWide,
};

const collapseUntilColumnsMap: Record<CollapseBreakpoint, SerializedStyles> = {
	tablet: collapseUntilTabletTiles,
	desktop: collapseUntilDesktopTiles,
	leftCol: collapseUntilLeftColTiles,
	wide: collapseUntilWideTiles,
};

export interface TilesProps extends HTMLAttributes<HTMLDivElement>, Props {
	/**
	 * The number of columns you want.
	 */
	columns: Columns;
	/**
	 * Child components will be stacked in a single column at viewport widths narrower than the
	 * specified breakpoint (they will always be collapsed into a single column if the viewport is narrower than `mobileLandscape`).
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
}

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/story/source_react-components-textinput--default-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/00e9f5-tiles) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source/src/react-components/layout/Tiles.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source)
 *
 * Child components will be arranged with equal width and spacing with the specified number of columns,
 * wrapping onto a new row as necessary.
 *
 * Until `mobileLandscape`, child components will be collapsed into a single column.
 */
export const Tiles = ({
	columns,
	collapseBelow, // deprecated
	collapseUntil = collapseBelow,
	cssOverrides,
	children,
	...props
}: TilesProps) => {
	return (
		<div
			css={[
				tilesGridContainer,
				tileGridColumns[columns],
				collapseUntil ? collapseUntilColumnsMap[collapseUntil] : '',
				collapseUntil ? collapseUntilMap[collapseUntil] : '',
				cssOverrides,
			]}
			{...props}
		>
			{children}
		</div>
	);
};
