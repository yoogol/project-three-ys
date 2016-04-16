import React from 'react';
import OneToDo from "../components/OneToDo";
require('../style/Styles.css');


const ClaimedTL = React.createClass ({
  render: function() {
    // console.log(this.props.data);
    const singleToDo = this.props.data.map((todo,index) => {
      return (
        <div key={index} className="single-item-container">
          <OneToDo handleCheckBox={this.props.handleCheckBox} ToDoItem={todo} parentComponent="ClaimedTL"
          handleUnClaimButton={this.props.handleUnClaimButton}
            />
        </div>
      )
    });
    return (
      <div className="claimed-container">
        <div className="container-title">
          <h3>{this.props.roommate}</h3>
        </div>
          <div className="claimed-todos for-all-containers">
            {singleToDo}
          </div>
      </div>
    )
  }
});

export default ClaimedTL;
