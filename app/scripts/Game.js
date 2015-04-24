window.views = window.views || {};

views.Game = React.createClass({displayName: "Game",
  render: function() {
    var data = this.props.data,
        homeTeam,
        awayTeam,
        status
        periodSuffix = '';

    data.competitors.forEach(function (team) {
      if (team.homeAway === 'home') {
        homeTeam = team;
      } else {
        awayTeam = team;
      }
    });

    if (!homeTeam) {
      throw new Error('Unable to determine home team.');
    }

    if (!awayTeam) {
      throw new Error('Unable to determine away team.');
    }

    if (data.status === 'pre') {
      status = moment(data.date).format('h:mm A');
      homeScoreRecord = homeTeam.record;
      awayScoreRecord = awayTeam.record;
    } else if (data.status === 'in') {
      // todo: adding the suffix to a numeral would be a
      // good global utlity method
      switch (data.period) {
        case 1:
          periodSuffix = 'st'
          break;
        case 2:
          periodSuffix = 'nd'
          break;
        case 3:
          periodSuffix = 'rd'
          break;
        case 4:
          periodSuffix = 'th'
          break;
      }

      status = data.clock + ' - ' +
        (
          data.period < 5 ? data.period + periodSuffix :
            (data.period === 5 ? 'OT' : (data.period - 4) + 'OT')
        );
    } else if (data.status === 'complete') {
      status = 'FINAL' +
        (
          data.period > 4 ?
            (data.period === 5 ? '/OT' :
              '/' + (data.period - 4) + 'OT') : ''
        )
    }

    return (
      React.createElement("div", {className: "game"}, 
        React.createElement("div", {className: "status"}, status), 
        React.createElement("div", {className: "teams"}, 
          React.createElement("div", {className: awayTeam.winner ? 'winner' : ''}, 
            React.createElement("div", {className: "team-inner"}, 
              React.createElement("img", {src: awayTeam.logo + '&w=16&h=16'}), 
              React.createElement("span", {className: "team-name"}, awayTeam.abbreviation), 
              React.createElement("span", {className: "score record"}, 
                 data.status === 'pre' ? awayTeam.record : awayTeam.score
              )
            )
          ), 
          React.createElement("div", {className: homeTeam.winner ? 'winner' : ''}, 
            React.createElement("div", {className: "team-inner"}, 
              React.createElement("img", {src: homeTeam.logo + '&w=16&h=16'}), 
              React.createElement("span", {className: "team-name"}, homeTeam.abbreviation), 
              React.createElement("span", {className: "score record"}, 
                 data.status === 'pre' ? homeTeam.record : homeTeam.score
              )
            )
          )
        )
      )
    );
  }
});
