import * as React from 'react';
import { CrosswordPlayerProps, MyCrossword } from './components';

export type { GuardianCrossword } from './interfaces';
export type { CrosswordPlayerProps } from './components';

export const CrosswordPlayer = (props: CrosswordPlayerProps) => {
	return (
		<React.StrictMode>
			<MyCrossword {...props} />
		</React.StrictMode>
	);
};
