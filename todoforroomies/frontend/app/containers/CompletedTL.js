import React from 'react';
import OneToDo from "../components/OneToDo";

const CompletedTL = React.createClass ({
  render: function() {
    const singleToDo = this.props.data.map((todo,index) => {
      return(
        <div key={index}>
          <OneToDo handleCheckBox={this.props.handleCheckBox} ToDoItem={todo} parentComponent="CompletedTL" />
        </div>
      )
    })
    return (
      <div className="completed-container">
        <h3>Completed</h3>
        <div className="completed-todos">
          {singleToDo}
        </div>
      </div>
    )
  }
})

export default CompletedTL;
