import type { Decorator } from '@storybook/react';
import { useEffect } from 'react';
import { FocusStyleManager } from '../../src/foundations';

export const FocusManagerDecorator: Decorator = (storyFn) => {
	useEffect(() => {
		FocusStyleManager.onlyShowFocusOnTabs();
	});

	return <>{storyFn()}</>;
};
