import React from 'react';
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;

import Title from '../fsc/Title';
import AddButton from '../fsc/AddButton';
import AddForm from '../components/AddForm';
import TodoList from './TodoList';
import ClaimedTL from './ClaimedTL';
import CompletedTL from './CompletedTL';
import ScoreBoard from './ScoreBoard';
import AjaxHelpers from '../utils/AjaxHelpers';
import LoginForm from '../components/LoginForm';
// import ScoreBoardButton from '../components/ScoreBoardButton'
import InfoBtn from "../fsc/InfoBtn";
import ScoreBoardBtn from "../fsc/ScoreBoardBtn";
import FormContainer from "./FormContainer";
import UserInfo from "../fsc/UserInfo";
require('../style/Styles.css');


const App = React.createClass ({

  getInitialState: function() {
    return {
      ajaxResponse: '',
      incompleteTodos: [],
      completeTodos: [],
      claimedTodosR1: [],
      claimedTodosR2: [],

      roommate1name: "",
      roommate1score: 0,
      roommate2name: "",
      roommate2score: 0,


      typeOfFormActivated: "",

      oldtodoid: '',
      todoToEdit: '',
      ajaxResponse: '',
      currentUser: '',
      currentGroup: "",
      showModal: true
    }
  },
  //modal functions from react bootstrap:
  close() {
   this.setState({ showModal: false });
  },

  open() {
     this.setState({ showModal: true });
  },
  //*******LOGIN/REGISTRATION*******//
  handleRegistration: function(user) {
    console.log("logging user:", user);
    this.setState ({
      currentUser: user.name,
      currentGroup: user.group,
      roommate1: {name: user.name},
      roommate2: {name: "unknown for now"}
    });
    console.log(this.state.roommate1);
  },
  //******MAIN SCREEN BUTTONS*******//
  handleScoreBoardButton: function() {
    console.log("scoreboard is called");
    this.setState ({
      typeOfFormActivated: "ScoreBoard",
    })
  },
  handleAddButton: function() {
    console.log("add button clicked");
    if (this.state.typeOfFormActivated != "Todo") {
      this.setState ({
        typeOfFormActivated: "Add",
        todoToEdit: ''
      });
    } else {
      this.setState ({
        typeOfFormActivated: "",
        todoToEdit: ''
      });
    }
  },
  //*********ONE TODO BUTTONS***********//
  handleEditButton: function(e) {
    console.log("edit button clicked");
    console.log(e.target.value);
    let todoToEdit = this.state.incompleteTodos.filter(function(todo) {
      if (todo._id == e.target.value) {
        return todo
      }
    });
    this.setState ({
      typeOfFormActivated: "Edit",
      todoToEdit: todoToEdit[0]
    })
  },
  handleDeleteButton: function(e) {
    console.log("delete button clicked");
    console.log(e.target.value);
    let todoToDeleteId = e.target.value;
    AjaxHelpers.deleteToDo(todoToDeleteId).then(function(response) {
      console.log(response);
      this.setState ({
        ajaxResponse: response
      });
      this.loadAllTasks();
    }.bind(this))

  },
  handleCheckBox: function(e) {
    e.preventDefault();
    console.log("checkbox clicked");
    let todoToComplete = e.target.value;
    let newTaskProp = {
      completedStatus: true
    };
    AjaxHelpers.editToDo(newTaskProp, todoToComplete).then(function(response) {
      console.log(response);
      this.loadAllTasks();
    }.bind(this))
  },
  handleUnCheckBox: function(e) {
    e.preventDefault();
    console.log("uncheckbox clicked");
    let todoToComplete = e.target.value;
    let newTaskProp = {
      completedStatus: false
    };
    AjaxHelpers.editToDo(newTaskProp, todoToComplete).then(function(response) {
      console.log(response);
      this.loadAllTasks();
    }.bind(this))
  },
  handleUnClaimButton: function(e) {
    console.log("unclaim button clicked");
    console.log(e.target.value);
    let todoToChange = e.target.value;
    let newTaskProp = {
      roommate: 0
    };
    AjaxHelpers.editToDo(newTaskProp, todoToChange).then(function(response) {
      console.log(response);
      this.loadAllTasks();
    }.bind(this))
  },
  handleClaimMenu: function(e){
    console.log("dropdown has been changed");
    console.log(e.target.value);
    console.log(e.target.getAttribute("id"));
    let todoToChange = e.target.getAttribute("id");
    let newTaskProp = {
      roommate: e.target.value
    };
    AjaxHelpers.editToDo(newTaskProp, todoToChange).then(function(response) {
      console.log(response);
      this.loadAllTasks();
    }.bind(this))
  },

  //********DISPLAY COMPONENTS**********//
  displayScoreBoard: function() {
    if (this.state.typeOfFormActivated == "ScoreBoard") {
      return (
        <ScoreBoard roommate1={this.state.roommate1} roommate2={this.state.roommate2}/>
      )
    }
  },
  displayForm: function() {
      return (
          <FormContainer userName={this.state.roommate1} typeOfFormActivated={this.state.typeOfFormActivated} todoToEdit={this.state.todoToEdit}
          loadAllTasks={this.loadAllTasks}
          />
      )
  },
  //**********RELOADING FROM DB***********//
  loadAllTasks: function() {
    AjaxHelpers.getAllToDos().then(function(response) {
      let incompleteTodos = response.data.todos.filter(function(todo) {
        if (todo.completedStatus == false && todo.roommate == 0) {
          return true
        }
      });
      this.setState({
        incompleteTodos: incompleteTodos
      });
      console.log("incomplete:", this.state.incompleteTodos)

      let completeTodos = response.data.todos.filter(function(todo) {
        if (todo.completedStatus === true) {
          return true
        }
      });
      this.setState({
        completeTodos: completeTodos
      });
      console.log("complete:", this.state.completeTodos)

      let claimedTodosR1 = response.data.todos.filter(function(todo) {
        if (todo.roommate == 1 && todo.completedStatus == false) {
          return true
        }
      });
      this.setState({
        claimedTodosR1: claimedTodosR1
      });
      console.log("claimed1", this.state.claimedTodosR1)

      let claimedTodosR2 = response.data.todos.filter(function(todo) {
        if (todo.roommate == 2 && todo.completedStatus == false) {
          return true
        }
      });
      this.setState({
        claimedTodosR2: claimedTodosR2
      });
      console.log("claimed2:", this.state.claimedTodosR2)

    }.bind(this));
  },
  componentDidMount: function() {
    this.loadAllTasks();

    // fixing backdrop width for modal bootstrap
    let backdrop = document.querySelector(".pop-up-window").parentNode.parentNode;
    backdrop.style.width = "auto";
  },

  //*************RENDERING***************//
  render: function() {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close} className="pop-up-window">
          <LoginForm closeBtn={this.close} handleRegistration={this.handleRegistration}/>
        </Modal>
        <InfoBtn />
        <Title className="title"/>
        <UserInfo currentGroup={this.state.currentGroup} currentUser={this.state.currentUser}/>
        <ScoreBoardBtn handleScoreBoardButton={this.handleScoreBoardButton}/>
        {this.displayScoreBoard()}
        <AddButton
          handleAddButton={this.handleAddButton}
          />
        {this.displayForm()}
        <div className="main-todos-container">
          <TodoList
            data={this.state.incompleteTodos} handleEditButton={this.handleEditButton} handleDeleteButton={this.handleDeleteButton}
            handleClaimButtonR1={this.handleClaimButtonR1}
            handleClaimButtonR2={this.handleClaimButtonR2}
            handleClaimMenu={this.handleClaimMenu}
            handleClickOnClaimMenu={this.handleClickOnClaimMenu}
            />
          <div className="roommate-containers">
            <ClaimedTL
              handleCheckBox={this.handleCheckBox}
              data={this.state.claimedTodosR1}
              roommate="Roomie #1"
              handleUnClaimButton={this.handleUnClaimButton}
            />
            <ClaimedTL
              handleCheckBox={this.handleCheckBox}
              data={this.state.claimedTodosR2}
              roommate="Roomie #2"
              handleUnClaimButton={this.handleUnClaimButton}
            />
          </div>
          <CompletedTL data={this.state.completeTodos}
          handleUnCheckBox={this.handleUnCheckBox} />
        </div>
      </div>
    )
  }
});

export default App;
