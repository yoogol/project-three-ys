import React from 'react';

const ScoreBoard = React.createClass ({
  render: function() {
    return (
      <div>
        <h1>ScoreBoard</h1>
        <h3>Roomie #1: {this.props.roommate1name}</h3>
        <div>This week's score thus far: {this.props.roommate1score}</div>
        <h3>Roomie #2: {this.props.roommate2name}</h3>
        <div>This week's score thus far: {this.props.roommate2score}</div>
        <h2>Days left until the end of the week:</h2>
        <button onClick={this.props.closeBtn}>Close</button>
      </div>
    )
  }
})

export default ScoreBoard;
