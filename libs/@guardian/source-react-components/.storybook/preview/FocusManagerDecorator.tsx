import { FocusStyleManager } from '@guardian/source-foundations';
import { useEffect } from 'react';

export const FocusManagerDecorator = (storyFn) => {
	useEffect(() => {
		FocusStyleManager.onlyShowFocusOnTabs();
	});

	return <>{storyFn()}</>;
};
