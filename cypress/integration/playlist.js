/* eslint-disable @getify/proper-arrows/name */
/* eslint-disable @getify/proper-arrows/where */
/* eslint-disable @getify/proper-arrows/this */

describe('playlist', () => {
  context('without playlist', () => {
    it('default', () => {
      cy.visit('/', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.localStorage.clear();
          contentWindow.localStorage.setItem(
            'tilosStorePlaylist',
            JSON.stringify([])
          );
        },
      });
      cy.get('.player__toggle_playlist').click();
      cy.get('.playlist').should('contain', 'Choose one song');
    });
  });

  context('with song', () => {
    beforeEach(() => {
      cy.visit('/', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.localStorage.clear();
          contentWindow.localStorage.setItem(
            'tilosStoreSong',
            JSON.stringify({
              title: 'Default Song',
              url: '/jezusesajelzoraketa.mp3',
            })
          );

          contentWindow.localStorage.setItem(
            'tilosStorePlaylist',
            JSON.stringify([
              {
                title: 'Jézus és a jelzőrakéta',
                url: '/jezusesajelzoraketa.mp3',
                duration: 60 * 60 + 15 * 60 + 13,
              },
            ])
          );
        },
      });

      cy.get('.player__toggle_playlist').click();
    });

    it('title', () => {
      cy.get('.playlist .song__title').should(
        'contain',
        'Jézus és a jelzőrakéta'
      );
    });

    it('duration', () => {
      cy.get('.playlist .song__duration').should('contain', '01:15:13');
    });

    it('clear playlist', () => {
      cy.get('.playlist__clear').click();

      cy.get('.playlist').should('contain', 'Choose one song');
    });
  });

  describe('multiple title', () => {
    beforeEach(() => {
      cy.visit('/', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.localStorage.clear();
          contentWindow.localStorage.setItem(
            'tilosStoreSong',
            JSON.stringify({
              title: 'Default Song',
              url: '/jezusesajelzoraketa.mp3',
            })
          );

          contentWindow.localStorage.setItem(
            'tilosStorePlaylist',
            JSON.stringify([
              {
                title: 'Jézus és a jelzőrakéta',
                url: '/jezusesajelzoraketa.mp3',
                duration: 60 * 60 + 15 * 60 + 13,
              },
              {
                title: 'Lorem ipsum',
                url: '/aaaa.mp3',
                duration: 2 * 60 * 60 + 4 * 60 + 9,
              },
            ])
          );
        },
      });

      cy.get('.player__toggle_playlist').click();
    });

    it('render data', () => {
      cy.get('ul .song__title:nth-child(1)').should('contain', 'Lorem ipsum');
    });

    it('remove one song', () => {
      cy.get(':nth-child(2) > .song__clear')
        .click()
        .should(() => {
          expect(
            JSON.parse(localStorage.getItem('tilosStorePlaylist'))
          ).to.deep.equal([
            {
              title: 'Jézus és a jelzőrakéta',
              url: '/jezusesajelzoraketa.mp3',
              duration: 60 * 60 + 15 * 60 + 13,
            },
          ]);
        });
    });

    it('removing song button working multiple time', () => {
      cy.get(':nth-child(1) > .song__clear').click();
      cy.get(':nth-child(1) > .song__clear').click();
      cy.get('.playlist').should('contain', 'Choose one song');
    });
  });
});
