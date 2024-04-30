import { stub_gpp_usnat } from './stub_gpp_usnat';
import { stub_tcfv2 } from './stub_tcfv2';
import { stub_uspapi_ccpa } from './stub_uspapi_ccpa';
import type { ConsentFramework } from './types';

export const stub = (framework: ConsentFramework): void => {
	// NOTE - Contrary to the SourcePoint documentation, it's important that we only run the stub file
	// for the framework currently in use. The presence of __tcfapi on the window object signals to GPT
	// that it should take precedence over __uspapi
	// documentation.sourcepoint.com/implementation/web-implementation/multi-campaign-web-implementation#stub-file
	switch (framework) {
		case 'tcfv2':
			stub_tcfv2();
			break;
		case 'usnat':
			stub_gpp_usnat();
			stub_uspapi_ccpa(); // TODO: TO bE confirmed
			break;
		case 'aus':
			stub_uspapi_ccpa();
			break;
	}
};
