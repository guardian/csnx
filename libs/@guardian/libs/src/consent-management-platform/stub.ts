import { stub_ccpa } from './stub_ccpa';
import { stub_tcfv2 } from './stub_tcfv2';
import type { Framework } from './types';

export const stub = (framework: Framework): void => {
	// NOTE - Contrary to the SourcePoint documentation, it's important that we only run the stub file
	// for the framework currently in use. The presence of __tcfapi on the window object signals to GPT
	// that it should take precedence over __uspapi
	// documentation.sourcepoint.com/implementation/web-implementation/multi-campaign-web-implementation#stub-file
	if (framework === 'tcfv2') stub_tcfv2();
	else stub_ccpa();
};
