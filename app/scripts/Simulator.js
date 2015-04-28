window.Game = (funtion() {
  var REGULATION_PERIOD_COUNT = 4
    , REGULATION_PERIOD_LENGTH = 12 * 60 * 1000
    , OT_PERIOD_LENGTH = 5 * 60 * 1000
    , AVG_TIME_UNTIL_FG = 2.5 * 60 * 1000
    , PERCENT_FGS_AS_3 = 20;

  var Game = function (model, options) {
    this.options = _.extend(options || {}, {
      speed: 1
    });

    if (typeof game === 'undefined') {
      throw new Error('Please provide a Game model.');
    }

    if (this.model.get('competitors[0].homeAway') === 'home') {
      this.homeTeamIndex = 0;
      this.awayTeamIndex = 1;
    } else {
      this.homeTeamIndex = 1;
      this.awayTeamIndex = 0;
    }

    this.startPeriod(1);
    this.startGameClock();
    this.startScoring('home');
    this.startScoring('away');
  }

  Game.prototype = {
    setClock: function (ms) {
      this.model.set('clock', moment(ms).format('hh:mm'));
    },

    startPeriod: function (period) {
      this.model.set('period', 1);
      this.setClock(
        period <= REGULATION_PERIOD_COUNT ?
          REGULATION_PERIOD_LENGTH : OT_PERIOD_LENGTH
      );
      this.model.set('status', 'in');
    },

    parseGameClock: function() {
      var clock = this.model.get('clock')
        , min = clock.substring(0, clock.indexOf(':'))
        , sec = clock.substring(clock.indexOf(':' + 1))
        , ms = (min * 60 * 1000) + (sec * 1000)

      return {
        min: min,
        sec: sec,
        ms: ms
      }
    },

    setGameComplete: function() {
      this.model.set('status', 'complete');
      clearTimeout(this.clockTimeout || null);
      clearTimeout(this.homeTeamScoringTimeout || null);
      clearTimeout(this.awayTeamScoringTimeout || null);

    },

    startGameClock: function() {
      var self,
        , period = this.model.get('period');

      this.clockTimeoutCreatedAt = new Date();
      this.clockTimeout = setTimeout(utility.getRandomArbitrary(10, 40) * 1000, function() {
        var timeElapsed = (new Date()) - self.clockTimeoutCreatedAt
          , newClock = self.parseGameClock().ms - (timeElapsed * self.speed);

        if (newClock <= 0) {
          if (period < REGULATION_PERIOD_COUNT ||
            self.model.get('competitors[0].score') ===
              self.model.get('competitors[1].score')) {
            self.startPeriod(period + 1);
          } else {
            // game over
            self.setGameComplete();
            return;
          }
        } else {
          self.setClock(newClock);
        }

        self.startGameClock();
    },

    startScoring: function(team) {
      var self = this;

      if (!(team === 'home' || team === 'away')) {
        throw new Error('team must be string value of "home" or "away"');
      }

      this[team + 'ScoringTimeout'] =
        setTimeout(utility.getRandomArbitrary(AVG_TIME_UNTIL_FG * .75, AVG_TIME_UNTIL_FG * 1.25), function() {
          var competitor = 'competitors[' +
                team === 'home' ? this.homeTeamIndex : this.awayTeamIndex + ']'
            , score = this.model.get(competitor + '.score');

          if (Math.random() < PERCENT_FGS_AS_3 / 100) {
            score += 3;
          } else {
            score += 2;
          }

          this.model.set(competitor + '.score', score);
          self.startScoring(team);
        });
    }
  }

  return Game;
})();

window.Simulator = function (games) {
  if (typeof games === 'undefined') {
    throw new Error('Please provide a Games collection.');
  }

  games.each(function (game, index) {
    if (index < (games.length / 2)) {
      new Game(game);
    } else {
      // set timeouts to start them later
    }
  });
}

Simulator.prototype = {

}
