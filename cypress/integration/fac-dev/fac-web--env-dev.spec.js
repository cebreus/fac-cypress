describe('Test FAC web', () => {
	// it('Check redirects', () => {
	// 	cy.request({
	// 		url: 'https://dev.fastandcomfy.io/',
	// 		followRedirect: true,
	// 	}).then((resp) => {
	// 		expect(resp.status).to.eq(301)
	// 		expect(resp.redirectedToUrl).to.eq('https://dev.fastandcomfy.io')
	// 	})

	// 	cy.request({
	// 		url: 'https://dev.fastandcomfy.io',
	// 		followRedirect: false,
	// 	}).then((resp) => {
	// 		expect(resp.status).to.eq(200)
	// 	})
	// })

	it('Visits FAC home', () => {
		cy.visit('https://dev.fastandcomfy.io')
	})

	it('Check all links on FAC home', () => {
		cy.visit('https://dev.fastandcomfy.io')
		cy.get('a:not([href^="mailto:"]):not([href*="www.linkedin.com"])').each(page => {
			cy.request(page.prop('href'))
		})
	});

	// it('apps', () => {
	// 	cy
	// 		.get('[data-cy="AppTile"]:not([href^="/postgresql"]):not([href^="/mysql"]):not([href^="/redis"]):not([href^="/mongodb"] .btn)')
	// 		.should('contain', 'Show')
	// })

	it('AppTile PostgreSQL', () => {
		cy
			.get('[data-cy="AppTile"][href^="/postgresql"] .btn')
			.should('contain', 'Run')
	})

	it('AppTile MySQL', () => {
		cy
			.get('[data-cy="AppTile"][href^="/mysql"] .btn')
			.should('contain', 'Run')
	})

	it('AppTile Redis', () => {
		cy
			.get('[data-cy="AppTile"][href^="/redis"] .btn')
			.should('contain', 'Run')
	})

	it('AppTile MongoDB', () => {
		cy
			.get('[data-cy="AppTile"][href^="/mongodb"] .btn')
			.should('contain', 'Run')
	})

	it('Run PostgreSQL', () => {
		cy
			.get('[data-cy="AppTile"][href^="/postgresql"] .btn')
			.click()
			.get('.btn-success').then(($btn) => {
				cy.wrap($btn).should('contain', 'Run')
				cy.wrap($btn).click()
			})
			.wait(5000)
			.get('.c-app-starter--done')
			.should('be.visible')
			.should('contain', 'App ID')
	})

	it('Go to Contact from top menu', () => {
		cy
			.get('.c-menu__label')
			.click()
			.get('.u-link[href^="/contact"]').then(($btn) => {
				cy.wrap($btn).should('contain', 'Contact')
				cy.wrap($btn).click()
			})
			.wait(1000)
			.get('h1.c-header__title')
			.should('have.text', 'Contact')
	})

	it('Visits FAC Contact', () => {
		cy.visit('https://dev.fastandcomfy.io/contact')
	})

	it('Send contact form', () => {
		cy
			.get('[data-cy="FormContact"]')
			.should('be.visible')
			.get('#email').then(($input) => {
				cy.wrap($input).should('have.attr', 'required')
			})
			.get('.btn-success').then(($btn) => {
				cy.wrap($btn).should('be.visible').should('contain', 'Submit').should('have.attr', 'disabled')
			})
			.wait(3000)
			.get('#email').then(($input) => {
				cy.wrap($input).focus().type('me@cebre.us')
			})
			.get('.btn-success').then(($btn) => {
				cy.wrap($btn).not('disabled')
				cy.wrap($btn).click()
			})
			.wait(3000)
			.get('[data-cy="Alert"].alert-success').should('be.visible').should('contain', 'Thank you for your message!')
	})

	it('Visits FAC Submit idea', () => {
		cy.visit('https://dev.fastandcomfy.io/submit-your-idea')
	})

	it('Button Submit your idea', () => {
		cy
			.get('[data-cy="submit-your-idea"]')
			.should('be.visible')
			.should('have.class', 'btn-secondary')
			.should('have.text', 'Submit your idea')
			.should('have.attr', 'href', 'mailto:info@fastandcomfy.io?subject=New idea for project or app&body=%0D%0A%0D%0A—%0D%0AFrom https://fastandcomfy.io/submit-your-idea')
	})

	it('Visits FAC Strapi', () => {
		cy.visit('https://dev.fastandcomfy.io/strapi')
	})

	it('Send Strapi interest', () => {
		cy
			.get('.btn-success').then(($btn) => {
				cy.wrap($btn).should('contain', 'I want this')
				cy.wrap($btn).click()
			})
			.wait(3000)
			.get('[data-cy="FormContact"]')
			.should('be.visible')
			.get('#email').then(($input) => {
				cy.wrap($input).should('have.attr', 'required')
			})
			.get('.btn-success').then(($btn) => {
				cy.wrap($btn).should('be.visible').should('contain', 'Submit').should('have.attr', 'disabled')
			})
			.wait(3000)
			.get('#email').then(($input) => {
				cy.wrap($input).focus().type('me@cebre.us')
			})
			.get('.btn-success').then(($btn) => {
				cy.wrap($btn).not('disabled')
				cy.wrap($btn).click()
			})
			.wait(3000)
			.get('[data-cy="Alert"].alert-success').should('be.visible').should('contain', 'Thank you for your interest!')
	})

	it('Button Eager Write tu us', () => {
		cy
			.get('[data-cy="eager-app"]')
			.should('be.visible')
			.should('have.text', 'Write to us.')
			.should('have.attr', 'href', 'mailto:info@fastandcomfy.io?subject=strapi — fastandcomfy.io&amp;body=%0D%0A%0D%0A—%0D%0AFrom https://fastandcomfy.io/strapi')
	})


	it('Visits FAC FAQ', () => {
		cy.visit('https://dev.fastandcomfy.io/help')
	})

	it('Button Resources', () => {
		cy
			.get('[data-cy="HeaderPerex"] [href*="developers"]')
			.should('be.visible')
			.should('have.text', 'Resources for developers')
			.should('have.attr', 'href', 'https://developersdev.fastandcomfy.io')
			.should('have.class', 'btn-secondary')
	})

	it('Button Pricing', () => {
		cy
			.get('[data-cy="HeaderPerex"] [href*="pricing"]')
			.should('be.visible')
			.should('have.text', 'Pricing')
			.should('have.class', 'btn-link')
			.should('have.class', 'btn-white')
			.should('have.attr', 'href', '/pricing')
	})

	it('Visits FAC Procong', () => {
		cy.visit('https://dev.fastandcomfy.io/pricing')
	})

	it('Link: suggestions and comments', () => {
		cy
			.get('a')
			.contains('suggestions and comments')
			.should('be.visible')
			.should('have.class', 'link-white')
			.should('have.attr', 'href', 'mailto:info@fastandcomfy.io?subject=New%20idea%20for%20project%20or%20app&body=%0D%0A%0D%0A%E2%80%94%0D%0AFrom%20https://fastandcomfy.io/pricing')
	})

	it('Link: Contact us', () => {
		cy
			.get('a')
			.contains('Contact us')
			.should('be.visible')
			.should('have.class', 'link-white')
			.should('have.attr', 'href', '/contact')
	})

	it('Link: public API', () => {
		cy
			.get('a')
			.contains('public API')
			.should('be.visible')
			.should('have.class', 'link-white')
			.should('have.attr', 'href', 'https://apidev.fastandcomfy.io')
	})

})