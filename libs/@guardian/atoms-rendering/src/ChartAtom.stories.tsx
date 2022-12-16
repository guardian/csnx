import { useEffect } from 'react';
import { ChartAtom } from './ChartAtom';
import { html } from './fixtures/chartAtoms';
import { atomGuScriptSwap, atomResizer } from './lib/platformExampleScripts';

export default {
	title: 'ChartAtom',
	component: ChartAtom,
};

export const DefaultStory = (): JSX.Element => {
	useEffect(() => {
		atomResizer();
		atomGuScriptSwap();
	}, []);
	return <ChartAtom id="abc123" html={html} />;
};
