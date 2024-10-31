import * as React from 'react';
import type { MyCrosswordProps } from './components';
import { MyCrossword } from './components';

export type { GuardianCrossword } from './interfaces';

export const CrosswordPlayer = (props: MyCrosswordProps) => {
	return (
		<React.StrictMode>
			<MyCrossword {...props} />
		</React.StrictMode>
	);
};
