import type { ReactElement } from 'react';
import type { Theme } from './theme';

export interface ExpandingWrapperProps {
	children: ReactElement;
	name: string;
	disableTabbingWhenCollapsed?: boolean;

	renderExtra?: () => ReactElement;
	expandCallback?: (expanded: boolean) => void;
	theme?: Theme;
	/**
	 * Override the height of the collapsed content. Defaults to '240px'
	 */
	collapsedHeight?: string;
}

export type TabbableElementType =
	| HTMLInputElement
	| HTMLTextAreaElement
	| HTMLSelectElement
	| HTMLButtonElement
	| HTMLAnchorElement;
