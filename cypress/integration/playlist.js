describe('playlist', () => {
  context('without playlist', () => {
    it('default', () => {
      cy.visit('/', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.localStorage.clear();
          contentWindow.localStorage.setItem('tilosStorePlaylist', JSON.stringify([]));
        }
      });
      cy.get('.player__toggle_playlist').click();
      cy
        .get('.playlist')
        .contains('Choose one song');
    });
  });

  context('with song', () => {
    beforeEach(() => {
      cy.visit('/', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.localStorage.clear();
          contentWindow.localStorage.setItem('tilosStoreSong', JSON.stringify({
            title: 'Default Song',
            url: '/jezusesajelzoraketa.mp3'
          }));

          contentWindow.localStorage.setItem('tilosStorePlaylist', JSON.stringify([{
            title: 'Jézus és a jelzőrakéta',
            url: '/jezusesajelzoraketa.mp3',
            duration: (60 * 60) + (15 * 60) + 13
          }]));
        }
      });

      cy.get('.player__toggle_playlist').click();
    });

    it('title', () => {
      cy
        .get('.playlist .song__title')
        .contains('Jézus és a jelzőrakéta');
    });

    it('duration', () => {
      cy
        .get('.playlist .song__duration')
        .contains('01:15:13');
    });

    it('clear playlist', () => {
      cy.get('.playlist__clear')
        .click();

      cy
        .get('.playlist')
        .contains('Choose one song');
    });
  });

  describe('multiple title', () => {
    beforeEach(()=> {
      cy.visit('/', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.localStorage.clear();
          contentWindow.localStorage.setItem('tilosStoreSong', JSON.stringify({
            title: 'Default Song',
            url: '/jezusesajelzoraketa.mp3'
          }));

          contentWindow.localStorage.setItem('tilosStorePlaylist', JSON.stringify([{
            title: 'Jézus és a jelzőrakéta',
            url: '/jezusesajelzoraketa.mp3',
            duration: (60 * 60) + (15 * 60) + 13
          },
          {
            title: 'Lorem ipsum',
            url: '/aaaa.mp3',
            duration: (2 * 60 * 60) + (4 * 60) + 9
          }
          ]));
        }
      });

      cy.get('.player__toggle_playlist').click();
    });

    it('render data', () => {
      cy.get('ul .song__title:nth-child(1)')
        .contains('Lorem ipsum');
    });


    it('remove one song', () => {
      cy.get(':nth-child(2) > .song__clear').click().should(() => {
        expect(JSON.parse(localStorage.getItem('tilosStorePlaylist'))).to.deep.equal([{
          title: 'Jézus és a jelzőrakéta',
          url: '/jezusesajelzoraketa.mp3',
          duration: (60 * 60) + (15 * 60) + 13
        }]);
      });
    });

    it('removing song button working multiple time', () => {
      cy.get(':nth-child(1) > .song__clear').click();
      cy.get(':nth-child(1) > .song__clear').click();
      cy
        .get('.playlist')
        .contains('Choose one song');
    });
  });
});
