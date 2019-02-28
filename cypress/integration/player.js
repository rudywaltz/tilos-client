const getStore = () => cy.window().its('store')

const expectPlayingAudio = (elem, assert = true) => {
  elem.should(el => {
    const audible = el[0].duration > 0 && !el[0].paused && !el[0].muted;
    expect(audible).to.eq(assert);
  })
}


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
    it('default current time', () => {
      cy
        .get('#player .player__current')
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
      .click();
    expectPlayingAudio(cy.get('audio'), true);
  });

  it('stop sound', () => {
    cy.get('#player .player__play')
      .click()
      .click()
      expectPlayingAudio(cy.get('audio'), false);
  });

  it('has progressbar', () => {
    cy.get('#player .progress .progress__bar')
  });

  it('render current time', () => { // TODO: more accurate test
    cy.get('#player .player__play')
      .click()
    cy.get('#player .player__current')
    .contains('00:00:01')
    cy.get('#player .player__current')
    .contains('00:00:02')
    cy.get('.progress__bar')
      .should( $div => {
         expect($div[0].style.width).to.eq('0.3%');
      })
  });

  it.skip('render current time2', () => { // TODO
    cy.get('audio').should($element => {
      $element[0].currentTime = 100;
    })
  });
});
