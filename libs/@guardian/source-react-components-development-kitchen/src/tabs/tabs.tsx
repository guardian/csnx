import { tabButton, tabList, tabPanel } from './styles';
import type { Theme } from './theme';
import type { TabContainerProps, TabProps } from './types';

function Tabs({
	tabsLabel,
	tabElement,
	tabs,
	selectedTab,
	onTabChange,
}: TabContainerProps): JSX.Element {
	const TabControllerElement = tabElement;
	return (
		<div>
			<div css={tabList} role="tablist" aria-label={tabsLabel}>
				{tabs.map((tab: TabProps) => {
					return (
						<TabControllerElement
							key={tab.id}
							css={(theme: Theme) => tabButton(theme.tabs)}
							role="tab"
							id={tab.id}
							href={tab.href}
							aria-selected={selectedTab === tab.id}
							aria-controls={`${tab.id}-tab`}
							onClick={(): void => onTabChange(tab.id)}
						>
							{tab.text}
						</TabControllerElement>
					);
				})}
			</div>
			{tabs.map((tab: TabProps) => (
				<div
					key={`${tab.id}-tab`}
					css={(theme: Theme) => tabPanel(theme.tabs)}
					role="tabpanel"
					id={`${tab.id}-tab`}
					aria-labelledby={tab.id}
					hidden={!(tab.id === selectedTab)}
				>
					{tab.content}
				</div>
			))}
		</div>
	);
}

export { Tabs };
