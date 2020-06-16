/* eslint-disable @getify/proper-arrows/name */
/* eslint-disable @getify/proper-arrows/where */
/* eslint-disable @getify/proper-arrows/this */

describe('player', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  describe('without song', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.visit('/');
    });

    it('default title', () => {
      cy.get('.player__title').should('contain', 'No sound selected');
    });

    it('default duration', () => {
      cy.get('#player .player__duration').should('contain', '--:--:--');
    });

    it('buttons disabled', () => {
      cy.get('#player .player__play').should('be.disabled');
      cy.get('#player .player__fast_forward').should('be.disabled');
    });

    it('should be toggle playlist', () => {
      cy.get('#player .player__toggle_playlist').click();
      cy.get('.playlist').should('be.visible');
    });

    it('has progressbar', () => {
      cy.get('#player .progress .progress__bar');
    });
  });

  describe('with song', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.visit('/', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.localStorage.setItem(
            'tilosStoreSong',
            JSON.stringify({
              title: 'Jézus és a jelzőrakéta',
              url: '/jezusesajelzoraketa.mp3',
            })
          );
        },
      });
    });

    it('should be render', () => {
      cy.get('#player');
      cy.get('#player .player__play').should('be.not.disabled');
    });

    it('render song title', () => {
      cy.get('#player .player__title').should(
        'contain',
        'Jézus és a jelzőrakéta'
      );
    });

    it('render song duration', () => {
      cy.get('#player .player__duration').should('contain', '00:05:46');
    });

    it('render current time', () => {
      cy.get('#player .player__play').click();
      cy.get('#player .player__current').should('contain', '00:00:01');
    });

    it('play sound', () => {
      cy.get('#player .player__play').click();
      cy.get('#player .player__play').should('contain', 'Pause');
    });

    it('pause sound', () => {
      cy.get('#player .player__play').click().click();
      cy.get('#player .player__play').should('contain', 'Play');
    });

    it('should remove the last sound after end', () => {
      cy.visit('/', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.localStorage.setItem(
            'tilosStoreSong',
            JSON.stringify({
              title: 'Gongs',
              url: '/gongs.mp3',
            })
          );
        },
      });
      cy.get('#player .player__play').click();
      cy.get('#player .player__fast_forward').click();

      cy.get('.player__title').should('contain', 'No sound selected');
      cy.get('#player .player__duration').should('contain', '--:--:--');
    });

    it('should save current time to localstorage', () => {
      cy.get('#player .player__play').click();
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(250);
      cy.reload().should(() => {
        const savedData = JSON.parse(localStorage.getItem('tilosStoreSong'));
        expect(savedData.time).to.be.greaterThan(0.1);
      });
    });

    it('should not save empty data in localStorage', () => {
      cy.visit('/', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.localStorage.setItem(
            'tilosStoreSong',
            JSON.stringify({
              title: 'Gongs',
              url: '/gongs.mp3',
            })
          );
        },
      });

      cy.get('#player .player__play').click();
      cy.get('#player .player__fast_forward').click();
      cy.reload().should(() => {
        expect(localStorage.getItem('tilosStoreSong')).to.be.null;
      });
    });

    it('should set back to the current song', () => {
      cy.get('#player .player__play').click();
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(500);
      cy.get('#player .player__current').contains('00:00:01');
      cy.get('.progress__bar').should(($div) => {
        expect(Number.parseFloat($div[0].style.width)).to.be.greaterThan(0.1);
      });
    });

    it('progressbar display current position', () => {
      cy.get('#player .player__play').click();
      cy.get('#player .player__fast_forward').click();
      cy.get('#player .player__current').should('contain', '00:00:32');
      cy.get('.progress__bar').should(($div) => {
        expect(Number.parseFloat($div[0].style.width)).to.be.greaterThan(5);
      });
    });

    it('should seek backward 10s', () => {
      cy.get('#player .player__play').click();
      cy.get('#player .player__fast_forward').click();
      cy.get('#player .player__backward').click();
      cy.get('#player .player__current').should('contain', '00:00:22');
    });

    it('should change the track position base cursor position', () => {
      cy.get('#player .player__play').click();
      cy.get('.progress').click(500, 10);
      cy.get('.progress .progress__bar').should(($div) => {
        expect(Number.parseFloat($div[0].style.width)).to.greaterThan(50);
        expect(Number.parseFloat($div[0].style.width)).to.lessThan(90);
      });
    });

    it('should constantly change the track position if mouse move', () => {
      cy.get('#player .player__play').click();
      cy.get('.progress')
        .trigger('mousedown', 'center', 'center')
        .trigger('mousemove', 210, 10, { buttons: 1 });
      cy.get('.progress .progress__bar').should(($div) => {
        // expect(Number.parseFloat($div[0].style.width)).to.lessThan(25.5);
        expect(Number.parseFloat($div[0].style.width)).to.lessThan(45.5);
        // expect(Number.parseFloat($div[0].style.width)).to.greaterThan(24);
        expect(Number.parseFloat($div[0].style.width)).to.greaterThan(14);
      });
    });

    it('should not seeking if track not playing', () => {
      cy.get('.progress').click(150, 10);
      cy.get('#player .player__play').click();
      cy.get('.progress .progress__bar').should(($div) => {
        expect(Number.parseFloat($div[0].style.width)).to.lessThan(1);
      });
    });

    describe('volume', () => {
      beforeEach(() => {
        cy.get('.player__song_control').trigger('mouseenter');
      });

      afterEach(() => {
        cy.get('.volume__ghost').trigger('mouseleave');
      });

      it('render current volume', () => {
        // hover in cypress
        cy.get('.volume__bar').should(($div) => {
          expect($div[0].style.height).to.eq('50%');
        });
      });

      it('should change the volume base cursor position', () => {
        cy.get('.volume').click(10, 40);
        cy.get('.volume .volume__bar').should(($div) => {
          expect(Number.parseFloat($div[0].style.height)).to.greaterThan(75);
        });
      });

      it('should constantly change the volume if mouse move', () => {
        cy.get('.volume')
          .trigger('mousedown', 'center', 'center')
          .trigger('mousemove', 10, 40, { buttons: 1 });
        cy.get('.volume .volume__bar').should(($div) => {
          expect(Number.parseFloat($div[0].style.height)).to.greaterThan(75);
        });
      });
    });
  });

  describe('with playlist', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.visit('/', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.localStorage.clear();
          contentWindow.localStorage.setItem(
            'tilosStorePlaylist',
            JSON.stringify([
              {
                title: 'Gongs',
                url: '/gongs.mp3',
                duration: 22,
              },
              {
                title: 'Jézus és a jelzőrakéta',
                url: '/jezusesajelzoraketa.mp3',
                duration: 60 * 60 + 15 * 60 + 13,
              },
            ])
          );
        },
      });
    });

    it('play next sound continously', () => {
      cy.get('#player .player__play').click();
      cy.get('#player .player__fast_forward').click();

      cy.get('.player__title').contains('Jézus és a jelzőrakéta');
      cy.get('#player .player__play').should('contain', 'Pause');
      cy.get('#player .player__current').should('contain', '00:00:01');
    });
  });
});
