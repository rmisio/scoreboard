var data = [
  {
    date: '2015-04-24T00:00:00Z',
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
    date: '2015-04-24T01:30:00Z',
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
  }
];

React.render(
  React.createElement(views.Scoreboard, { collection: new collections.Games(data) }),
  document.getElementById('main')
);
