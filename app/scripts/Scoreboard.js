window.views = window.views || {};

views.Scoreboard = React.createClass({displayName: "Scoreboard",
  getInitialState: function() {
    var view = this
      , games = this.props.collection;

    // TEMP - TEMP - TEMP
    window.games = games;

    games.on('change', function() {
      view.setState({ games: games.toJSON() });
    });

    return { games: games.toJSON() };
  },

  render: function() {
    var games = this.state.games.map(function (game) {
      return (
        React.createElement(views.Game, {data: game})
      );
    });

    return (
      React.createElement("div", {className: "scoreboard"}, 
        games
      )
    );
  }
});
