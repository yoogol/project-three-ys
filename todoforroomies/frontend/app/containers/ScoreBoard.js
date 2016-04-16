import React from 'react';
var Button = require('react-bootstrap').Button;

const ScoreBoard = React.createClass ({
  componentWillMount: function() {
    this.props.retrieveThisWeekScore();
    console.log("componentWillMount")
  },
  render: function() {
    return (
      <div className="pop-up-content">
        <h3>ScoreBoard</h3>
        <div className="roommate-score-info">
          <p className="scoreboard-roommate">Roomie 1: {this.props.roommate1name}</p>
          <div>This week's score: {this.props.roommate1scoreThisWeek}</div>
        </div>
        <div className="roommate-score-info">
          <p className="scoreboard-roommate">Roomie 2: {this.props.roommate2name}</p>
          <div>This week's score: {this.props.roommate2scoreThisWeek}</div>
        </div>
        <div className="roommate-score-info">
          <p className="scoreboard-roommate">Last weeks's winner: PLACEHOLDER</p>
          <div>won with the score of: PLACEHOLDER</div>
        </div>
        <div className="roommate-score-info">
          <p className="scoreboard-roommate">Last weeks's loser: PLACEHOLDER</p>
          <div>won with the score of: PLACEHOLDER</div>
        </div>
        <Button onClick={this.props.closeBtn}>Close</Button>
      </div>
    )
  }
})

export default ScoreBoard;
