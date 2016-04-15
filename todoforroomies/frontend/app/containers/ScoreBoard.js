import React from 'react';

const ScoreBoard = React.createClass ({
  render: function() {
    return (
      <div>
        <h1>ScoreBoard</h1>
        <h3>Roommate 1: {this.props.roommate1.name}</h3>
        <div>This week's score: {this.props.roommate1.score}</div>
        <h3>Roommate 2: {this.props.roommate2.name}</h3>
        <div>This week's score: {this.props.roommate2.score}</div>
        <button onClick={this.props.closeBtn}>Close</button>
      </div>
    )
  }
})

export default ScoreBoard;
