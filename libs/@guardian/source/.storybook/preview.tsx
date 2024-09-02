import {
	Controls,
	Description,
	Primary,
	Subtitle,
	Title,
} from '@storybook/blocks';
import type { Decorator, Preview } from '@storybook/react';
import { useEffect } from 'react';
import { FocusStyleManager, palette } from '@guardian/source/foundations';
import { viewport } from './preview/viewport';

export const FocusManagerDecorator: Decorator = (storyFn) => {
	useEffect(() => {
		FocusStyleManager.onlyShowFocusOnTabs();
	});

	return <>{storyFn()}</>;
};

const preview: Preview = {
	parameters: {
		options: {
			storySort: {
				method: 'alphabetical-by-kind',
			},
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		docs: {
			page: () => (
				<>
					<Title />
					<Subtitle />
					<Description />
					<Primary />
					<Controls />
				</>
			),
			toc: true,
		},
		backgrounds: {
			default: 'palette.neutral[100]',
			values: [
				{
					name: 'palette.neutral[100]',
					value: palette.neutral[100],
				},
				{
					name: 'palette.neutral[97]',
					value: palette.neutral[97],
				},
				{
					name: 'palette.neutral[10]',
					value: palette.neutral[10],
				},
				{
					name: 'palette.brand[400]',
					value: palette.brand[400],
				},
				{
					name: 'palette.brandAlt[400]',
					value: palette.brandAlt[400],
				},
			],
		},
		viewport,
	},
	tags: ['autodocs'],
};

export const decorators = [FocusManagerDecorator];

// eslint-disable-next-line import/no-default-export -- it's the storybook way
export default preview;
