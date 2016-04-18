import React from 'react';
import OneToDo from "../components/OneToDo";
var ScrollArea = require('react-scrollbar');
require('../style/Styles.css');


const ClaimedTL = React.createClass ({
  render: function() {
    // console.log(this.props.data);
    const singleToDo = this.props.data.map((todo,index) => {
      return (
        <div key={index} className="single-item-container">
          <OneToDo handleCheckBox={this.props.handleCheckBox} ToDoItem={todo} parentComponent="ClaimedTL"
          handleUnClaimButton={this.props.handleUnClaimButton} roommate={this.props.roommate}
            />
        </div>
      )
    });
    return (
      <div className="claimed-container">
        <div className="container-title">
          <h3>{this.props.roommate}</h3>
        </div>
        <div className="scrollable-margin">
          <ScrollArea style={{ maxHeight: 300 }} className="scrollbar-zindex">
            <div className="claimed-todos for-all-containers">
              {singleToDo}
            </div>
          </ScrollArea>
        </div>
      </div>
    )
  }
});

export default ClaimedTL;
