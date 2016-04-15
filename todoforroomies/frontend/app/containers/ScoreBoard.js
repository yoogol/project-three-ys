import React from 'react';

const ScoreBoard = React.createClass ({
  render: function() {
    return (
      <div>
        <h1>ScoreBoard</h1>
        <h3>Roommate 1: {this.props.roommate1name}</h3>
        <div>This week's score: {this.props.roommate1score}</div>
        <h3>Roommate 2: {this.props.roommate2name}</h3>
        <div>This week's score: {this.props.roommate2score}</div>
      </div>
    )
  }
})

export default ScoreBoard;
