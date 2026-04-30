// eslint-disable-next-line import/named -- this is a false positive
import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('https://playwright.dev/');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Playwright/);
});
