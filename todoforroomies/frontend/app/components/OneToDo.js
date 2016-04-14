import React from 'react';
import TodoList from '../containers/TodoList';

// this.props.parentComponent

const OneToDo = React.createClass ({
  displayEditButton: function() {
    if (this.props.parentComponent == 'TodoList') {
      return <button onClick={this.props.handleEditButton} type="button"
      value={this.props.ToDoItem._id}
        >E</button>
    } else {
      return
    }
  },
  displayDeleteButton: function() {
    if (this.props.parentComponent == 'TodoList') {
      return <button onClick={this.props.handleDeleteButton} type="button"
      value={this.props.ToDoItem._id}
        >D</button>
    } else {
      return
    }
  },
  displayCheckBox: function() {
    if (this.props.parentComponent == 'CompletedTL' || this.props.parentComponent == 'ClaimedTL') {
      return <input className="todo-checkbox" onClick={this.props.handleCheckBox} type="checkbox"
      value={this.props.ToDoItem._id} />
    } else {
      return
    }
  },
  render: function() {
    return (
      <div className="singleItem">
        <div className="todos-flex-container">
          <div className="todos-left-container">
            {this.displayCheckBox()}
            <div className="points">{this.props.ToDoItem.pointsWorth}pts</div>
          </div>
          <div className="todos-right-container">
            <div className="headline">{this.props.ToDoItem.headline}</div>
            <div className="todo-details-container">
              <span className="author todo-details">Created by {this.props.ToDoItem.author}, </span>
              <span className="timeNeeded todo-details">{this.props.ToDoItem.timeNeeded} min, </span>
              <span className="deadline todo-details">Due: {this.props.ToDoItem.deadline}</span>
            </div>
          </div>
        </div>
        <div className="todo-buttons">
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
