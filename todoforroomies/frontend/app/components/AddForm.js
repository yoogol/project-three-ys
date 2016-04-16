import React from 'react';
var Button = require('react-bootstrap').Button;
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
    }, this.calculatePoints)
  },
  handleDeadline: function(e){
    this.setState({
      deadline: e.target.value
    }, this.calculatePoints)

  },
  handleTimeNeeded: function(e){
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
    let daysLeft = Math.floor(((datePicked - todayDate)/86400)/100);
    console.log(daysLeft)
    console.log("time:",parseInt(this.state.timeNeeded),"yuck:",parseInt(this.state.yuckiness));
    let points = daysLeft * this.state.timeNeeded * this.state.yuckiness;
    console.log(points);
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
      roommate: 0,
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
              placeholder="do laundry, wash dishes etc."
              value={this.state.headline}
              onChange={this.handleHeadline}
              />
            <br /><br />

            <label className="add-form-label">Need to Be Completed By: </label>
            <br />

            <Datetime
              value={this.state.deadline}
              onChange={this.handleDeadline}
              isValidDate={ valid } />
            {/*<label className="add-form-label">Need to Be Completed By: </label>
            <br /><br />
            <input
              type='datetime-local'
              placeholder="pick a date"
              style={formTwoStyle}
              value={this.state.deadline}
              onChange={this.handleDeadline}
              />*/}
            <br /><br />

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
            <br /><br />
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
            <label className="add-form-label"><strong>{this.handlePointsWorth()}</strong></label>
            <br />
            <button onClick={this.props.closeBtn} className="button submit-button" type="submit">Submit</button>
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
