import 'cypress-wait-until';
import {
	ENDPOINT,
	PRIVACY_MANAGER_USNAT,
	PRIVACY_MANAGER_USNAT_SECOND_LAYER,
} from './fixtures/sourcepointConfig';

const iframeMessage = `[id^="sp_message_iframe_"]`;
const iframePrivacyManager = `#sp_message_iframe_${PRIVACY_MANAGER_USNAT}`;
const iframePrivacyManagerSecondLayer = `#sp_message_iframe_${PRIVACY_MANAGER_USNAT_SECOND_LAYER}`;

// TODO add checkbox in UI, default to production
const url = `/cmp-test-page#usnat`;

const doNotSellIs = (boolean) => {
	cy.get('[data-donotsell]').should(
		'have.attr',
		'data-donotsell',
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
	const buttonTitle = 'Do not sell my personal information';

	it('should have DNS set to false by default', () => {
		cy.visit(url);
		doNotSellIs(false);
	});

	it(`should open privacy manager when clicking "${buttonTitle}"`, () => {
		cy.visit(url);
		cy.getIframeBody(iframeMessage)
			.find(`button[title="${buttonTitle}"]`)
			.click();

		// eslint-disable-next-line cypress/no-unnecessary-waiting -- should we do this?
		cy.wait(2000);

		cy.getIframeBody(iframePrivacyManagerSecondLayer)
			.find(`.sp_choice_type_13`)
			.should('be.visible')
			.click();

		doNotSellIs(false);
	});

	it(`should be able to interact with the toggle privacy manager`, () => {
		cy.visit(url);

		doNotSellIs(false);

		cy.get('[data-cy=pm]').click();

		cy.getIframeBody(iframePrivacyManager).find('.pm-toggle .off').click();

		cy.getIframeBody(iframePrivacyManager)
			.find('.sp_choice_type_SE')
			.should('be.visible')
			.click();
	});
});
