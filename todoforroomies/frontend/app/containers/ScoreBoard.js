import React from 'react';
var Button = require('react-bootstrap').Button;
require('../style/Styles.css');


const ScoreBoard = React.createClass ({
  render: function() {
    return (
      <div className="pop-up-content">
        <h3>ScoreBoard</h3>
        <div className="score-info-container">

          <div className="roommate-score-info">
            <p className="scoreboard-roommate">Roommate 1: {this.props.roommate1name}</p>
            <div>This week's score: {this.props.roommate1score}</div>
          </div>
          <div className="roommate-score-info">
            <p className="scoreboard-roommate">Roommate 2: {this.props.roommate2name}</p>
            <div>This week's score: {this.props.roommate2score}</div>
          </div>

        </div>
        <Button onClick={this.props.closeBtn}>Close</Button>
      </div>
    )
  }
})

export default ScoreBoard;
