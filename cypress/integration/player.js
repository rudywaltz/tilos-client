const getStore = () => cy.window().its('store')

const expectPlayingAudio = (elem, assert = true) => {
  elem.should(el => {
    const audible = el[0].duration > 0 && !el[0].paused && !el[0].muted;
    expect(audible).to.eq(assert);
  })


describe('player', () => {
  beforeEach(() => {
    cy.visit('/')
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

  it('play sound', () => {
    cy.get('#player .player__play')
      .click()
    expectPlayingAudio(cy.get('audio'), true);
  });

  it('stop sound', () => {
    cy.get('#player .player__play')
      .click()
      .click()
      expectPlayingAudio(cy.get('audio'), false);
  });
});
