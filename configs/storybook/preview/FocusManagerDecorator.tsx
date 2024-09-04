import { FocusStyleManager } from '@guardian/source/foundations';
import { useEffect } from 'react';
import type { Decorator } from '@storybook/react';

export const FocusManagerDecorator: Decorator = (storyFn) => {
	useEffect(() => {
		FocusStyleManager.onlyShowFocusOnTabs();
	});

	return <>{storyFn()}</>;
};
