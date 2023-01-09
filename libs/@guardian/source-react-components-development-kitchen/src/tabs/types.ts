import type { ReactNode } from 'react';

type TabElement = 'a' | 'button';
export type TabProps = {
	id: string;
	text: string;
	href?: string;
	content: ReactNode;
};
export type TabContainerProps = {
	tabsLabel: string;
	tabElement: TabElement;
	tabs: TabProps[];
	onTabChange: (tabName: string) => void;
	selectedTab: string;
};
