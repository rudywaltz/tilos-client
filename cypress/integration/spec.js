describe('Tilos-client-app', () => {
  describe('store', () => {
    beforeEach(() => {
      cy.visit('/');

      localStorage.setItem('tilosStoreSong', JSON.stringify({
        title: 'Song From a local localStorage',
        url: '/gongs.mp3',
        duration: 22
      }));

      localStorage.setItem('tilosStorePlaylist', JSON.stringify([{
        title: 'Playlist From localStorage',
        url: '/jezusesajelzoraketa.mp3',
        duration: (60 * 60) + (15 * 60) + 13
      }]));

    });

    afterEach(() => {
      cy.clearLocalStorage();
    });

    it('with track', () => {
      cy
        .get('#player .player__title')
        .contains('Song From a local localStorage')
      cy
        .get('.song__title')
        .contains('Playlist From localStorage')
    })
  });

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
