import { useEffect } from 'react';
import { FocusStyleManager } from '@guardian/source-foundations';
import { Decorator } from '@storybook/react';

export const FocusManagerDecorator: Decorator = (storyFn) => {
	useEffect(() => {
		FocusStyleManager.onlyShowFocusOnTabs();
	});

	return <>{storyFn()}</>;
};
