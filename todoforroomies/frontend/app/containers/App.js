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
      ajaxResponse: '',
      todoToEdit: ''

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
  displayScoreBoard: function() {
    if (this.state.typeOfFormActivated == "ScoreBoard") {
      return (
        <ScoreBoard roommate1={this.state.roommate1} roommate2={this.state.roommate2}/>
      )
    }
  },
  handleEditButton: function(e) {
    console.log("edit button clicked");
    console.log(e.target.value)
    this.setState ({
      typeOfFormActivated: "Edit",
      oldtodoid: e.target.value
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
      })
    }.bind(this))
  },
  handleCheckBox: function() {
    console.log("checkbox clicked")
  },

  handleAddButton: function() {
    console.log("add button clicked");
    this.setState ({
      typeOfFormActivated: "Add"
    });
  },
  displayAddForm: function() {
    if (this.state.typeOfFormActivated == "Add") {
      console.log("add is called")
      return (
        <AddForm
          userName={this.state.roommate1}
          typeOfFormActivated={this.state.typeOfFormActivated}
          todoToEdit={this.state.todoToEdit}
          />
      )
    } else if (this.state.typeOfFormActivated == "Edit") {
      console.log("edit is called")
      console.log(this.state.oldtodoid);
      let oldtodoid = this.state.oldtodoid;
      console.log(this.state.incompleteTodos)
      let todoToEdit = this.state.incompleteTodos.filter(function(todo) {
        if (todo._id == oldtodoid) {
          return todo
        }
      });
      console.log(todoToEdit);
      this.setState ({
        todoToEdit: todoToEdit[0]
      });
      return (
        <AddForm
          userName={this.state.roommate1}
          typeOfFormActivated={this.state.typeOfFormActivated}
          todoToEdit={this.state.todoToEdit}
          />
      )
    } else {
      return
    }
  },
  handleAddForm: function() {
    console.log("add form submitted");
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
        <Title />
        <hr></hr>
        <LoginForm handleLoginSubmit={this.handleLoginSubmit}/>
        <hr></hr>
        <ScoreBoardButton handleScoreBoardButton={this.handleScoreBoardButton}/>
        <hr></hr>
        {this.displayScoreBoard()}
        <AddButton
          handleAddButton={this.handleAddButton}

          />
        <hr></hr>
        {this.displayAddForm()}
        <hr></hr>
        <TodoList data={this.state.incompleteTodos} handleEditButton={this.handleEditButton} handleDeleteButton={this.handleDeleteButton}/>
        <hr></hr>
        <ClaimedTL handleCheckBox={this.handleCheckBox} data={this.state.claimedTodosR1} roommate="Roomie #1" />
        <hr></hr>
        <ClaimedTL handleCheckBox={this.handleCheckBox} data={this.state.claimedTodosR2} roommate="Roomie #2" />
        <hr></hr>
        <CompletedTL data={this.state.completeTodos} />
        <hr></hr>

      </div>
    )
  }
});

export default App;
