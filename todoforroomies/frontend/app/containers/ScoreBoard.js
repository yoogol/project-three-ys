import React from 'react';
var Button = require('react-bootstrap').Button;
require('../style/Styles.css');


const ScoreBoard = React.createClass ({
  componentWillMount: function() {
    this.props.updateAllScores()
  },
  determineWinner: function() {
    if (this.props.currentUserLastWeek > this.props.partnerUserLastWeek) {
      return (
        <div>
        <div className="roommate-score-info">
          <p className="scoreboard-roommate"> Based on last week's score the winner is: {this.props.currentUser.toUpperCase()}</p>
          <div>who won with the score of: {this.props.currentUserLastWeek}</div>
        </div>
        <div className="roommate-score-info">
          <p className="scoreboard-roommate">Last weeks's loser: {this.props.partnerUser.toUpperCase()}</p>
          <div>lost with the score of: {this.props.partnerUserLastWeek}</div>
        </div>
        </div>
      )
    } else if (this.props.partnerUserLastWeek > this.props.currentUserLastWeek) {
      return (
        <div>
        <div className="roommate-score-info">
          <p className="scoreboard-roommate"> Based on last week's score the winner is: {this.props.partnerUser.toUpperCase()}</p>
          <div>who won with the score of: {this.props.partnerUserLastWeek}</div>
        </div>
        <div className="roommate-score-info">
          <p className="scoreboard-roommate">Last weeks's loser: {this.props.currentUser.toUpperCase()}</p>
          <div>lost with the score of: {this.props.currentUserLastWeek}</div>
        </div>
        </div>
      )
    } else {
      return (
        <div>
        <h3>it's a tie!</h3>
        <p>Based on last week's score both {this.props.currentUser.toUpperCase()} and {this.props.partnerUser.toUpperCase()} have gained {this.props.currentUserLastWeek} points</p>
        </div>
      )
    }
  },
  determineLeadThisWeek: function() {
    if (this.props.currentUserThisWeek > this.props.partnerUserThisWeek) {
      return (
        <div>
          <h3>{this.props.currentUser.toUpperCase()} is currently leading. <br></br>But {this.props.partnerUser.toUpperCase()} still has a chance!</h3>
        </div>
      )
    } else if (this.props.partnerUserLastWeek > this.props.currentUserLastWeek) {
      return (
        <div>
          <h3>{this.props.partnerUser} is currently leading. But {this.props.currentUser} still has a chance!</h3>
        </div>
      )
    } else {
      return (
        <div>
        <h3>It's a tie for now...</h3>
        </div>
      )
    }
  },
  render: function() {
    return (
      <div className="pop-up-content">
        <h3>ScoreBoard</h3>
        <h5>{this.determineLeadThisWeek()}</h5>
        <div className="roommate-score-info">
          <p className="scoreboard-roommate">Roomie 1: {this.props.currentUser}</p>
          <div>This week's score:  {this.props.currentUserThisWeek}</div>
        </div>
        <div className="roommate-score-info">
          <p className="scoreboard-roommate">Roomie 2: {this.props.partnerUser}</p>
          <div>This week's score: {this.props.partnerUserThisWeek}</div>
        </div>
        <br></br>
        <h3>And the winner is...</h3>
        {this.determineWinner()}
        <Button onClick={this.props.closeBtn}>Close</Button>
      </div>
    )
  }
})

export default ScoreBoard;
