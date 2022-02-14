describe('Test FAC developers', () => {

	it('Visits API home', () => {
		cy.visit('https://apidev.fastandcomfy.io')
	})

	it('Check all links on FAC home', () => {
		cy.visit('https://apidev.fastandcomfy.io')
		cy.get('a:not([href^="mailto:"]):not([href*="www.linkedin.com"])').each(page => {
			cy.request(page.prop('href'))
		})
	});

	it('Link: Read our docs', () => {
		cy
			.get('a')
			.contains('Read our docs')
			.should('be.visible')
			.should('have.class', 'btn-secondary')
			.should('have.attr', 'href', 'https://developersdev.fastandcomfy.io/swagger')
	})

	it('Link: Get your API key', () => {
		cy
			.get('a')
			.contains('Get your API key')
			.should('be.visible')
			.should('have.class', 'btn-secondary')
			.should('have.attr', 'href', '/apikey')
	})

	it('Visits Get your API key', () => {
		cy.visit('https://apidev.fastandcomfy.io/apikey')
	})

	// it('Send form', () => {
	// 	cy
	// 		.get('[data-cy="FormContact"]')
	// 		.should('be.visible')
	// 		.get('#email').then(($input) => {
	// 			cy.wrap($input).should('have.attr', 'required')
	// 		})
	// 		.get('.btn-success').then(($btn) => {
	// 			cy.wrap($btn).should('be.visible').should('contain', 'Submit').should('have.attr', 'disabled')
	// 		})
	// 		.wait(3000)
	// 		.get('#email').then(($input) => {
	// 			cy.wrap($input).focus().type('me@cebre.us')
	// 		})
	// 		.get('.btn-success').then(($btn) => {
	// 			cy.wrap($btn).not('disabled')
	// 			cy.wrap($btn).click()
	// 		})
	// 		.wait(3000)
	// 		.get('[data-cy="Alert"].alert-success').should('be.visible').should('contain', 'Thank you for your message!')
	// })

})