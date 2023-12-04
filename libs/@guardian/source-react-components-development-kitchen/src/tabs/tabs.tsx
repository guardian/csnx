import type { CSSProperties } from 'react';
import { tabButton, tabList, tabPanel } from './styles';
import { tabsThemeDefault } from './theme';
import type { TabContainerProps } from './types';

const Tabs = ({
	tabsLabel,
	tabElement,
	tabs,
	selectedTab,
	onTabChange,
	theme = tabsThemeDefault,
}: TabContainerProps): JSX.Element => {
	const TabControllerElement = tabElement;
	return (
		<div
			style={
				// Setting CSS Custom Properties is not supported natively
				// by the underling type definitions, but here we have ensured
				// that all the keys are valid and start with a double dash `--`
				theme as CSSProperties
			}
		>
			<div css={tabList} role="tablist" aria-label={tabsLabel}>
				{tabs.map(({ id, href, text }) => {
					return (
						<TabControllerElement
							key={id}
							css={tabButton}
							role="tab"
							id={id}
							href={href}
							aria-selected={selectedTab === id}
							aria-controls={`${id}-tab`}
							onClick={() => onTabChange(id)}
						>
							{text}
						</TabControllerElement>
					);
				})}
			</div>
			{tabs.map(({ id, content }) => (
				<div
					key={`${id}-tab`}
					css={tabPanel}
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
};

export { Tabs };
