import React from 'react';
import TodoList from '../containers/TodoList';

// this.props.parentComponent

const OneToDo = React.createClass ({
  displayEditButton: function() {
    if (this.props.parentComponent == 'TodoList') {
      return <button onClick={this.props.handleEditButton} type="button"
      value={this.props.ToDoItem._id}
        >Edit</button>
    } else {
      return
    }
  },
  displayDeleteButton: function() {
    if (this.props.parentComponent == 'TodoList') {
      return <button onClick={this.props.handleDeleteButton} type="button"
      value={this.props.ToDoItem._id}
        >Delete</button>
    } else {
      return
    }
  },
  displayClaimButtonR1: function() {
    if (this.props.parentComponent == 'TodoList') {
      return <button onClick={this.props.handleClaimButtonR1} type="button"
      value={this.props.ToDoItem._id}
        >Claim R1</button>
    } else {
      return
    }
  },
  displayClaimButtonR2: function() {
    if (this.props.parentComponent == 'TodoList') {
      return <button onClick={this.props.handleClaimButtonR2} type="button"
      value={this.props.ToDoItem._id}
        >Claim R2</button>
    } else {
      return
    }
  },
  displayUnClaimButton: function() {
    if (this.props.parentComponent == 'ClaimedTL') {
      return <button onClick={this.props.handleUnClaimButton} type="button"
      value={this.props.ToDoItem._id}
        >Unclaim</button>
    } else {
      return
    }
  },
  displayCheckBoxIncomplete: function() {
    if (this.props.parentComponent == 'ClaimedTL') {
      return <input className="todo-checkbox" onClick={this.props.handleCheckBox} type="checkbox"
      value={this.props.ToDoItem._id}

      />
    } else {
      return
    }
  },
  displayCheckBoxComplete: function() {
    if (this.props.parentComponent == 'CompletedTL') {
      return <input className="todo-checkbox" onClick={this.props.handleUnCheckBox} type="checkbox"
      value={this.props.ToDoItem._id}
      defaultChecked="true"
      />
    } else {
      return
    }
  },
  render: function() {
    let deadlineFormated = this.props.ToDoItem.deadline;
    console.log(deadlineFormated);
    return (
      <div className="singleItem">
        <div className="todos-flex-container">
          <div className="todos-left-container">
            {this.displayCheckBoxIncomplete()}
            {this.displayCheckBoxComplete()}
            <div className="points">{this.props.ToDoItem.pointsWorth}pts</div>
          </div>
          <div className="todos-right-container">
            <div className="headline">{this.props.ToDoItem.headline}</div>
            <div className="todo-details-container">
              <span className="author todo-details">Created by {this.props.ToDoItem.author}, </span>
              <span className="timeNeeded todo-details">{this.props.ToDoItem.timeNeeded} min, </span>
              <span className="deadline todo-details">Due: {deadlineFormated[0]} at {deadlineFormated[1]}</span>
            </div>
          </div>
        </div>
        <div className="todo-buttons">
          {this.displayUnClaimButton()}
          {this.displayClaimButtonR1()}
          {this.displayClaimButtonR2()}
          {this.displayEditButton()}
          {this.displayDeleteButton()}
        </div>
      </div>
    )
  }
});

export default OneToDo;

//receiving this.props.ToDoItem from TotoList.js
// receive parentComponent props from parent component
// may need to convert time into different format
