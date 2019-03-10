const getStore = () => cy.window().its('store')

describe('playlist', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  context('without song', () => {
    beforeEach(() => {
      cy.setStorage('playlist', [])
    })


    it('default', () => {
      cy
        .get('.playlist')
        .contains('Choose one song')
    })
  })

  context('with song', () => {
    beforeEach(() => {
      cy.setStorage('song', {
        title: 'Default Song',
        url: '/jezusesajelzoraketa.mp3'
      })
      cy.setStorage('playlist', [{
        title: 'Jézus és a jelzőrakéta',
        url: '/jezusesajelzoraketa.mp3',
        duration: (60 * 60) + (15 * 60) + 13
      }])
    })

    it('title', () => {
      cy
        .get('.playlist .song__title')
        .contains('Jézus és a jelzőrakéta')
    })

    it('duration', () => {
      cy
        .get('.playlist .song__duration')
        .contains('01:15:13')
    })

    it('multiple title', () => {
      cy.setStorage('playlist', [{
        title: 'Jézus és a jelzőrakéta',
        url: '/jezusesajelzoraketa.mp3',
        duration: (60 * 60) + (15 * 60) + 13
      },
      {
        title: 'Lorem ipsum',
        url: '/aaaa.mp3',
        duration: (2 * 60 * 60) + (4 * 60) + 9
      }
    ])

      cy.get('ul .song__title:nth-child(1)')
        .contains('Lorem ipsum')
    })

    it('clear playlist', () => {
      cy.get('.playlist__clear')
        .click();

      cy
        .get('.playlist')
        .contains('Choose one song');

        cy.window()
          .its('store')
          .then(store => {
            const { playlist } = store.get();
            expect(playlist).to.be.empty;
          })
    })

    it('remove one song', () => {
      cy.setStorage('playlist', [{
        title: 'Jézus és a jelzőrakéta',
        url: '/jezusesajelzoraketa.mp3',
        duration: (60 * 60) + (15 * 60) + 13
      },
      {
        title: 'Lorem ipsum',
        url: '/aaaa.mp3',
        duration: (2 * 60 * 60) + (4 * 60) + 9
      }]);

      cy.get(':nth-child(2) > .song__clear')
        .click();

      // cy
      //   .get('.playlist li').not.contains('Lorem ispum');

        cy.window()
          .its('store')
          .then(store => {
            const { playlist } = store.get();
            expect(playlist).to.deep.equal([{
              title: 'Jézus és a jelzőrakéta',
              url: '/jezusesajelzoraketa.mp3',
              duration: (60 * 60) + (15 * 60) + 13
            }]);
          })
    })
  })
});
