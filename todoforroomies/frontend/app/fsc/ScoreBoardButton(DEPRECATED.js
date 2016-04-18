import React from 'react';
require('../style/Styles.css');

const ScoreBoardButton = React.createClass ({
  render: function() {
    return (
      <div>
        <button className="scoreboard-button" onClick={this.props.handleScoreBoardButton}>See ScoreBoard</button>
      </div>
    )
  }
})

export default ScoreBoardButton;
