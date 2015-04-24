window.views = window.views || {};

views.Scoreboard = React.createClass({
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
        <views.Game data={game} />
      );
    });

    return (
      <div className="scoreboard">
        {games}
      </div>
    );
  }
});
