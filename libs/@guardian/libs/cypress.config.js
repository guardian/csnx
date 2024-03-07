/* eslint-disable import/no-default-export -- that's what cypress likes */
import { defineConfig } from 'cypress';
import plugins from './cypress/plugins/index';

export default defineConfig({
	viewportWidth: 1440,
	viewportHeight: 768,
	video: false,
	chromeWebSecurity: false,
	retries: {
		runMode: 9,
		openMode: 0,
	},
	defaultCommandTimeout: 5000,
	e2e: {
		setupNodeEvents(on, config) {
			return plugins(on, config);
		},
		baseUrl: 'http://localhost:4321/csnx',
	},
});
