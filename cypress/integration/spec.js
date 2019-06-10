describe('Tilos-client-app', () => {
  describe('navigation', () => {
    beforeEach(() => {
      cy.visit('/')
    });

    it('navigates to /archive', () => {
      cy.get('nav a').contains('Archívum').click();
      cy.url().should('include', '/archive');
    });

    it('should load previous day', () => {
      cy.visit('/archive/2018-05-10', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.localStorage.clear();
        }
      })
      cy.get('a').contains('Előző Nap').click();
      cy.get('.archive > :nth-child(1) .episode__title')
      .contains('Real Sitt');
    });

    it('should load next day', () => {
      cy.visit('/archive/2018-05-10', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.localStorage.clear();
        }
      })
      cy.get('a').contains('Következő Nap').click();
      cy.get('.archive > :nth-child(1) .episode__title')
      .contains('Optimal');
    });
  })
});
