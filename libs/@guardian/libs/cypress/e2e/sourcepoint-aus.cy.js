import 'cypress-wait-until';
import {
	ACCOUNT_ID,
	ENDPOINT,
	PRIVACY_MANAGER_AUSTRALIA,
} from '../../src/consent-management-platform/lib/sourcepointConfig';

const iframeMessage = `[id^="sp_message_iframe_"]`;
const iframePrivacyManager = `#sp_message_iframe_${PRIVACY_MANAGER_AUSTRALIA}`;

// TODO add checkbox in UI, default to production
const url = `/#aus`;

const personalisedAdvertisingIs = (boolean) => {
	cy.get('[data-personalised-advertising]').should(
		'have.attr',
		'data-personalised-advertising',
		boolean.toString(),
	);
};

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
				expect(spConfig.accountId).equal(ACCOUNT_ID);
				expect(spConfig.baseEndpoint).equal(ENDPOINT);
			});
	});
});

describe('Document', () => {
	it('should have the Sourcepoint iframe', () => {
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
	it('should have personalised advertising set to true by default', () => {
		cy.visit(url);
		cy.setCookie('ccpaApplies', 'true');
		personalisedAdvertisingIs(true);
	});

	it('Should click continue to dismiss the banner', () => {
		cy.visit(url);
		cy.setCookie('ccpaApplies', 'true');
		cy.getIframeBody(iframeMessage).find(`button[title="Continue"]`).click();
	});

	it(`should be able to retract consent`, () => {
		cy.visit(url);
		cy.setCookie('ccpaApplies', 'true');

		personalisedAdvertisingIs(true);

		cy.get('[data-cy=pm]').click();

		cy.getIframeBody(iframePrivacyManager).find('.pm-toggle .off').click();

		cy.getIframeBody(iframePrivacyManager)
			.find('.sp_choice_type_SAVE_AND_EXIT')
			.should('be.visible')
			.click();

		personalisedAdvertisingIs(false);
	});
});
