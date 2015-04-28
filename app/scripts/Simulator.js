window.Game = (function() {
  var REGULATION_PERIOD_COUNT = 4
    , REGULATION_PERIOD_LENGTH = 12 * 60 * 1000
    , OT_PERIOD_LENGTH = 5 * 60 * 1000
    , AVG_TIME_UNTIL_FG = 1 * 60 * 1000
    , PERCENT_FGS_AS_3 = 25;

  var Game = function (model, options) {
    if (typeof model === 'undefined') {
      throw new Error('Please provide a Game model.');
    }

    this.model = model;
    this.options = _.extend({
      speed: 1,
      start: true
    }, options || {});

    if (this.options.start) {
      this.start();
    }
  }

  Game.prototype = {
    start: function() {
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
    },

    setClock: function (ms) {
      this.model.set('clock', moment(ms).format('mm:ss'));
    },

    startPeriod: function (period) {
      this.model.set('period', period);
      this.setClock(
        period <= REGULATION_PERIOD_COUNT ?
          REGULATION_PERIOD_LENGTH : OT_PERIOD_LENGTH
      );
      this.model.set('status', 'in');
    },

    parseGameClock: function() {
      var clock = this.model.get('clock')
        , min = clock.substring(0, clock.indexOf(':'))
        , sec = clock.substring(clock.indexOf(':') + 1)
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
      clearTimeout(this.homeScoringTimeout || null);
      clearTimeout(this.awayScoringTimeout || null);

    },

    startGameClock: function() {
      var self = this
        , period = this.model.get('period');

      this.clockTimeoutCreatedAt = new Date();
      this.clockTimeout = setTimeout(function() {
        var timeElapsed = (new Date()) - self.clockTimeoutCreatedAt
          , newClock = self.parseGameClock().ms - (timeElapsed * self.options.speed)
          , competitor0score = self.model.get('competitors[0].score')
          , competitor1score = self.model.get('competitors[1].score');

        if (newClock <= 0) {
          if (period < REGULATION_PERIOD_COUNT ||
            competitor0score === competitor1score) {
            self.startPeriod(period + 1);
          } else {
            // game over
            if (competitor0score > competitor1score) {
              self.model.set('competitors[0].winner', true);
            } else {
              self.model.set('competitors[1].winner', true);
            }

            self.setGameComplete();

            return;
          }
        } else {
          self.setClock(newClock);
        }

        self.startGameClock();
      }, parseInt((utility.getRandomArbitrary(5, 20) / this.options.speed) * 1000));
    },

    startScoring: function(team) {
      var self = this;

      if (!(team === 'home' || team === 'away')) {
        throw new Error('team must be string value of "home" or "away"');
      }

      this[team + 'ScoringTimeout'] =
        setTimeout(function() {
          var competitor = 'competitors[' +
                (team === 'home' ? self.homeTeamIndex : self.awayTeamIndex) + ']'
            , score = self.model.get(competitor + '.score');

          if (Math.random() < PERCENT_FGS_AS_3 / 100) {
            score += 3;
          } else {
            score += 2;
          }

          self.model.set(competitor + '.score', score);
          self.startScoring(team);
        }, parseInt(utility.getRandomArbitrary(AVG_TIME_UNTIL_FG * .5, AVG_TIME_UNTIL_FG * 1.5) / this.options.speed));
    }
  }

  return Game;
})();

window.Simulator = function (collection, options) {
  var self = this;

  if (typeof collection === 'undefined') {
    throw new Error('Please provide a Games collection.');
  }

  this.options = _.extend({
    speed: 1
  }, options || {});

  collection.each(function (game, index) {
    new Game(game, { speed: self.options.speed });
  });
}

Simulator.prototype = {
}
