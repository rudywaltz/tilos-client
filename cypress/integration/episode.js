describe('episode', () => {
  beforeEach(() => {
    cy.visit('/archive/2018-05-10', {
      onBeforeLoad: (contentWindow) => {
        contentWindow.localStorage.clear();
      },
    });
  });

  it('should render episode data', () => {
    cy.get('.archive > :nth-child(2) .episode__title').contains('BEAT SAFARI');
    cy.get('.archive > :nth-child(2) .episode__duration').contains('01:59:36');
    cy.get('.archive > :nth-child(2) .episode__diary').contains(
      '// 28 ▶︎ Soundhunter & Darth Peter & Magematix'
    );
    cy.get('.archive > :nth-child(2) .episode__link').contains(
      'https://archive.tilos.hu/mp3/tilos-20180510-025954-045930.mp3'
    );
    cy.get('.archive > :nth-child(2) .episode__add_playlist').contains(
      'Add to Playlist'
    );
  });

  it('should add to playlist', () => {
    cy.get('.archive > :nth-child(2) .episode__add_playlist').click();
    cy.get('.archive > :nth-child(1) .episode__add_playlist').click();
    cy.get('.player__toggle_playlist').click();
    cy.get('.playlist .song__title').contains('Hotel North Pole');
  });

  it('should be disabled if the epsiode in the future', () => {
    cy.visit('/archive/2028-05-10');
    cy.get('.archive > :nth-child(1) .episode__add_playlist').should(
      'be.disabled'
    );
  });

  it('should remove from playlist if was there before', () => {
    cy.get('.archive > :nth-child(1) .episode__add_playlist').click();
    cy.get('.archive > :nth-child(1) .episode__add_playlist').contains(
      'Remove from Playlist'
    );
    cy.get('.archive > :nth-child(2) .episode__add_playlist').click();
    cy.get('.archive > :nth-child(2) .episode__add_playlist').contains(
      'Remove from Playlist'
    );
    cy.get('.archive > :nth-child(1) .episode__add_playlist').click();
    cy.get('.player__toggle_playlist').click();
    cy.get('.playlist').contains('Choose one song');
  });

  it('should hide similar artist', () => {
    cy.get('.archive > :nth-child(3) .episode__hide_artist').click();
    cy.get('.archive').should(($page) => {
      expect($page).to.not.contain('Tilos Hírek');
    });
  });

  it('should store hidden show list in localstorage', () => {
    cy.get('.archive > :nth-child(3) .episode__hide_artist')
      .click()
      .should(() => {
        expect(
          JSON.parse(localStorage.getItem('tilosStorehiddenShows'))
        ).to.deep.equal(['5480cee86dab254449a7cc7c']);
      });
  });

  it('handle invalid url', () => {
    cy.visit('/archive/2018-05-blabla', {
      onBeforeLoad: (contentWindow) => {
        contentWindow.localStorage.clear();
      },
    });
    cy.get('.archive').contains('Nincs elérhető adás');
  });

  describe('localstorage', () => {
    beforeEach(() => {
      cy.visit('/archive/2018-05-10', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.localStorage.clear();
          contentWindow.localStorage.setItem(
            'tilosStorehiddenShows',
            JSON.stringify(['5480cee86dab254449a7cc7c'])
          );
        },
      });
    });

    it('load data', () => {
      cy.get('.archive').should(($page) => {
        expect($page).to.not.contain('Tilos Hírek');
      });
    });
  });
});
