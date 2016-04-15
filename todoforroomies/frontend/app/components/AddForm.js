import React from 'react';
import AjaxHelpers from '../utils/AjaxHelpers';
require('../style/Styles.css');

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
  handleDeadline: function(e){
    this.setState({
      deadline: e.target.value
    })
    this.calculatePoints()
  },
  handleTimeNeeded: function(e){
    this.setState({
      timeNeeded: e.target.value
    })
    this.calculatePoints()
  },
  handleYuckiness: function(e) {
    this.setState({
      yuckiness: e.target.value
    })
    this.calculatePoints()
    console.log(e.target.value);
  },

  handlePointsWorth: function(e){
    return (
      <p className="label">This task is worth {this.state.pointsWorth} points!</p>
    )
  },
  calculatePoints: function(){
    console.log("calculation goes here");
    let datePicked = Date.parse(new Date(this.state.deadline));
    let todayDate = Date.parse(new Date());
    console.log(datePicked);
    console.log(todayDate);
    console.log(this.state.deadline)
    // let daysLeft = Math.floor((datePicked - todayDate)/86400);
    let daysLeft = Math.floor((datePicked - todayDate)/86400);
    console.log(daysLeft)
    console.log("time:",parseInt(this.state.timeNeeded),"yuck:",parseInt(this.state.yuckiness));
    let points = this.state.timeNeeded * this.state.yuckiness;
    console.log(points);
    this.setState({
      pointsWorth: points
    })
  },
  handleSubmit: function(e) {
    console.log("submit form button clicked")
    e.preventDefault();
    let newTask = {
      headline: this.state.headline,
      author: this.state.author,
      deadline: this.state.deadline,
      timeNeeded: this.state.timeNeeded,
      yuckiness: this.state.yuckiness,
      roommate: 0,
      claimedStatus: false,
      completedStatus: false,
      timeCompleted: '',
      timeCreated: new Date(),
      pointsWorth: this.state.pointsWorth
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
      }.bind(this))
    }
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} style={formStyle} className="form"><br />
          <label className="label">Task to Complete: </label>
          <br /><br />
          <input
            style={taskStyle}
            type='text'
            placeholder="do laundry, wash dishes etc."
            value={this.state.headline}
            onChange={this.handleHeadline}
            />
          <br /><br/>

          <label className="label">Need to Be Completed By: </label>
          <br /><br />
          <input
            type='datetime-local'
            placeholder="pick a date"
            style={formStyle}
            value={this.state.deadline}
            onChange={this.handleDeadline}
            />
          <br /><br />

          <label className="label">Est. Time to Complete (mins): </label>
          <br /><br />
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
          <label className="label">How yucky is the task from 1 to 5: </label>
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
            <option type="number" value="1">1</option>
            <option type="number" value="2">2</option>
            <option type="number" value="3">3</option>
            <option type="number" value="4">4</option>
            <option type="number" value="5">5</option>
          </select>
          <label className="label"><strong>{this.handlePointsWorth()}</strong></label>
          <br />
          <button className="button submit-button" type="submit">Submit</button>
        </form>
      </div>
    )
  }
})


let formStyle = {
  width: '50%',
}

let taskStyle = {
  width: '60%',
  height:'24'
}

let pointStyle = {
  width: '8%',
  height:'18'
}


export default AddForm;
