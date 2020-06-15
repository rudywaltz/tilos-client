/* eslint-disable @getify/proper-arrows/name */
/* eslint-disable @getify/proper-arrows/where */
/* eslint-disable @getify/proper-arrows/this */

describe('show', () => {
  beforeEach(() => {
    cy.visit('/shows', {
      onBeforeLoad: (contentWindow) => {
        contentWindow.localStorage.clear();
      },
    });
  });

  it('should navigate from shows page', () => {
    cy.contains('a', '7térítő').click();
    cy.url().should('include', '/shows/7terito');
  });
});
