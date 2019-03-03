const getStore = () => cy.window().its('store')

describe('player', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  context('without song', () => {
    beforeEach(() => {
      cy.setStorage('playlist', {})
    })


    it('default', () => {
      cy
        .get('.playlist')
        .contains('Choose one song')
    })
  })

  context('with song', () => {
    beforeEach(() => {
      cy.setStorage('playlist', {
        title: 'Jézus és a jelzőrakéta',
        url: '/jezusesajelzoraketa.mp3',
        duration: (60 * 60) + (15 * 60) + 13
      })
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
  })
});
