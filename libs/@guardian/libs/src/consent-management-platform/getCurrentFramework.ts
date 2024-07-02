import type { ConsentFramework } from './types';

let currentFramework: ConsentFramework | undefined;

export const unsetFramework = (): void => {
	currentFramework = undefined;
};
export const setCurrentFramework = (framework: ConsentFramework): void => {
	currentFramework = framework;
};
export const getCurrentFramework = (): ConsentFramework | undefined =>
	currentFramework;
