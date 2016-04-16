import React from 'react';
var Button = require('react-bootstrap').Button;
import TodoList from '../containers/TodoList';

// this.props.parentComponent

const OneToDo = React.createClass ({
  parentComponentStyle: function() {
    if (this.props.parentComponent == 'TodoList') {
      return "todos-flex-container todo-list-style";
    } else if (this.props.parentComponent == 'ClaimedTL') {
      return "todos-flex-container claimed-list-style";
    } else if (this.props.parentComponent == 'CompletedTL') {
      return "todos-flex-container completed-list-style";
    } else {
      return
    }
  },
  displayEditButton: function() {
    if (this.props.parentComponent == 'TodoList') {
      return <Button onClick={this.props.handleEditButton} type="button"
      value={this.props.ToDoItem._id}
        >Edit</Button>
    } else {
      return
    }
  },
  displayDeleteButton: function() {
    if (this.props.parentComponent == 'TodoList') {
      return <Button onClick={this.props.handleDeleteButton} type="button"
      value={this.props.ToDoItem._id}
        >Delete</Button>
    } else {
      return
    }
  },
  displayClaimDropdown: function(){
    if (this.props.parentComponent == "TodoList"){
      return(
        <select
          onChange={this.props.handleClaimMenu}
          id={this.props.ToDoItem._id}
        >
          <option value="">Who is going to do this?</option>
          <option value="1">Roomie 1</option>
          <option value="2">Roomie 2</option>
        </select>
      );
    } else {
      return
    };
  },

  // displayClaimButtonR1: function() {
  //   if (this.props.parentComponent == 'TodoList') {
  //     return <button onClick={this.props.handleClaimButtonR1} type="button"
  //     value={this.props.ToDoItem._id}
  //       >Claim R1</button>
  //   } else {
  //     return
  //   }
  // },
  // displayClaimButtonR2: function() {
  //   if (this.props.parentComponent == 'TodoList') {
  //     return <button onClick={this.props.handleClaimButtonR2} type="button"
  //     value={this.props.ToDoItem._id}
  //       >Claim R2</button>
  //   } else {
  //     return
  //   }
  // },
  displayUnClaimButton: function() {
    if (this.props.parentComponent == 'ClaimedTL') {
      return <Button onClick={this.props.handleUnClaimButton} type="button"
      value={this.props.ToDoItem._id}
      className="unclaim-button"
        >Unclaim</Button>
    } else {
      return
    }
  },
  displayCheckBoxIncomplete: function() {
    if (this.props.parentComponent == 'ClaimedTL') {
      return <input className="todo-checkbox" onClick={this.props.handleCheckBox} type="checkbox"
      value={this.props.ToDoItem._id}

      />
    } else {
      return
    }
  },
  displayCheckBoxComplete: function() {
    if (this.props.parentComponent == 'CompletedTL') {
      return <input className="todo-checkbox" onClick={this.props.handleUnCheckBox} type="checkbox"
      value={this.props.ToDoItem._id}
      defaultChecked="true"
      />
    } else {
      return
    }
  },


  render: function() {
    let deadlineFormated = this.props.ToDoItem.deadline;
    return (
      <div className="single-item">
        <div className={this.parentComponentStyle()}>
          <div className="todos-left-container">
            {this.displayCheckBoxIncomplete()}
            {this.displayCheckBoxComplete()}
            <div className="points">{this.props.ToDoItem.pointsWorth}pts</div>
          </div>
          <div className="todos-right-container">
            <div className="headline" >{this.props.ToDoItem.headline}</div>
            <div className="todo-details-container">
              <span className="author todo-details">Created by {this.props.ToDoItem.author}, </span>
              <span className="timeNeeded todo-details">{this.props.ToDoItem.timeNeeded} min, </span>
              <span className="deadline todo-details">Due: {deadlineFormated[0]} at {deadlineFormated[1]}</span>
            </div>
          </div>
        </div>
        <div className="todo-buttons">
          {this.displayClaimDropdown()}
          {this.displayUnClaimButton()}
          {this.displayEditButton()}
          {this.displayDeleteButton()}
        </div>
      </div>
    )
  }
});

export default OneToDo;

//receiving this.props.ToDoItem from TotoList.js
// receive parentComponent props from parent component
// may need to convert time into different format
