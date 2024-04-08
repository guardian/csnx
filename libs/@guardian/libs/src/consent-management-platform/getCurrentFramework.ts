import { log } from '../logger/logger';
import type { ConsentFramework } from './types';

let currentFramework: ConsentFramework | undefined;

export const unsetFramework = (): void => {
	log('cmp', 'Framework set to undefined');
	currentFramework = undefined;
};
export const setCurrentFramework = (framework: ConsentFramework): void => {
	log('cmp', `Framework set to ${framework}`);
	currentFramework = framework;
};
export const getCurrentFramework = (): ConsentFramework | undefined =>
	currentFramework;
