import { ENDPOINT } from '../fixtures/sourcepointConfig';
import { expect, test } from '@playwright/test';
import { ACCOUNT_ID } from '../fixtures/sourcepointConfig.js';

const iframeMessage = `[id^="sp_message_iframe_"]`;
const iframePrivacyManager = '#sp_message_iframe_106842';

// TODO add checkbox in UI, default to production
const url = `http://localhost:4321/csnx/cmp-test-page#tcfv2`;

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
	const iframeButton = page
		.frameLocator('iframe[title="SP Consent Message"]')
		.getByLabel('Continue');
	await expect(iframeButton).toBeVisible({ timeout: 10000 });

	const script = page.locator('script[id="sourcepoint-lib"]');
	await expect(script).toHaveAttribute(
		'src',
		ENDPOINT + '/unified/wrapperMessagingWithoutDetection.js',
	);
});
// describe('Interaction', () => {
// 	const buttonTitle = 'Yes, I accept';
//
// 	it(`should give all consents when clicking "${buttonTitle}"`, () => {
// 		cy.visit(url);
// 		cy.setCookie('ccpaApplies', 'false');
// 		cy.setCookie('gdprApplies', 'true');
//
// 		cy.getIframeBody(iframeMessage)
// 			.find(`button[title="${buttonTitle}"]`)
// 			.click();
//
// 		// eslint-disable-next-line cypress/no-unnecessary-waiting -- should we do this?
// 		cy.wait(2000);
//
// 		[(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11)].forEach((purpose) => {
// 			cy.get(`[data-purpose="${purpose}"]`).should(
// 				'have.data',
// 				'consent',
// 				true,
// 			);
// 		});
// 	});
//
// 	it(`should deactivate purpose 1 only`, () => {
// 		cy.visit(url);
// 		cy.setCookie('ccpaApplies', 'false');
// 		cy.setCookie('gdprApplies', 'true');
//
// 		cy.getIframeBody(iframeMessage)
// 			.find(`button[title="${buttonTitle}"]`)
// 			.click();
//
// 		// eslint-disable-next-line cypress/no-unnecessary-waiting -- should we do this?
// 		cy.wait(2000);
//
// 		cy.get('[data-cy=pm]').click();
//
// 		cy.getIframeBody(iframePrivacyManager)
// 			.find(`div[title="Store and/or access information on a device"]`)
// 			.find('span.off')
// 			.click();
//
// 		cy.getIframeBody(iframePrivacyManager)
// 			.find(`button[title="Save and close"]`)
// 			.click();
//
// 		// eslint-disable-next-line cypress/no-unnecessary-waiting -- should we do this?
// 		cy.wait(2000);
//
// 		cy.get(`[data-purpose="1"]`)
// 			.should('have.data', 'consent')
// 			.should('equal', false);
//
// 		[2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach((purpose) => {
// 			cy.get(`[data-purpose="${purpose}"]`)
// 				.should('have.data', 'consent')
// 				.should('equal', true);
// 		});
// 	});
//
// 	it(`should deactivate all purposes except purpose 1`, () => {
// 		cy.visit(url);
// 		cy.setCookie('ccpaApplies', 'false');
// 		cy.setCookie('gdprApplies', 'true');
//
// 		cy.getIframeBody(iframeMessage)
// 			.find(`button[title="${buttonTitle}"]`)
// 			.click();
//
// 		cy.get('[data-cy=pm]').click();
//
// 		cy.getIframeBody(iframePrivacyManager)
// 			.find(`div[title="Store and/or access information on a device"]`)
// 			.find('span.on')
// 			.click();
//
// 		cy.getIframeBody(iframePrivacyManager).find(`div.stack-toggles`).click();
//
// 		cy.getIframeBody(iframePrivacyManager)
// 			.find(`button[title="Save and close"]`)
// 			.click();
//
// 		// eslint-disable-next-line cypress/no-unnecessary-waiting -- should we do this?
// 		cy.wait(2000);
//
// 		cy.get(`[data-purpose="1"]`)
// 			.should('have.data', 'consent')
// 			.should('equal', true);
//
// 		[2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach((purpose) => {
// 			cy.get(`[data-purpose="${purpose}"]`)
// 				.should('have.data', 'consent')
// 				.should('equal', false);
// 		});
// 	});
// });
