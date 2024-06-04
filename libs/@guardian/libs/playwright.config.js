import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
// eslint-disable-next-line import/no-default-export -- playwright wants this
export default defineConfig({
	testDir: './playwright',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		baseURL: 'http://localhost:4321/csnx',
		trace: 'on-first-retry',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],

	webServer: {
		command: 'cd ../../../ && pnpm --filter github-pages start',
		url: 'http://localhost:4321/csnx',
		reuseExistingServer: !process.env.CI,
	},
});
