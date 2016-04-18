import React from 'react';
var Button = require('react-bootstrap').Button;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
import TodoList from '../containers/TodoList';
require('../style/Styles.css');
var Datetime = require('react-datetime');
var Moment = require('moment');

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
        <DropdownButton
          title="Who is going to do this?"
          onSelect={this.props.handleClaimMenu}
          id={this.props.ToDoItem._id}
        >
          <MenuItem id={this.props.ToDoItem._id} eventKey={["1",this.props.ToDoItem._id]}><span className="capitalize">{this.props.currentUser}</span></MenuItem>
          <MenuItem id={this.props.ToDoItem._id} eventKey={["2",this.props.ToDoItem._id]}><span className="capitalize">{this.props.partnerUser}</span></MenuItem>
        </DropdownButton>
      );
    } else {
      return
    };
  },
  displayUnClaimButton: function() {
    if (this.props.parentComponent == 'ClaimedTL') {
      return (
        <div className="unclaim-button-div">
          <Button onClick={this.props.handleUnClaimButton} type="button"
          value={this.props.ToDoItem._id}
          className="unclaim-button"
            >Unclaim</Button>
        </div>
      )
    } else {
      return
    }
  },
  displayCheckBoxIncomplete: function() {
    if (this.props.parentComponent == 'ClaimedTL') {
      return <input className="todo-checkbox" onClick={this.props.handleCheckBox} type="checkbox"
      value={this.props.ToDoItem._id} id={this.props.roommate}

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
    let deadlineFormated = Moment(this.props.ToDoItem.deadline).format('llll');
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
              <span className="author todo-details">Created by <span className="capitalize">{this.props.ToDoItem.author}</span>, </span>
              <span className="timeNeeded todo-details">Length: {this.props.ToDoItem.timeNeeded} min, </span>
              <span className="deadline todo-details">Due: {deadlineFormated}</span>
            </div>
          </div>
        </div>
        <div className="todo-buttons">
          {this.displayClaimDropdown()}
          {this.displayUnClaimButton()}
          <div className="edit-delete-btns">
            {this.displayEditButton()}
            {this.displayDeleteButton()}
          </div>
        </div>
      </div>
    )
  }
});

export default OneToDo;

//receiving this.props.ToDoItem from TotoList.js
// receive parentComponent props from parent component
// may need to convert time into different format
