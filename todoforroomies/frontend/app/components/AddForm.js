import React from 'react';
var Button = require('react-bootstrap').Button;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
import AjaxHelpers from '../utils/AjaxHelpers';
require('../style/Styles.css');
var Datetime = require('react-datetime');
var Moment = require('moment');


// Let's use moment static reference in the Datetime component.
var yesterday = Datetime.moment().subtract(1,'day');
var valid = function( current ){
    return current.isAfter( yesterday );
};

const AddForm = React.createClass ({
  getInitialState: function() {
    return {
      headline: this.props.todoToEdit.headline || '',
      deadline: new Date(),
      timeNeeded: this.props.todoToEdit.timeNeeded || 1,
      yuckiness: this.props.todoToEdit.yuckiness || 1,
      pointsWorth: 0,
    }
  },

  handleHeadline: function(e){
    this.setState({
      headline: e.target.value,
    })
  },
  handleDeadline: function(momentDate){
    this.setState({
      deadline: momentDate.toDate()
    }, this.calculatePoints)
  },
  handleTimeNeeded: function(e,eventKey){
    console.log('handleTimeNeeded')
    this.setState({
      timeNeeded: e.target.value
    }, this.calculatePoints)
  },
  handleYuckiness: function(e) {
    this.setState({
      yuckiness: e.target.value
    }, this.calculatePoints)
  },

  handlePointsWorth: function(e){
    return (
      <p className="add-form-label">This task is worth {this.state.pointsWorth} points!</p>
    )
  },


  calculatePoints: function(){
    console.log('calculatePoints')
    console.log("calculation goes here");
    let datePicked = Date.parse(new Date(this.state.deadline));
    let todayDate = Date.parse(new Date());
    console.log(datePicked);
    console.log(todayDate);
    console.log(this.state.deadline)
    // let daysLeft = Math.floor((datePicked - todayDate)/86400);
    let daysLeft = (datePicked - todayDate)/1000;
    if (daysLeft < 86400) {
      var daysLeftScore = 4;
    } else if (daysLeft < 259200) {
      var daysLeftScore = 3;
    } else if (daysLeft < 604800) {
      var daysLeftScore = 2;
    } else if (daysLeft > 604800) {
      var daysLeftScore = 1
    };
    console.log("daysLeftScore", daysLeftScore);
    let timeNeeded = this.state.timeNeeded;
    if (timeNeeded < 15) {
      var timeNeededScore = 1
    } else if (timeNeeded < 30) {
      var timeNeededScore = 2;
    } else if (timeNeeded < 45) {
      var timeNeededScore = 3
    } else if (timeNeeded >= 45) {
      var timeNeededScore = 4
    };
    console.log("timeNeededScore", timeNeededScore);
    let yuckinessScore = parseInt(this.state.yuckiness);
    console.log("yuckinessScore", yuckinessScore);
    let points = (daysLeftScore + timeNeededScore) * yuckinessScore;
    console.log("points", points);
    this.setState({
      pointsWorth: points
    })
    console.log(points)
  },
  handleSubmit: function(e) {
    console.log("submit form button clicked")
    e.preventDefault();
    let newTask = {
      headline: this.state.headline,
      author: this.props.currentUser,
      lastChangedBy: this.props.currentUser,
      group: this.props.currentGroup,
      deadline: this.state.deadline,
      timeNeeded: this.state.timeNeeded,
      yuckiness: this.state.yuckiness,
      roommate: "0",
      claimedStatus: false,
      completedStatus: false,
      timeCompleted: '',
      timeCreated: new Date(),
      pointsWorth: this.state.pointsWorth,
    };
    console.log(newTask);
    if (!newTask.headline) {
      return
    } else if (this.props.typeOfFormActivated == "Add") {

      AjaxHelpers.addNewToDo(newTask).then(function(response) {
        console.log(response);
        this.props.loadAllTasks()
      }.bind(this))
    } else if (this.props.typeOfFormActivated == "Edit"){
      AjaxHelpers.editToDo(newTask, this.props.todoToEdit._id).then(function(response) {
        console.log(response);
        this.props.loadAllTasks()
      }.bind(this))
    }
  },
  handleTimeEventKey(e,eventKey){

  },
  render: function() {
    console.log('rendering....')
    return (
      <div className="pop-up-content">
        <div>
          <form onSubmit={this.handleSubmit} className="form">
            <label className="add-form-label">Task to Complete: </label>
            <br />
            <input
              type='text'
              placeholder="Do laundry, wash dishes, etc."
              value={this.state.headline}
              onChange={this.handleHeadline}
              />
            <br /><br />

            <label className="add-form-label">Needs to Be Completed By: </label>
            <br />

            <Datetime
              onChange={this.handleDeadline}
              isValidDate={ valid }
              onInputChange = {this.handleDeadline}

              />

            {/*<label className="add-form-label">Need to Be Completed By: </label>
            <br /><br />
            <input
              type='datetime-local'
              placeholder="pick a date"
              style={formTwoStyle}
              value={this.state.deadline}
              onChange={this.handleDeadline}
              />*/}
            <br />

            <label className="add-form-label">Est. Time to Complete (mins): </label>
            <br />
            {/*<input
              style={formStyle}
              type='number'
              placeholder="Enter # of minutes"
              value={this.state.timeNeeded}
              onChange={this.handleTimeNeeded}
              />*/}
            <select
              value={this.state.timeNeeded}
              onChange={this.handleTimeNeeded}>
              <option type="number" value="5">5</option>
              <option type="number" value="10">10</option>
              <option type="number" value="15">15</option>
              <option type="number" value="20">20</option>
              <option type="number" value="25">25</option>
              <option type="number" value="30">30</option>
              <option type="number" value="35">35</option>
              <option type="number" value="40">40</option>
              <option type="number" value="45">45</option>
              <option type="number" value="50">50</option>
              <option type="number" value="55">55</option>
              <option type="number" value="60">60</option>
            </select>
            <br /><br />
            <label className="add-form-label">How yucky is the task from 1 to 5: </label>
            <br />
            {/*<input
              style={formStyle}
              type='number'
              placeholder="0"
              value={this.state.yuckiness}
              onChange={this.handleYuckiness}
              />*/}
            <select
              value={this.state.yuckiness}
              onChange={this.handleYuckiness}>
              <option type="number" value="1">1 - Least</option>
              <option type="number" value="2">2 - I will do it!</option>
              <option type="number" value="3">3 - Neutral</option>
              <option type="number" value="4">4 - I don't want it!</option>
              <option type="number" value="5">5 - Most</option>
            </select>
            <br />
            <label className="add-form-label larger-font">{this.handlePointsWorth()}</label>
            <br />
            <Button onClick={this.props.closeBtn} className="button submit-button" type="submit">Submit</Button>
          </form>
        </div>
      </div>
    )
  }
})



// let formStyle = {
//   width: '50%',
// }
//
// let taskStyle = {
//   width: '60%',
//   height:'24'
// }
//
// let pointStyle = {
//   width: '8%',
//   height:'18'
// }


export default AddForm;
