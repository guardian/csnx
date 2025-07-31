import { config as baseConfig} from '../../../configs/jest.config.js';

/** @typedef {import("jest").Config} Config  */
const config = {
	...baseConfig,
	transformIgnorePatterns: [],
};

export default config;
