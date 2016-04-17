import React from 'react';
import OneToDo from "../components/OneToDo";
import AddButton from "../fsc/AddButton";
// var ScrollArea = require('react-scrollbar');
require('../style/Styles.css');


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
            parentComponent="TodoList"
            currentUser={this.props.currentUser}
            partnerUser={this.props.partnerUser} 
            />
        </div>
      )
    });
    return (
      <div className="unclaimed-container">
        <div className="container-title">
          <h3>
            <AddButton
              showForm={this.props.showForm}
              handleAddButton={this.props.handleAddButton}
              displayAddForm={this.props.displayForm}
            />
            To Do List

          {this.props.displayAddForm()}
          </h3>
        </div>
        <div className="unclaimed-todos for-all-containers">
          {singleToDo}
        </div>
      </div>
    )
  }
});

export default TodoList;
