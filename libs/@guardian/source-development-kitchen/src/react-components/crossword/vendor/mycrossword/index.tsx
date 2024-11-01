// @ts-nocheck

import type { CrosswordPlayerProps } from './components';
import { MyCrossword } from './components';

export type { GuardianCrossword } from './interfaces';
export type { CrosswordPlayerProps } from './components';

export const CrosswordPlayer = (props: CrosswordPlayerProps) => {
	return <MyCrossword {...props} />;
};
