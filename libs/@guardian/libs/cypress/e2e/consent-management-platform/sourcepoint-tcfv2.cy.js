import { ENDPOINT } from './fixtures/sourcepointConfig';

const iframeMessage = `[id^="sp_message_iframe_"]`;
const iframePrivacyManager = '#sp_message_iframe_106842';

// TODO add checkbox in UI, default to production
const url = `/cmp-test-page#tcfv2`;

describe('Window', () => {
	it('has the guCmpHotFix object', () => {
		cy.visit(url);
		cy.window().should('have.property', 'guCmpHotFix');
	});
	it('has correct config params', () => {
		cy.visit(url);
		cy.window()
			.its('_sp_.config')
			.then((spConfig) => {
				expect(spConfig.accountId).equal(1257);
				expect(spConfig.baseEndpoint).equal(ENDPOINT);
			});
	});
});

describe('Document', () => {
	it('should have the SP iframe', () => {
		cy.visit(url);
		cy.get('iframe').should('be.visible').get(iframeMessage);
	});

	it('should have the correct script URL', () => {
		cy.visit(url);
		cy.get('script#sourcepoint-lib').should(
			'have.attr',
			'src',
			ENDPOINT + '/unified/wrapperMessagingWithoutDetection.js',
		);
	});
});

describe('Interaction', () => {
	const buttonTitle = 'Yes, I accept';

	it(`should give all consents when clicking "${buttonTitle}"`, () => {
		cy.visit(url);
		cy.setCookie('ccpaApplies', 'false');
		cy.setCookie('gdprApplies', 'true');

		cy.getIframeBody(iframeMessage)
			.find(`button[title="${buttonTitle}"]`)
			.click();

		// eslint-disable-next-line cypress/no-unnecessary-waiting -- should we do this?
		cy.wait(2000);

		[(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11)].forEach((purpose) => {
			cy.get(`[data-purpose="${purpose}"]`).should(
				'have.data',
				'consent',
				true,
			);
		});
	});

	it(`should deactivate purpose 1 only`, () => {
		cy.visit(url);
		cy.setCookie('ccpaApplies', 'false');
		cy.setCookie('gdprApplies', 'true');

		cy.getIframeBody(iframeMessage)
			.find(`button[title="${buttonTitle}"]`)
			.click();

		// eslint-disable-next-line cypress/no-unnecessary-waiting -- should we do this?
		cy.wait(2000);

		cy.get('[data-cy=pm]').click();

		cy.getIframeBody(iframePrivacyManager)
			.find(`div[title="Store and/or access information on a device"]`)
			.find('span.off')
			.click();

		cy.getIframeBody(iframePrivacyManager)
			.find(`button[title="Save and close"]`)
			.click();

		// eslint-disable-next-line cypress/no-unnecessary-waiting -- should we do this?
		cy.wait(2000);

		cy.get(`[data-purpose="1"]`)
			.should('have.data', 'consent')
			.should('equal', false);

		[2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach((purpose) => {
			cy.get(`[data-purpose="${purpose}"]`)
				.should('have.data', 'consent')
				.should('equal', true);
		});
	});

	it(`should deactivate all purposes except purpose 1`, () => {
		cy.visit(url);
		cy.setCookie('ccpaApplies', 'false');
		cy.setCookie('gdprApplies', 'true');

		cy.getIframeBody(iframeMessage)
			.find(`button[title="${buttonTitle}"]`)
			.click();

		cy.get('[data-cy=pm]').click();

		cy.getIframeBody(iframePrivacyManager)
			.find(`div[title="Store and/or access information on a device"]`)
			.find('span.on')
			.click();

		cy.getIframeBody(iframePrivacyManager).find(`div.stack-toggles`).click();

		cy.getIframeBody(iframePrivacyManager)
			.find(`button[title="Save and close"]`)
			.click();

		// eslint-disable-next-line cypress/no-unnecessary-waiting -- should we do this?
		cy.wait(2000);

		cy.get(`[data-purpose="1"]`)
			.should('have.data', 'consent')
			.should('equal', true);

		[2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach((purpose) => {
			cy.get(`[data-purpose="${purpose}"]`)
				.should('have.data', 'consent')
				.should('equal', false);
		});
	});
});
