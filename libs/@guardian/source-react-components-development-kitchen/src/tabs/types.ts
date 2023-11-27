import type { ReactNode } from 'react';
import type { Theme } from './theme';

type TabElement = 'a' | 'button';
export type TabProps = {
	readonly id: string;
	readonly text: string | ReactNode;
	readonly href?: string;
	readonly content: ReactNode;
};

export type TabContainerProps = {
	tabsLabel: string;
	tabElement: TabElement;
	tabs: readonly TabProps[];
	onTabChange: (tabName: string) => void;
	selectedTab: string;
	theme?: Theme;
};
