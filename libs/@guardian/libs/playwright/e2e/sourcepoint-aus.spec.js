import {
	ACCOUNT_ID,
	ENDPOINT,
	PRIVACY_MANAGER_AUSTRALIA,
} from '../fixtures/sourcepointConfig';
import { expect, test } from '@playwright/test';

const iframePrivacyManager = `#sp_message_iframe_${PRIVACY_MANAGER_AUSTRALIA}`;

const url = `http://localhost:4321/csnx/cmp-test-page#aus`;

async function personalisedAdvertisingIs(page, boolean) {
	await page.waitForTimeout(2000);
	const attributeValue = await page
		.locator('[data-personalised-advertising]')
		.getAttribute('data-personalised-advertising');
	expect(attributeValue).toBe(boolean.toString());
}
test.describe('Window', () => {
	test('has the guCmpHotFix object', async ({ page }) => {
		await page.goto(url);
		const guCmpHotFix = await page.evaluate(() => {
			return window.guCmpHotFix;
		});
		expect(guCmpHotFix).toBeDefined();
	});

	test('has correct config params', async ({ page }) => {
		await page.goto(url);
		await page.waitForLoadState('networkidle');
		const spConfig = await page.evaluate(() => {
			return window._sp_.config;
		});
		expect(spConfig.accountId).toBe(ACCOUNT_ID);
		expect(spConfig.baseEndpoint).toBe(ENDPOINT);
	});
});

test('should have the Sourcepoint iframe', async ({ page }) => {
	await page.goto(url);
	const iframe = page
		.frameLocator('iframe[title="SP Consent Message"]')
		.getByLabel('Continue');
	await expect(iframe).toBeVisible({ timeout: 10000 });

	const script = page.locator('script[id="sourcepoint-lib"]');
	await expect(script).toHaveAttribute(
		'src',
		ENDPOINT + '/unified/wrapperMessagingWithoutDetection.js',
	);
});
test.describe('Interaction', () => {
	test('should have personalised advertising set to true by default', async ({
		page,
	}) => {
		await page.goto(url);
		await page
			.context()
			.addCookies([{ name: 'ccpaApplies', value: 'true', url }]);
		await personalisedAdvertisingIs(page, true);
	});

	test('Should click continue to dismiss the banner', async ({ page }) => {
		await page.goto(url);
		await page
			.context()
			.addCookies([{ name: 'ccpaApplies', value: 'true', url }]);
		await page
			.frameLocator('iframe[title="SP Consent Message"]')
			.locator('[aria-label="Continue"]')
			.click();
	});

	test('should be able to retract consent', async ({ page }) => {
		await page.goto(url);
		await page
			.context()
			.addCookies([{ name: 'ccpaApplies', value: 'true', url }]);

		await personalisedAdvertisingIs(page, true);

		await page
			.frameLocator('iframe[title="SP Consent Message"]')
			.locator('[aria-label="Continue"]')
			.click();

		await page.locator('[data-cy=pm]').click();

		const privacyManagerIframe = page.frameLocator(iframePrivacyManager);
		await privacyManagerIframe.locator('.pm-toggle .off').click();
		await privacyManagerIframe.locator('.sp_choice_type_SAVE_AND_EXIT').click();

		await personalisedAdvertisingIs(page, false);
	});
});
