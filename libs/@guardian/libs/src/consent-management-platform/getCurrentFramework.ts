import { log } from '@guardian/libs';
import type { Framework } from './types';

let currentFramework: Framework | undefined;

export const unsetFramework = (): void => {
	log('cmp', 'Framework set to undefined');
	currentFramework = undefined;
};
export const setCurrentFramework = (framework: Framework): void => {
	log('cmp', `Framework set to ${framework}`);
	currentFramework = framework;
};
export const getCurrentFramework = (): Framework | undefined =>
	currentFramework;
