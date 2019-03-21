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

    it('buttons disabled', () => {
      cy.get('#player .player__play').should('be.disabled');
      cy.get('#player .player__seek').should('be.disabled');
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
        .contains('Jézus és a jelzőrakéta')
    });

    it('render song duration', () => {
      cy
        .get('#player .player__duration')
        .contains('00:05:46')
    });

    it('play sound', () => {
      cy.get('#player .player__play')
        .click();
        cy.get('#player .player__play').contains('Stop')
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

    it('render current time', () => {
      cy.get('#player .player__play')
        .click()
      cy.get('#player .player__current')
        .contains('00:00:01')
    });

    it('progressbar display current position', () => {
      cy.get('#player .player__play')
        .click()
      cy.get('#player .player__seek')
        .click()
      cy.get('#player .player__current')
        .contains('00:00:32')
      cy.get('.progress__bar')
        .should( $div => {
          expect($div[0].style.width).to.be.greaterThan('5%');
        })
    });

    it('play next sound continously', () => {
      cy.setStorage('song', {});
      cy.setStorage('playlist', [{
        title: 'Gongs',
        url: '/gongs.mp3',
        duration: 22
      },
      {
        title: 'Jézus és a jelzőrakéta',
        url: '/jezusesajelzoraketa.mp3',
        duration: (60 * 60) + (15 * 60) + 13
      }]);

      cy.get('#player .player__play')
        .click()
      cy.get('#player .player__seek')
        .click()

      cy.get('.player__title')
        .contains('Jézus és a jelzőrakéta')
      cy.get('#player .player__current')
        .contains('00:00:01')
    });

    it('render current volume', () => {
      cy.get('.volume .volume__bar')
        .should( $div => {
          expect($div[0].style.width).to.eq('50%');
        })
    });

    it('should change the volume base cursor position', () => {
      cy.get('.volume')
        .click(150, 10)
      cy.get('.volume .volume__bar')
        .should( $div => {
          expect($div[0].style.width).to.eq('75%');
        })
    });

    it('should constantly change if mouse move', () => {
      cy.get('.volume')
        .trigger('mousedown', 'center', 'center')
        .trigger('mousemove', 50, 10, { buttons: 1 })
      cy.get('.volume .volume__bar')
        .should( $div => {
          expect($div[0].style.width).to.eq('25%');
        })
    });
  });
});
