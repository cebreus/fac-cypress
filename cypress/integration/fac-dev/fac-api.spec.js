describe('Test FAC API', () => {

  let root = 'https://api-dev.fastandcomfy.io';
  let rootSwagger = 'https://developersdev.fastandcomfy.io/swagger';
  let email = 'me@cebre.us';

  it('Visits API home', () => {
    cy.visit(root)
  })

  it('Check all links on API home', () => {
    cy.visit(root)
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
      .should('have.attr', 'href', rootSwagger)
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
    cy.visit(root + '/apikey')
  })

  it('Send form', () => {
    cy
      .get('[data-cy="FormGetApiKey"]')
      .should('be.visible')
      .get('#email').then(($input) => {
        cy.wrap($input)
          .should('have.attr', 'required')
      })
      .get('button[type="submit"]').then(($btn) => {
        cy.wrap($btn)
          .should('be.visible')
          .should('contain', 'Submit')
        // .should('have.attr', 'disabled')
      })
      .wait(3000)
      .get('#email').then(($input) => {
        cy.wrap($input)
          .focus()
          .type(email)
      })
      .get('button[type="submit"]').then(($btn) => {
        cy.wrap($btn).not('disabled')
        cy.wrap($btn).click()
      })
      .wait(3000)
      .get('[data-cy="FormVerifyApiKey"]')
      .should('be.visible')
      .get('[data-cy="HeaderPerex"]')
      .should('contain', email)
  })

})
