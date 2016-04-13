import React from 'react';
import OneToDo from "../components/OneToDo"

const TodoList = React.createClass ({
  render: function() {
    const singleItem = this.props.data.map((todo,index) => {
      console.log(todo);
      return (
        <div key={index}>
          <OneToDo ToDoItem={todo}/>
        </div>
      )
    });
    return (
      <div>
        <h3>To Do List</h3>
        <div className="todo-container">
          {singleItem}
        </div>
      </div>
    )
  }
})

export default TodoList;
