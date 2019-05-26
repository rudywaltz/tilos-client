describe('Tilos-client-app', () => {
  describe('navigation', () => {
    beforeEach(() => {
      cy.visit('/')
    });

    it('navigates to /archive', () => {
      cy.get('nav a').contains('Archívum').click();
      cy.url().should('include', '/archive');
    });
  })
});
