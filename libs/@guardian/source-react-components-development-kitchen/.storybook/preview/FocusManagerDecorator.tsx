import { FocusStyleManager } from '@guardian/source-foundations';
import type { Decorator } from '@storybook/react';
import { useEffect } from 'react';

export const FocusManagerDecorator: Decorator = (storyFn) => {
	useEffect(() => {
		FocusStyleManager.onlyShowFocusOnTabs();
	});

	return <>{storyFn()}</>;
};
