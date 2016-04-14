import React from 'react';
require('../style/Styles.css');


const AddForm = React.createClass ({
  handleCreatedBy: function(e){
    this.props.createdBy(e);
  },
  handleTaskName: function(e){
    this.props.taskName(e)
  },
  handleTimeToComplete: function(e){
    this.props.timeToComplete(e)
  },
  handleDateDue: function(e){
    this.props.dateDue(e)
  },
  handlePoints: function(e){
    this.props.points(e)
  },

  render: function() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} style={formStyle}><br />

          <label className="label">Enter Your Task: </label>
          <input
            style={taskStyle}
            placeholder="laundry etc."
            value={this.props.taskName}
            onChange={this.handleTaskName}
            />
          <br /><br/>

          <label>Created By: </label>
          <input
            style={formStyle}
            type='text'
            placeholder='Your Name'
            value={this.props.createdBy}
            onChange={this.handleCreatedBy}
            />
          <br /><br />


          <label>Est. Time to Complete (mins): </label>
          <input
            style={formStyle}
            type='text'
            placeholder="Enter # of minutes"
            value={this.props.timeToComplete}
            onChange={this.handleTimeToComplete}
            />
          <br /><br />

          <label>Completion Deadline: </label>
          <input
            type='date'
            placeholder="pick a date"
            style={formStyle}
            value={this.props.dateDue}
            onChange={this.handleDateDue}
            />
          <br /><br />

          <label>Points: </label>
          <input
            type='number'
            style={pointStyle}
            value={this.props.points}
            onChange={this.handlePoints}
            />

          <br /><br />

          <label> Recurring: </label>
          <input
            type="checkbox"
            defaultChecked
            />
          <br /><br />

          <button className="button" onClick="">Submit</button>
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
