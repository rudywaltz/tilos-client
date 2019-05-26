describe('episode', () => {
  beforeEach(() => {
    cy.visit('/archive', {
      onBeforeLoad: (contentWindow) => {
        contentWindow.localStorage.clear();
      }
    })
  })

  it('should render episode data', () => {
    cy.get('.archive > :nth-child(2) .episode__title')
      .contains('BEAT SAFARI');
    cy.get('.archive > :nth-child(2) .episode__duration')
      .contains('01:59:36');
    cy.get('.archive > :nth-child(2) .episode__diary')
      .contains('// 28 ▶︎ Soundhunter & Darth Peter & Magematix');
    cy.get('.archive > :nth-child(2) .episode__link')
      .contains('https://archive.tilos.hu/mp3/tilos-20180510-025954-045930.mp3');
  })

  it('should add to playlist', () => {
    cy.get('.archive > :nth-child(1) .episode__add_playlist').click()
    cy.get('.player__toggle_playlist').click()
    cy
     .get('.playlist .song__title')
      .contains('Hotel North Pole')
  })

  it('should the add playlist button disabled if it is already in playlist', () => {
    cy.get('.archive > :nth-child(1) .episode__add_playlist').click()
    cy.get('.archive > :nth-child(1) .episode__add_playlist').should('be.disabled');
  })
});
