import React from 'react';
import OneToDo from "../components/OneToDo";

const ClaimedTL = React.createClass ({
  render: function() {
    const singleToDo = this.props.data.map((todo,index) => {

      return (
        <div key={index}>
          <OneToDo handleCheckBox={this.props.handleCheckBox} ToDoItem={todo} parentComponent="ClaimedTL"/>
        </div>
      )
    });
    return (
      <div>
        <h3>{this.props.roommate}</h3>
        <div className="claimed-todos">
          {singleToDo}
        </div>
      </div>
    )
  }
});

export default ClaimedTL;
