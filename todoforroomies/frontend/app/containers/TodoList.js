import React from 'react';
import OneToDo from "../components/OneToDo"

const TodoList = React.createClass ({
  render: function() {
    const singleToDo = this.props.data.map((todo,index) => {
      return (
        <div key={index}>
          <OneToDo handleEditButton={this.props.handleEditButton} handleDeleteButton={this.props.handleDeleteButton} ToDoItem={todo} parentComponent="TodoList" />
        </div>
      )
    });
    return (
      <div className="unclaimed-container">
        <h3>To Do List</h3>
        <div className="unclaimed-todos">
          {singleToDo}
        </div>
      </div>
    )
  }
});

export default TodoList;
