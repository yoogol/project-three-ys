import React from 'react';
import TodoList from '../containers/TodoList';

const OneToDo = React.createClass ({
  render: function() {
    return (
      <div>
        <div className="headline">{this.props.ToDoItem.headline}</div>
        <div className="author">Created by {this.props.ToDoItem.author}</div>
        <div className="timeNeeded">{this.props.ToDoItem.timeNeeded} min</div>
        <div className="deadline">Due: {this.props.ToDoItem.deadline}</div>
      </div>
    )
  }
});

export default OneToDo;

//receiving this.props.ToDoItem from TotoList.js
// may need to convert time into different format
