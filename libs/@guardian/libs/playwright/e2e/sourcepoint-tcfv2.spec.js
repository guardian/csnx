import { expect, test } from '@playwright/test';
import { ACCOUNT_ID, ENDPOINT } from '../fixtures/sourcepointConfig';

const iframeMessage = `[id^="sp_message_iframe_"]`;
const iframePrivacyManager = '#sp_message_iframe_106842';

const url = `http://localhost:4321/csnx/cmp-test-page#tcfv2`;

async function getIframeBody(page, selector) {
	const iframeElement = await page.locator(`iframe${selector}`).elementHandle();
	const frame = await iframeElement.contentFrame();
	const iframeBody = await frame.locator('body');

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
		const spConfig = await page.evaluate(() => {
			return window._sp_.config;
		});
		expect(spConfig.accountId).toBe(ACCOUNT_ID);
		expect(spConfig.baseEndpoint).toBe(ENDPOINT);
	});
});

test.describe('Document', () => {
	test('should have the Sourcepoint iframe', async ({ page }) => {
		await page.goto(url);
		await page.waitForLoadState('networkidle');
		const iframe = page
			.frameLocator('iframe[title="The Guardian consent message"]')
			.locator('.message-overlay');
		await expect(iframe).toBeVisible({ timeout: 3000 });
	});
	test('should have the correct script URL', async ({ page }) => {
		await page.goto(url);
		const script = page.locator('script[id="sourcepoint-lib"]');
		await expect(script).toHaveAttribute(
			'src',
			ENDPOINT + '/unified/wrapperMessagingWithoutDetection.js',
		);
	});
});
test.describe('Interaction', () => {
	const buttonTitle = 'Yes, I accept';

	test(`should give all consents when clicking "${buttonTitle}"`, async ({
		page,
	}) => {
		await page.goto(url);
		await page.context().addCookies([
			{ name: 'ccpaApplies', value: 'false', url },
			{ name: 'gdprApplies', value: 'true', url },
		]);

		const iframe = await getIframeBody(page, iframeMessage);
		await iframe.click(`button[title="${buttonTitle}"]`);

		await page.waitForTimeout(2000);

		for (const purpose of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) {
			const consent = await page.getAttribute(
				`[data-purpose="${purpose}"]`,
				'data-consent',
			);
			expect(consent).toBe('true');
		}
	});

	test(`should deactivate purpose 1 only`, async ({ page }) => {
		await page.goto(url);
		await page.context().addCookies([
			{ name: 'ccpaApplies', value: 'false', url },
			{ name: 'gdprApplies', value: 'true', url },
		]);

		const iframe = await getIframeBody(page, iframeMessage);
		await iframe.click(`button[title="${buttonTitle}"]`);

		await page.waitForTimeout(2000);

		await page.click('[data-cy=pm]');

		const privacyManagerIframe = await getIframeBody(
			page,
			iframePrivacyManager,
		);
		await privacyManagerIframe.click(
			'div[title="Store and/or access information on a device"] span.off',
		);
		await privacyManagerIframe.click('button[title="Save and close"]');

		await page.waitForFunction(
			() =>
				document
					.querySelector(`[data-purpose="1"]`)
					.getAttribute('data-consent') === 'false',
		);

		const consent = await page.getAttribute(
			`[data-purpose="1"]`,
			'data-consent',
		);
		expect(consent).toBe('false');

		for (const purpose of [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) {
			const consent = await page.getAttribute(
				`[data-purpose="${purpose}"]`,
				'data-consent',
			);
			expect(consent).toBe('true');
		}
	});

	test(`should deactivate all purposes except purpose 1`, async ({ page }) => {
		await page.goto(url);
		await page.context().addCookies([
			{ name: 'ccpaApplies', value: 'false', url },
			{ name: 'gdprApplies', value: 'true', url },
		]);

		const iframe = await getIframeBody(page, iframeMessage);
		await iframe.click(`button[title="${buttonTitle}"]`);

		await page.click('[data-cy=pm]');

		const privacyManagerIframe = await getIframeBody(
			page,
			iframePrivacyManager,
		);
		await privacyManagerIframe.click(
			'div[title="Store and/or access information on a device"] span.on',
		);
		await privacyManagerIframe.click('div.stack-toggles');
		await privacyManagerIframe.click('button[title="Save and close"]');

		await page.waitForFunction(
			() =>
				document
					.querySelector(`[data-purpose="2"]`)
					.getAttribute('data-consent') === 'false',
		);

		const consent = await page.getAttribute(
			`[data-purpose="1"]`,
			'data-consent',
		);
		expect(consent).toBe('true');

		for (const purpose of [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) {
			const consent = await page.getAttribute(
				`[data-purpose="${purpose}"]`,
				'data-consent',
			);
			expect(consent).toBe('false');
		}
	});
});
