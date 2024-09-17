// eslint-disable-next-line import/named -- this is a false positive
import { expect, test } from '@playwright/test';
import {
	ACCOUNT_ID,
	ENDPOINT,
	PRIVACY_MANAGER_USNAT,
} from '../fixtures/sourcepointConfig';

const iframeMessage = `[id^="sp_message_iframe_"]`;
const iframePrivacyManager = `#sp_message_iframe_${PRIVACY_MANAGER_USNAT}`;
const doNotSellButton = 'div.message-component > button.sp_choice_type_13';
const closeButton = 'div.message-component > button.sp_choice_type_11';
const saveAndExitButton = '.sp_choice_type_SE';

const url = `http://localhost:4321/csnx/cmp-test-page#usnat`;

async function doNotSellIs(page, expectedValue) {
	await page.waitForLoadState('networkidle');

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
		{ timeout: 5000 },
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
		await page.waitForLoadState('networkidle');
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

	test(`should retract consent banner after selecting do not sell button "${buttonTitle}"`, async ({
		page,
	}) => {
		await page.goto(url);

		await doNotSellIs(page, false);

		await page.frameLocator(iframeMessage).locator(doNotSellButton).click();

		await page.waitForLoadState('networkidle');

		await expect(
			page.frameLocator(iframeMessage).locator(doNotSellButton),
		).toBeHidden();
	});

	test(`should retract consent banner after selecting close button "${buttonTitle}"`, async ({
		page,
	}) => {
		await page.goto(url);

		await doNotSellIs(page, false);

		await page.frameLocator(iframeMessage).locator(closeButton).click();

		await page.waitForLoadState('networkidle');

		await expect(
			page.frameLocator(iframeMessage).locator(closeButton),
		).toBeHidden();
	});

	test(`should be able to interact with the toggle privacy manager`, async ({
		page,
	}) => {
		await page.goto(url);

		await doNotSellIs(page, false);

		await page.frameLocator(iframeMessage).locator(closeButton).click();

		await doNotSellIs(page, false);

		await page.click('[data-cy=pm]');

		const privacyManagerIframe = await getIframeBody(
			page,
			iframePrivacyManager,
		);
		await privacyManagerIframe.click('.pm-toggle .on');
		await privacyManagerIframe.click(saveAndExitButton);

		await page.waitForLoadState('networkidle');

		await expect(
			page.frameLocator(iframeMessage).locator(saveAndExitButton),
		).toBeHidden();
	});
});
