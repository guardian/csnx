import { css } from '@emotion/react';
import { palette } from '@guardian/source-foundations';
import { SvgAppleBrand } from '@guardian/source-react-components';
import { useState } from 'react';
import type { ReactElement } from 'react';
import { Tabs } from './tabs';
import { tabsDarkTheme } from './theme';
import type { TabProps } from './types';

const tabsContent = [
	{
		id: 'cat',
		text: 'Cats',
		content: (
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec
				scelerisque lacus. Nulla aliquam nisi quis sollicitudin placerat. Nulla
				lacinia aliquet pretium. Vestibulum sit amet nisl cursus, consectetur
				sapien nec, cursus diam. Donec ornare eget eros sed sollicitudin. Fusce
				vitae lacinia diam. Integer eu suscipit felis. Integer tellus mauris,
				congue sit amet nisl tristique, feugiat viverra est. Praesent faucibus
				sagittis ante, rutrum cursus augue iaculis eu. Quisque et justo eget
				dolor pharetra consequat et ac ante. Nunc cursus molestie neque, vel
				sollicitudin nunc lacinia vitae. Aenean eget tincidunt felis.
				Pellentesque sagittis nisi eu mauris fermentum ultricies.
			</p>
		),
	},
	{
		id: 'dog',
		text: (
			<div
				css={css`
					display: flex;
					flex-wrap: wrap;
					align-items: center;
				`}
			>
				<span
					css={css`
						padding-right: 4px;
					`}
				>
					Dogs
				</span>
				<span>(are the best)</span>
			</div>
		),
		content: (
			<p>
				Vestibulum fermentum nibh ac est venenatis facilisis. In vehicula mattis
				mi, id eleifend metus suscipit posuere. Nulla sed sem magna. Sed ante
				orci, convallis a facilisis sed, mollis id lacus. Aenean ullamcorper
				pellentesque nisi sed vehicula. Aenean quis auctor libero. Vestibulum
				aliquam in tellus id varius. Donec congue consectetur sem, sit amet
				sagittis turpis. Maecenas mattis massa augue, sit amet aliquet libero
				elementum nec.
			</p>
		),
	},
] as const satisfies readonly TabProps[];

const tabs = (): ReactElement => {
	const [selectedTab, setSelectedTab] = useState<string>(tabsContent[1].id);
	return (
		<Tabs
			tabsLabel="Pets"
			tabElement="button"
			tabs={tabsContent}
			selectedTab={selectedTab}
			onTabChange={setSelectedTab}
		/>
	);
};

const singleTab = (): ReactElement => {
	const dog = tabsContent[1];
	return (
		<Tabs
			tabsLabel="Pets"
			tabElement="button"
			tabs={[dog]}
			selectedTab={dog.id}
			onTabChange={() => {
				// do nothing
			}}
		/>
	);
};

const tabWithNodeTitle = (): ReactElement => {
	const fruit = {
		id: 'fruit',
		text: (
			<div
				css={css`
					display: flex;
				`}
			>
				Fruit
				<SvgAppleBrand size="xsmall" />
			</div>
		),
		content: (
			<p>The apple is a fresh fruit that also happen to be massively tasty!</p>
		),
	} satisfies TabProps;
	return (
		<Tabs
			tabsLabel="Pets"
			tabElement="button"
			tabs={[fruit]}
			selectedTab={fruit.id}
			onTabChange={() => {
				// do nothing
			}}
		/>
	);
};

const tabWithDarkTheme = (): ReactElement => {
	const [selectedTab, setSelectedTab] = useState<string>(tabsContent[0].id);
	return (
		<Tabs
			tabsLabel="Themed"
			tabElement="button"
			tabs={tabsContent}
			selectedTab={selectedTab}
			onTabChange={setSelectedTab}
			theme={tabsDarkTheme}
		/>
	);
};

const tabWithCustomTheme = (): ReactElement => {
	const [selectedTab, setSelectedTab] = useState<string>(tabsContent[0].id);
	return (
		<Tabs
			tabsLabel="Themed"
			tabElement="button"
			tabs={tabsContent}
			selectedTab={selectedTab}
			onTabChange={setSelectedTab}
			theme={{
				'--background': palette.brand[300],
				'--border': palette.brand[100],
				'--inactiveBackground': palette.brand[600],
				'--text': palette.neutral[97],
			}}
		/>
	);
};

export default {
	component: tabs,
	title: 'Tabs',
};

export {
	tabs,
	singleTab,
	tabWithNodeTitle,
	tabWithDarkTheme,
	tabWithCustomTheme,
};
