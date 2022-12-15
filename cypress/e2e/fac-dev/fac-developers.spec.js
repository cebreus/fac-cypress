describe('Test FAC developers', () => {
  const root = 'https://developersdev.fastandcomfy.io';
  const rootApi = 'https://api-dev.fastandcomfy.io';
  const rootWeb = 'https://dev.fastandcomfy.io';
  const rootWizard = 'https://wizarddev.fastandcomfy.io';

  it('Visits DEVS home', () => {
    cy.visit(root);
  });

  it('Check all links on FAC home', () => {
    cy.visit(root);
    cy.get('a:not([href^="mailto:"]):not([href*="www.linkedin.com"])').each(
      (page) => {
        cy.request(page.prop('href'));
      }
    );
  });

  it('Link: your feedback', () => {
    cy.get('a')
      .contains('your feedback')
      .should('be.visible')
      .should('have.class', 'link-white')
      .should('have.attr', 'href', `${rootWeb}/contact`);
  });

  it('Link: Swagger API docs', () => {
    cy.get('a')
      .contains('Swagger API docs')
      .should('be.visible')
      .should('have.class', 'btn-secondary')
      .should('have.attr', 'href', '/swagger');
  });

  it('Link: Get your API key', () => {
    cy.get('a')
      .contains('Get your API key')
      .should('be.visible')
      .should('have.class', 'btn-dark')
      .should('have.attr', 'href', `${rootApi}/apikey`);
  });

  it('Link: Wizard', () => {
    cy.get('a')
      .contains('Wizard — instant app runner')
      .should('be.visible')
      .should('have.class', 'btn-outline-dark')
      .should('have.attr', 'href', rootWizard);
  });
});
