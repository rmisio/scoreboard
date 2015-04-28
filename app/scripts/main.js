var data = [
    {
      date: (new Date()).toISOString(),
      period: 0,
      clock: '00:00',
      status: 'pre',
      competitors: [
        {
          homeAway: 'home',
          abbreviation: 'MIL',
          record: '41-41',
          score: 0,
          winner: false,
          logo: 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/mil.png'
        },
        {
          homeAway: 'away',
          abbreviation: 'CHI',
          record: '50-32',
          score: 0,
          winner: false,
          logo: 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/chi.png'
        }
      ]
    },
    {
      date: (new Date()).toISOString(),
      period: 0,
      clock: '00:00',
      status: 'pre',
      competitors: [
        {
          homeAway: 'home',
          abbreviation: 'NO',
          record: '45-37',
          score: 0,
          winner: false,
          logo: 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/no.png'
        },
        {
          homeAway: 'away',
          abbreviation: 'GS',
          record: '67-15',
          score: 0,
          winner: false,
          logo: 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/gs.png'
        }
      ]
    },
    {
      // date: '2015-04-24T01:30:00Z',
      date: (new Date()).toISOString(),
      period: 0,
      clock: '00:00',
      status: 'pre',
      competitors: [
        {
          homeAway: 'home',
          abbreviation: 'SA',
          record: '55-27',
          score: 0,
          winner: false,
          logo: 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/sa.png'
        },
        {
          homeAway: 'away',
          abbreviation: 'LAC',
          record: '61-21',
          score: 0,
          winner: false,
          logo: 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/lac.png'
        }
      ]
    }
  ],
  games = new collections.Games(data);

React.render(
  React.createElement(views.Scoreboard, { collection: games }),
  document.getElementById('main')
);

new Simulator(games, { speed: 80 });
