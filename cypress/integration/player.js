describe('player', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  describe('without song', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.visit('/')
    });

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

    it('should be toggle playlist', () => {
      cy
        .get('#player .player__toggle_playlist')
        .click();
      cy
        .get('.playlist')
        .should('be.visible');
    });

    it('has progressbar', () => {
      cy.get('#player .progress .progress__bar')
    });
  })

  describe('with song', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.visit('/', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.localStorage.setItem('tilosStoreSong', JSON.stringify({
            title: 'Jézus és a jelzőrakéta',
            url: '/jezusesajelzoraketa.mp3'
          }))
        }
      })
    })

    it.skip('play next sound continously', () => {
      cy.setStorage('tilosStorePlaylist', [{
          title: 'Gongs',
          url: '/gongs.mp3',
          duration: 22
        },
        {
          title: 'Jézus és a jelzőrakéta',
          url: '/jezusesajelzoraketa.mp3',
          duration: (60 * 60) + (15 * 60) + 13
        }]
      );
      cy.visit('/')

      cy.get('#player .player__play')
        .click()
      cy.get('#player .player__seek')
        .click()

      cy.get('.player__title')
        .contains('Jézus és a jelzőrakéta')
      cy.get('#player .player__play')
        .contains('Stop')
      cy.get('#player .player__current')
        .contains('00:00:01')
    });

    it('should be render', () => {
      cy.get('#player');
      cy.get('#player .player__play').should('be.not.disabled');
    });

    it('render song title', () => {
      cy
        .get('#player .player__title')
        .contains('Jézus és a jelzőrakéta')
    });

    it('render song duration', () => {
      cy
        .get('#player .player__duration')
        .contains('00:05:46')
    });

    it('render current time', () => {
      cy.get('#player .player__play')
        .click()
      cy.get('#player .player__current')
        .contains('00:00:01')
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

    it.skip('should remove the last sound after end', () => {
      cy.setStorage('song', {
        title: 'Gongs',
        url: '/gongs.mp3'
      });

      cy.get('#player .player__play')
        .click();
      cy.get('#player .player__seek')
        .click();

      cy
        .get('.player__title')
        .contains('No sound selected');
      cy
        .get('#player .player__duration')
        .contains('--:--:--');
    });


    it('should save current time to localstorage', () => {
      cy.get('#player .player__play')
        .click();
      cy.wait(200);
      cy.reload().should(()=> {
        const savedData = JSON.parse(localStorage.getItem('tilosStoreSong'))
        expect(savedData.time).to.be.greaterThan(.1);
      });
    });

    it.skip('should not save empty data in localStorage', () => {
      cy.setStorage('tilosStoreSong', {
        title: 'Gongs',
        url: '/gongs.mp3'
      });

      cy.get('#player .player__play')
        .click();
      cy.get('#player .player__seek')
        .click();
      cy.reload().should(()=> {
        expect(localStorage.getItem('tilosStoreSong')).to.be.null;
      });
    });


    it('should set back to the current song', () => {
      cy.get('#player .player__play')
        .click();
      cy.wait(500);
      cy.get('#player .player__current')
      .contains('00:00:01')
      cy.get('.progress__bar')
      .should( $div => {
        expect($div[0].style.width).to.be.greaterThan('0.1%');
      });
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

    it('should change the track position base cursor position', () => {
      cy.get('#player .player__play')
        .click()
      cy.get('.progress')
        .click(625, 10)
      cy.get('.progress .progress__bar')
        .should( $div => {
          expect($div[0].style.width).to.greaterThan('75%');
          expect($div[0].style.width).to.lessThan('76%');
        })
    });

    it('should constantly change the track position if mouse move', () => {
      cy.get('#player .player__play')
        .click()
      cy.get('.progress')
        .trigger('mousedown', 'center', 'center')
        .trigger('mousemove', 210, 10, { buttons: 1 })
      cy.get('.progress .progress__bar')
        .should( $div => {
          expect($div[0].style.width).to.lessThan('25.5%');
          expect($div[0].style.width).to.greaterThan('24%');
        })
    });

    it.skip('should not seeking if track not playing', () => {
      cy.get('.progress')
        .click(150, 10)
      cy.get('#player .player__play')
        .click()
      cy.get('.progress .progress__bar')
        .should( $div => {
          expect($div[0].style.width).to.lessThan('1%');
        })
    })

    it.skip('render current volume', () => { // hover in cypress
      cy.get('.player__song_control').trigger('mouseover');
      cy.get('.volume .volume__bar')
        .should( $div => {
          expect($div[0].style.width).to.eq('50%');
        })
    });

    it.skip('should change the volume base cursor position', () => {  // hover in cypress
      cy.get('.volume')
        .click(150, 10)
      cy.get('.volume .volume__bar')
        .should( $div => {
          expect($div[0].style.width).to.eq('75%');
        })
    });

    it.skip('should constantly change the volume if mouse move', () => {
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
