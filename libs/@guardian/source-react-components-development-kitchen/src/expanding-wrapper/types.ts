import type { ReactElement } from 'react';
import type { SerializedStyles } from '@emotion/react';

export interface ExpandingWrapperProps {
	children: ReactElement;
	name: string;
	disableTabbingWhenCollapsed?: boolean;
	renderExtra?: () => ReactElement;
	expandCallback?: (expanded: boolean) => void;
	/**
	 * Override component styles by passing in the result of [emotion's `css` function/prop](https://emotion.sh/docs/introduction).
	 */
	cssOverrides?: SerializedStyles | SerializedStyles[];
}

export type TabbableElementType =
	| HTMLInputElement
	| HTMLTextAreaElement
	| HTMLSelectElement
	| HTMLButtonElement
	| HTMLAnchorElement;
