import React from 'react';
var Button = require('react-bootstrap').Button;
require('../style/Styles.css');


const ScoreBoard = React.createClass ({
  componentWillMount: function() {
    this.props.updateAllScores()
  },
  render: function() {
    return (
      <div className="pop-up-content">
        <h3>ScoreBoard</h3>
        <div className="roommate-score-info">
          <p className="scoreboard-roommate">Roomie 1: {this.props.currentUser}</p>
          <div>This week's score: {this.props.currentUserThisWeek}</div>
        </div>
        <div className="roommate-score-info">
          <p className="scoreboard-roommate">Roomie 2: {this.props.partnerUser}</p>
          <div>This week's score: {this.props.partnerUserThisWeek}</div>
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
