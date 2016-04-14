import React from 'react';
import Title from '../components/Title';
import AddButton from '../components/AddButton';
import AddForm from '../components/AddForm';
import TodoList from './TodoList';
import ClaimedTL from './ClaimedTL';
import CompletedTL from './CompletedTL';
import ScoreBoard from './ScoreBoard';
import AjaxHelpers from '../utils/AjaxHelpers';
import LoginForm from '../components/LoginForm';
import ScoreBoardButton from '../components/ScoreBoardButton'
import InfoBtn from "../fsc/InfoBtn";
import ScoreBoardBtn from "../fsc/ScoreBoardBtn";
import FormContainer from "./FormContainer";
require('../style/Styles.css');

const App = React.createClass ({

  getInitialState: function() {
    return {
      incompleteTodos: [],
      completeTodos: [],
      claimedTodosR1: [],
      claimedTodosR2: [],
      roommate1: "",
      roommate2: "",
      typeOfFormActivated: "",
      oldtodoid: '',
      todoToEdit: '',
      ajaxResponse: '',
    }
  },
  handleLoginSubmit: function(e) {
    this.setState({
      roommate1: e.target.value
    })
  },
  handleScoreBoardButton: function() {
    console.log("scoreboard is called");
    this.setState ({
      typeOfFormActivated: "ScoreBoard",
    })
  },
  handleAddButton: function() {
    console.log("add button clicked");
    this.setState ({
      typeOfFormActivated: "Add",
      todoToEdit: ''
    });
  },
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
      componentDidMount();
    }.bind(this))

  },
  handleCheckBox: function() {
    console.log("checkbox clicked")
  },
  displayScoreBoard: function() {
    if (this.state.typeOfFormActivated == "ScoreBoard") {
      return (
        <ScoreBoard roommate1={this.state.roommate1} roommate2={this.state.roommate2}/>
      )
    }
  },
  displayForm: function() {
      return (
          <FormContainer userName={this.state.roommate1} typeOfFormActivated={this.state.typeOfFormActivated} todoToEdit={this.state.todoToEdit}/>
      )
  },
  componentDidMount: function() {
    AjaxHelpers.getAllToDos().then(function(response) {
      let incompleteTodos = response.data.todos.filter(function(todo) {
        if (todo.completedStatus == false) {
          return true
        }
      });
      this.setState({
        incompleteTodos: incompleteTodos
      });

      let completeTodos = response.data.todos.filter(function(todo) {
        if (todo.completedStatus === true) {
          return true
        }
      });
      this.setState({
        completeTodos: completeTodos
      });

      let claimedTodosR1 = response.data.todos.filter(function(todo) {
        if (todo.roommate == 1 && todo.completedStatus == false) {
          return true
        }
      });
      this.setState({
        claimedTodosR1: claimedTodosR1
      });

      let claimedTodosR2 = response.data.todos.filter(function(todo) {
        if (todo.roommate == 2 && todo.completedStatus == false) {
          return true
        }
      });
      this.setState({
        claimedTodosR2: claimedTodosR2
      });

    }.bind(this));
  },
  render: function() {
    return (
      <div>
        <InfoBtn />
        <Title className="title"/>
        <ScoreBoardBtn />
        <LoginForm handleLoginSubmit={this.handleLoginSubmit}/>
        <ScoreBoardButton handleScoreBoardButton={this.handleScoreBoardButton}/>
        {this.displayScoreBoard()}
        <AddButton
          handleAddButton={this.handleAddButton}
          />
        {this.displayForm()}
        <div className="main-todos-container">
          <TodoList data={this.state.incompleteTodos} handleEditButton={this.handleEditButton} handleDeleteButton={this.handleDeleteButton}/>
          <div className="roommate-containers">
            <ClaimedTL handleCheckBox={this.handleCheckBox} data={this.state.claimedTodosR1} roommate="Roomie #1" />
            <ClaimedTL handleCheckBox={this.handleCheckBox} data={this.state.claimedTodosR2} roommate="Roomie #2" />
          </div>
          <CompletedTL data={this.state.completeTodos} />
        </div>
      </div>
    )
  }
});

export default App;
