import React from 'react';
import TodoList from '../containers/TodoList';

// this.props.parentComponent

const OneToDo = React.createClass ({
  displayEditButton: function() {
    console.log(this.props.handleEditButton);
    if (this.props.parentComponent == 'TodoList') {
      return <button onClick={this.props.handleEditButton} type="button">E</button>
    } else {
      return
    }
  },
  displyDeleteButton: function() {
    if (this.props.parentComponent == 'TodoList') {
      return <button onClick={this.props.handleDeleteButton} type="button">D</button>
    } else {
      return
    }
  },
  displayCheckBox: function() {
    if (this.props.parentComponent == 'CompletedTL' || this.props.parentComponent == 'ClaimedTL') {
      return <button onClick={this.props.handleCheckBox} type="checkbox"></button>
    } else {
      return
    }
  },
  render: function() {
    return (
      <div>
        {this.displayCheckBox()}
        <div className="headline">{this.props.ToDoItem.headline}</div>
        <div className="author">Created by {this.props.ToDoItem.author}</div>
        <div className="timeNeeded">{this.props.ToDoItem.timeNeeded} min</div>
        <div className="deadline">Due: {this.props.ToDoItem.deadline}</div>
        {this.displayEditButton()}
        {this.displyDeleteButton()}
      </div>
    )
  }
});

export default OneToDo;

//receiving this.props.ToDoItem from TotoList.js
// receive parentComponent props from parent component
// may need to convert time into different format
