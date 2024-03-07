// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('getIframeBody', (selector = '') => {
	// get the iframe > document > body
	// and retry until the body element is not empty
	return (
		cy
			.get(`iframe${selector}`)
			.its('0.contentDocument.body')
			.should('not.be.empty')
			// wraps "body" DOM element to allow
			// chaining more Cypress commands, like ".find(...)"
			// https://on.cypress.io/wrap
			.then(cy.wrap)
	);
});
Cypress.Commands.overwrite('log', (subject, message) =>
	cy.task('log', message),
);
