describe('player', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  context('without song', () => {
    beforeEach(() => {
      cy.setStorage('song', {})
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

  context('with song', () => {
    beforeEach(() => {
      cy.setStorage('song', {
        title: 'Jézus és a jelzőrakéta',
        url: '/jezusesajelzoraketa.mp3'
      })
    })

    it('should be render', () => {
      cy.get('#player');
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
        cy.get('#player .player__play').contains('Pause')
    });

    it('stop sound', () => {
      cy.get('#player .player__play')
        .click()
        .click()
      cy.get('#player .player__play').contains('Play')
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
          expect($div[0].style.width).to.be.greaterThan('0.30%');
        })
    });

    it.skip('render current time2', () => { // TODO
      cy.get('audio').should($element => {
        $element[0].currentTime = 100;
      })
    });
  });
});
