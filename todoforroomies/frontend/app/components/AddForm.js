import React from 'react';

const AddForm = React.createClass ({
  handleClick: function(e) {
    this.props.clickInput(e);
  },
  handleTask: function(e) {
    this.props.taskInput(e)
  },

  render: function() {
    return (
      <div>
        <p>Add Form</p>
        <label>Created By: </label>
        <input onChange={this.handleClick} />
        <br /><br />

        <label>Task Name: </label>
        <input onChange={this.handleClick} />
        <br /><br/>

        <label>Est. Time to Complete: </label>
        <input onChange={this.handleTask}/>
        <br /><br />

        <label>Complete By: </label>
        <input onChange={this.handleTask}/>
        <br /><br />

        <label>Points: </label>
        <input onChange={this.handleTask}/>
        <br /><br />

        <label> Recurring: </label> <button type="checkbox"></button>
        <br /><br />

        <button onClick="">Submit</button>

      </div>
    )
  }
})

export default AddForm;
