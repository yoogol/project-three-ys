import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import OneToDo from "../components/OneToDo";

const ClaimedTL = React.createClass ({
  render: function() {
    // console.log(this.props.data);
    const singleToDo = this.props.data.map((todo,index) => {
      return (
        <div key={index}>
          <OneToDo handleCheckBox={this.props.handleCheckBox} ToDoItem={todo} parentComponent="ClaimedTL"/>
        </div>
      )
    });
    return (
      <Scrollbars style={{ width: 500, height: 300 }}>
        <div className="claimed-container">
          <div className="container-title">
            <h3>{this.props.roommate}</h3>
          </div>
          <div className="claimed-todos for-all-containers">
            {singleToDo}
          </div>
        </div>
      </Scrollbars>
    )
  }
});

export default ClaimedTL;
