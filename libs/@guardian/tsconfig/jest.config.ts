/* eslint-disable import/no-default-export -- that's what jest likes */
// eslint-disable-next-line @nx/enforce-module-boundaries -- nx!
import { config } from '../../../configs/jest.config';

export default {
	...config,
	displayName: '@guardian/tsconfig',
	transform: {
		'^.+\\.[tj]sx?$': 'ts-jest',
	},
};
