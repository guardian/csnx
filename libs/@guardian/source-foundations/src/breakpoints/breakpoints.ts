import { tokens } from '@csnx/design-tokens';

export type Breakpoint = keyof typeof tokens.breakpoint;

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/docs/source-foundations_media-queries--page) •
 * [Design System](https://theguardian.design/2a1e5182b/p/41be19-grids)
 */
export const breakpoints = tokens.breakpoint;
