import { useEffect } from 'react';
import { FocusStyleManager } from '../../src/index';

export const FocusManagerDecorator = (storyFn) => {
	useEffect(() => {
		FocusStyleManager.onlyShowFocusOnTabs();
	});

	return <>{storyFn()}</>;
};
