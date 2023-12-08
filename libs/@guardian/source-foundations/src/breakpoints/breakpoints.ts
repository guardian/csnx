import { tokens } from '@csnx/design-tokens';

type Breakpoint = keyof typeof tokens.breakpoint;

const breakpoints = {} as { [K in Breakpoint]: number };
/**
 * [Storybook](https://guardian.github.io/csnx/?path=/docs/source-foundations_media-queries--page) •
 * [Design System](https://theguardian.design/2a1e5182b/p/41be19-grids)
 */
Object.keys(tokens.breakpoint).forEach((key) => {
	// Strip 'px' unit from token and convert to a numeric value
	breakpoints[key as Breakpoint] = Number(
		tokens.breakpoint[key as Breakpoint].slice(0, -2),
	);
});

export { breakpoints };
export type { Breakpoint };
