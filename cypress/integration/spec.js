describe('Tilos-client-app', () => {
  describe('navigation', () => {
    beforeEach(() => {
      cy.visit('/')
    });

    it('navigates to /about', () => {
      cy.get('nav a').contains('about').click();
      cy.url().should('include', '/about');
    });
  })
});
