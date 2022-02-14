describe('Test FAC developers', () => {

	it('Visits DEVS home', () => {
		cy.visit('https://developersdev.fastandcomfy.io')
	})

	it('Check all links on FAC home', () => {
		cy.visit('https://developersdev.fastandcomfy.io')
		cy.get('a:not([href^="mailto:"]):not([href*="www.linkedin.com"])').each(page => {
			cy.request(page.prop('href'))
		})
	});


	it('Link: your feedback', () => {
		cy
			.get('a')
			.contains('your feedback')
			.should('be.visible')
			.should('have.class', 'link-white')
			.should('have.attr', 'href', 'https://fastandcomfy.io/contact')
	})

	it('Link: Swagger API docs', () => {
		cy
			.get('a')
			.contains('Swagger API docs')
			.should('be.visible')
			.should('have.class', 'btn-secondary')
			.should('have.attr', 'href', '/swagger')
	})

	it('Link: Get your API key', () => {
		cy
			.get('a')
			.contains('Get your API key')
			.should('be.visible')
			.should('have.class', 'btn-dark')
			.should('have.attr', 'href', 'https://apidev.fastandcomfy.io/apikey')
	})

	it('Link: Wizard', () => {
		cy
			.get('a')
			.contains('Wizard — instant app runner')
			.should('be.visible')
			.should('have.class', 'btn-outline-dark')
			.should('have.attr', 'href', 'https://wizarddev.fastandcomfy.io')
	})

})