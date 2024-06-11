import { expect, test } from '@playwright/test';
import {
	ACCOUNT_ID,
	ENDPOINT,
	PRIVACY_MANAGER_CCPA,
} from '../fixtures/sourcepointConfig';

const iframePrivacyManager = `#sp_message_iframe_${PRIVACY_MANAGER_CCPA}`;

const url = `http://localhost:4321/csnx/cmp-test-page#ccpa`;

async function doNotSellIs(page, expectedValue) {
	await page.locator('[data-donotsell]').waitFor({
		state: 'attached',
		timeout: 2000,
	});
	await page.waitForFunction(
		(expectedValue) =>
			document
				.querySelector('[data-donotsell]')
				.getAttribute('data-donotsell') === expectedValue.toString(),
		expectedValue,
		{ timeout: 2000 },
	);
	const attributeValue = await page
		.locator('[data-donotsell]')
		.getAttribute('data-donotsell');
	expect(attributeValue).toBe(expectedValue.toString());
}

async function getIframeBody(page, selector) {
	const iframeElement = await page.locator(`iframe${selector}`).elementHandle();
	const frame = await iframeElement.contentFrame();
	const iframeBody = await frame.$('body');

	if (!iframeBody) {
		throw new Error('Iframe body is empty');
	}

	return frame;
}

test.describe('Window', () => {
	test('has the guCmpHotFix object', async ({ page }) => {
		await page.goto(url);
		await page.waitForLoadState('networkidle');
		const guCmpHotFix = await page.evaluate(() => {
			return window.guCmpHotFix;
		});
		expect(guCmpHotFix).toBeDefined();
	});

	test('has correct config params', async ({ page }) => {
		await page.goto(url);
		await page.waitForLoadState('networkidle');
		const spConfig = await page.evaluate(() => window._sp_.config);
		expect(spConfig.accountId).toBe(ACCOUNT_ID);
		expect(spConfig.baseEndpoint).toBe(ENDPOINT);
	});
});

test.describe('Document', () => {
	test('should have the SP iframe', async ({ page }) => {
		await page.goto(url);
		const iframe = page
			.frameLocator('iframe[title="SP Consent Message"]')
			.getByLabel('Do not sell my personal');
		await expect(iframe).toBeVisible({ timeout: 3000 });
	});

	test('should have the correct script URL', async ({ page }) => {
		await page.goto(url);
		const scriptSrc = await page.getAttribute('script#sourcepoint-lib', 'src');
		expect(scriptSrc).toBe(
			`${ENDPOINT}/unified/wrapperMessagingWithoutDetection.js`,
		);
	});
});

test.describe('Interaction', () => {
	const buttonTitle = 'Do not sell my personal information';

	test('should have DNS set to false by default', async ({ page }) => {
		await page.goto(url);
		await doNotSellIs(page, false);
	});

	test(`should retract consent when clicking "${buttonTitle}"`, async ({
		page,
	}) => {
		await page.goto(url);

		await page
			.frameLocator('iframe[title="SP Consent Message"]')
			.getByLabel('Do not sell my personal')
			.click();

		await doNotSellIs(page, true);
	});

	test(`should be able to retract consent`, async ({ page }) => {
		await page.goto(url);

		await doNotSellIs(page, false);

		await page.click('[data-cy=pm]');

		const privacyManagerIframe = await getIframeBody(
			page,
			iframePrivacyManager,
		);
		await privacyManagerIframe.click('.pm-toggle .off');
		await privacyManagerIframe.click('.sp_choice_type_SAVE_AND_EXIT');

		await doNotSellIs(page, true);
	});
});
