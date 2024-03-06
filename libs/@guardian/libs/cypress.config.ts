/* eslint-disable import/no-default-export -- that's what cypress likes */

import { defineConfig } from 'cypress';

export default defineConfig({
	viewportWidth: 1440,
	viewportHeight: 768,
	video: false,
	chromeWebSecurity: false,
	retries: {
		runMode: 2,
		openMode: 0,
	},
	defaultCommandTimeout: 5000,
	e2e: {
		// We've imported your old cypress plugins here.
		// You may want to clean this up later by importing these.
		setupNodeEvents(on, config) {
			return require('./cypress/plugins/index.js').default(on, config);
		},
		baseUrl: 'http://localhost:10001/',
	},
});
