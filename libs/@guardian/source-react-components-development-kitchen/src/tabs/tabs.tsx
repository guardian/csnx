import { tabButton, tabList, tabPanel } from './styles';
import type { Theme } from './theme';
import type { TabContainerProps } from './types';

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
				{tabs.map(({ id, href, text }) => {
					return (
						<TabControllerElement
							key={id}
							css={(theme: Theme) => tabButton(theme.tabs)}
							role="tab"
							id={id}
							href={href}
							aria-selected={selectedTab === id}
							aria-controls={`${id}-tab`}
							onClick={(): void => onTabChange(id)}
						>
							{text}
						</TabControllerElement>
					);
				})}
			</div>
			{tabs.map(({ id, content }) => (
				<div
					key={`${id}-tab`}
					css={(theme: Theme) => tabPanel(theme.tabs)}
					role="tabpanel"
					id={`${id}-tab`}
					aria-labelledby={id}
					hidden={!(id === selectedTab)}
				>
					{content}
				</div>
			))}
		</div>
	);
}

export { Tabs };
