import { stub_gpp_usnat } from './stub_gpp_usnat';
import { stub_tcfv2 } from './stub_tcfv2';
import { stub_uspapi_ccpa } from './stub_uspapi_ccpa';
import type { ConsentFramework } from './types';

export const loadStubsFor = (framework: ConsentFramework): void => {
	switch (framework) {
		case 'tcfv2':
			stub_tcfv2();
			break;
		case 'usnat':
			stub_gpp_usnat();
			stub_uspapi_ccpa();
			break;
		case 'aus':
			stub_uspapi_ccpa();
			break;
	}
};

export const loadAllStubs = (): void => {
	stub_tcfv2();
	stub_gpp_usnat();
	stub_uspapi_ccpa();
};
