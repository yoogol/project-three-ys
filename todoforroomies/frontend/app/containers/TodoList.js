import React from 'react';
import OneToDo from "../components/OneToDo"

const TodoList = React.createClass ({
  render: function() {
    const singleToDo = this.props.data.map((todo,index) => {
      return (
        <div key={index} className="single-item-container">
          <OneToDo
            handleEditButton={this.props.handleEditButton}
            handleDeleteButton={this.props.handleDeleteButton}
            ToDoItem={todo}
            handleClaimButtonR1={this.props.handleClaimButtonR1}
            handleClaimButtonR2={this.props.handleClaimButtonR2}
            handleClaimMenu={this.props.handleClaimMenu}
            handleClickOnClaimMenu={this.props.handleClickOnClaimMenu}
            parentComponent="TodoList" />
        </div>
      )
    });
    return (
      <div className="unclaimed-container">
        <div className="container-title">
          <h3>to do list</h3>
        </div>
        <div className="unclaimed-todos for-all-containers">
          {singleToDo}
        </div>
      </div>
    )
  }
});

export default TodoList;
