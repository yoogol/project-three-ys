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
            <p className="scoreboard-roommate"> Based on last week's score, the winner was: {this.props.currentUser.toUpperCase()}
            with the score of: {this.props.currentUserLastWeek}</p>
            <p>Last weeks's loser: {this.props.partnerUser.toUpperCase()}
            with the score of: {this.props.partnerUserLastWeek}</p>
          </div>
        </div>
      )
    } else if (this.props.partnerUserLastWeek > this.props.currentUserLastWeek) {
      return (
        <div>
          <div className="roommate-score-info">
            <p className="scoreboard-roommate"> Based on last week's score, the winner was: {this.props.partnerUser.toUpperCase()}
            with the score of: {this.props.partnerUserLastWeek}
            </p>
            <p>Last weeks's loser: {this.props.currentUser.toUpperCase()}
            with the score of: {this.props.currentUserLastWeek}
            </p>
          </div>
        </div>
      )
    } else {
      return (
        <div>
        <p className="scoreboard-roommate">it's a tie!</p>
        <p className="last-week-results">Based on last week's score, both {this.props.currentUser.toUpperCase()} and {this.props.partnerUser.toUpperCase()} have earned {this.props.currentUserLastWeek} points</p>
        </div>
      )
    }
  },
  determineLeadThisWeek: function() {
    if (this.props.currentUserThisWeek > this.props.partnerUserThisWeek) {
      return (
        <div className="this-weeks-leader">
          <h3>{this.props.currentUser.toUpperCase()} is currently leading.</h3>
          <h4>But {this.props.partnerUser.toUpperCase()} still has a chance!</h4>
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
        <div className="score-info-container">
          <div className="roommate-score-info">
            <p className="scoreboard-roommate">Roomie 1: <br />
            <span className="capitalize">{this.props.currentUser}</span></p>
            <div>This week's score:  {this.props.currentUserThisWeek}</div>
          </div>
          <div className="roommate-score-info">
            <p className="scoreboard-roommate">Roomie 2: <br />
            <span className="capitalize">{this.props.partnerUser}</span></p>
            <div>This week's score: {this.props.partnerUserThisWeek}</div>
          </div>
        </div>
        <br></br>
        <h3>And the winner is...</h3>
        {this.determineWinner()}
        <div className="punishment">
          <hr className="small-hr"></hr>
          <p className="scoreboard-roommate">This week's punishment is:</p>
          <p>Walking into a McDonalds and singing the national anthem at the top of your voice</p>
        </div>

        <Button onClick={this.props.closeBtn} className="close-button">Close</Button>
      </div>
    )
  }
})

export default ScoreBoard;
