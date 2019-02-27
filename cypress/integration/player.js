const getStore = () => cy.window().its('store')

describe('player', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('should be render', () => {
    cy.get('#player');
  });

  it('audio', () => {
    cy.get('#player audio');
  });

  it('render song url', () => {
    cy
      .get('#player .player__title')
      .contains('/jezusesajelzoraketa.mp3')
  });

  it('render song duration', () => {
    cy
      .get('#player .player__duration')
      .contains('00:05:46')
  });

  context('without song', () => {
    beforeEach(() => {
      getStore().then(store => {
        store.set({ song: {} })
      })
    })

    it('default title', () => {
      cy
        .get('.player__title')
        .contains('No sound selected')
    });

    it('default duration', () => {
      cy
        .get('#player .player__duration')
        .contains('--:--:--')
    });
  })
});
