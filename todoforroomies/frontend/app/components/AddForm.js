import React from 'react';
import AjaxHelpers from '../utils/AjaxHelpers';

const AddForm = React.createClass ({
  getInitialState: function() {
    return {
      headline: '',
      deadline: '',
      timeNeeded: 0,
      yuckiness: 0,
      pointsWorth: this.calculatePoints(),
      _id: ''
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
      <p>This task is worth {this.state.pointsWorth} points!</p>
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
        this.setState ({
          headline: '',
          deadline: '',
          timeNeeded:0 ,
          yuckiness: 0,
          pointsWorth: this.calculatePoints()
        })
      }.bind(this))
    } else if (this.props.typeOfFormActivated == "Edit"){
      AjaxHelpers.editToDo(newTask, this.state._id).then(function(response) {
        console.log(response);
        this.setState ({
          headline: '',
          deadline: '',
          timeNeeded: 0,
          yuckiness: 0,
          pointsWorth: this.calculatePoints(),
          _id: ''
        });
      }.bind(this))
    }
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} style={formStyle}><br />

          <label>Enter Your Task: </label>
          <input
            style={taskStyle}
            type='text'
            placeholder="laundry etc."
            value={this.state.headline}
            onChange={this.handleHeadline}
            />
          <br /><br/>

          <label>Completion Deadline: </label>
          <input
            type='date'
            placeholder="pick a date"
            style={formStyle}
            value={this.state.deadline}
            onChange={this.handleDeadline}
            />
          <br /><br />

          <label>Est. Time to Complete (mins): </label>
          <input
            style={formStyle}
            type='number'
            placeholder="Enter # of minutes"
            value={this.state.timeNeeded}
            onChange={this.handleTimeNeeded}
            />
          <br /><br />
          <label>How yucky is the task from 1 to 10: </label>
          <input
            style={formStyle}
            type='number'
            placeholder="0"
            value={this.state.yuckiness}
            onChange={this.handleYuckiness}
            />
          <br /><br />
          {this.handlePointsWorth()}
          <br /><br />

          <button type="submit">Submit</button>
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
