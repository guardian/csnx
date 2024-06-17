/** @type {import('jest').Config} */
const config = {
	rootDir: '../',
	projects: [
		// only CSTI projects...
		'<rootDir>/libs/@guardian/browserslist-config',
		'<rootDir>/libs/@guardian/cobalt-plugin-ts',
		'<rootDir>/libs/@guardian/core-web-vitals',
		'<rootDir>/libs/@guardian/design-tokens',
		'<rootDir>/libs/@guardian/eslint-config',
		'<rootDir>/libs/@guardian/eslint-config-typescript',
		'<rootDir>/libs/@guardian/libs',
		'<rootDir>/libs/@guardian/prettier',
		'<rootDir>/libs/@guardian/source',
		'<rootDir>/libs/@guardian/tsconfig',
	],
	collectCoverage: true,
	coverageDirectory: '<rootDir>/coverage/report',
};

export default config;
