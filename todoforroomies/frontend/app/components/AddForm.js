import React from 'react';
import AjaxHelpers from '../utils/AjaxHelpers';
require('../style/Styles.css');

const AddForm = React.createClass ({
  getInitialState: function() {
    // console.log(new Date(this.props.todoToEdit.deadline).getDate());
    // let deadlineYear = new Date(this.props.todoToEdit.deadline).getFullYear();
    // let deadlineMonth = function() {
    //   if (Date(this.props.todoToEdit.deadline).getMonth().length == 1) {
    //     return "0" + Date(this.props.todoToEdit.deadline).getMonth()
    //   } else {
    //     return Date(this.props.todoToEdit.deadline).getMonth()
    //   }
    // };
    // let deadlineDay = function() {
    //   if (Date(this.props.todoToEdit.deadline).getDate().length == 1) {
    //     return "0" + Date(this.props.todoToEdit.deadline).getDate()
    //   } else {
    //     return Date(this.props.todoToEdit.deadline).getDate()
    //   }
    // };
    // let deadline = deadlineYear + "-" + deadlineMonth() + "-" + deadlineDay();
    return {
      headline: this.props.todoToEdit.headline || '',
      deadline: new Date(this.props.todoToEdit.deadline) || new Date(),
      timeNeeded: this.props.todoToEdit.timeNeeded || 0,
      yuckiness: this.props.todoToEdit.yuckiness || 0,
      pointsWorth: this.calculatePoints(),
    }
  },
  handleHeadline: function(e){
    this.setState({
      headline: e.target.value
    })
  },
  handleDeadline: function(e){
    this.setState({
      deadline: e.target.value
    })
  },
  handleTimeNeeded: function(e){
    this.setState({
      timeNeeded: e.target.value
    })
  },
  handleYuckiness: function(e) {
    this.setState({
      yuckiness: e.target.value
    })
  },
  handlePointsWorth: function(e){
    return (
      <p className="label">This task is worth {this.state.pointsWorth} points!</p>
    )
  },
  calculatePoints: function(){
    console.log("calculation goes here");
    return 100
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
      roommate: this.props.userName,
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
          <input
            style={taskStyle}
            type='text'
            placeholder="do laundry, wash dishes etc."
            value={this.state.headline}
            onChange={this.handleHeadline}
            />
          <br /><br/>

          <label className="label">Need to Be Completed By: </label>
          <input
            type='date'
            placeholder="pick a date"
            style={formStyle}
            value={this.state.deadline}
            onChange={this.handleDeadline}
            />
          <br /><br />

          <label className="label">Est. Time to Complete (mins): </label>
          <input
            style={formStyle}
            type='number'
            placeholder="Enter # of minutes"
            value={this.state.timeNeeded}
            onChange={this.handleTimeNeeded}
            />
          <br /><br />
          <label className="label">How yucky is the task from 1 to 10: </label>
          <input
            style={formStyle}
            type='number'
            placeholder="0"
            value={this.state.yuckiness}
            onChange={this.handleYuckiness}
            />

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
  height:'16'
}

let pointStyle = {
  width: '8%',
  height:'18'
}


export default AddForm;
