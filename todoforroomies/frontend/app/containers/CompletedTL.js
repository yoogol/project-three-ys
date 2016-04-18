import React from 'react';
import OneToDo from "../components/OneToDo";
// var ScrollArea = require('react-scrollbar');
require('../style/Styles.css');


const CompletedTL = React.createClass ({
  render: function() {
    const singleToDo = this.props.data.map((todo,index) => {
      return(
        <div key={index} className="single-item-container">
          <OneToDo
          handleUnCheckBox={this.props.handleUnCheckBox}
          ToDoItem={todo} parentComponent="CompletedTL" />
        </div>
      )
    })
    return (
      <div className="completed-container">
        <div className="container-title">
          <h3>Completed</h3>
        </div>
        <div className="completed-todos for-all-containers">
          {singleToDo}
        </div>
      </div>
    )
  }
})

export default CompletedTL;
