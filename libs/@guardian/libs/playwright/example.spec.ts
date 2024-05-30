import { test, expect } from '@playwright/test';

test('has title CMP Test Page', async ({ page }) => {
	await page.goto('http://localhost:4321/csnx/cmp-test-page#tcfv2');
	await expect(page).toHaveTitle(/CMP Test Page/);
});
