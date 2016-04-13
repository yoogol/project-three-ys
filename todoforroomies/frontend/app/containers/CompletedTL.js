import React from 'react';
import OneToDo from "../components/OneToDo";

const CompletedTL = React.createClass ({
  render: function() {
    const singleToDo = this.props.data.map((todo,index) => {
      console.log("todo",todo);
      return(
        <div key={index}>
          <OneToDo ToDoItem={todo} parentComponent="CompletedTL" />
        </div>
      )
    })
    return (
      <div>
        <h3>Completed</h3>
        <div className="completed-todos">
          {singleToDo}
        </div>
      </div>
    )
  }
})

export default CompletedTL;
