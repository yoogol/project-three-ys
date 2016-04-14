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
import InfoBtn from "../fsc/InfoBtn";
import ScoreBoardBtn from "../fsc/ScoreBoardBtn";
require('../style/Styles.css');

const App = React.createClass ({

  getInitialState: function() {
    return {
      incompleteTodos: [],
      completeTodos: [],
      claimedTodosR1: [],
      claimedTodosR2: [],
      createdBy: '',
      task: '',
      timeToComplete: '',
      dateDue:'',
      roommate1: "",
      roommate2: ""
    }
  },
  handleLoginSubmit: function(e) {
    this.setState({
      roommate1: e.target.value
    })
  },
  handleEditButton: function() {
    console.log("edit button clicked")
  },
  handleDeleteButton: function() {
    console.log("delete button clicked")
  },
  handleCheckBox: function() {
    console.log("checkbox clicked")
  },

  handleAddButton: function() {
    console.log("add button clicked")
  },
  handleAddForm: function() {
    console.log("add form submitted")
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

  createdBy: function(e) {
    this.setState({
      created: e.target.value
    })
  },

  taskName: function(e) {
    this.setState({
      task: e.target.value
    })
  },

  timeToComplete: function(e) {
    this.setState({
      timeToComplete: e.target.value
    })
  },

  dateDue: function(e) {
    this.setState({
      dateDue: e.target.value
    })
  },

  points: function(e) {
    this.setState({
      points: e.target.value
    })
  },

  handleSubmit: function(e) {
    e.preventDefault();
  },

  render: function() {
    return (
      <div>
        <InfoBtn />
        <Title className="title"/>
        <ScoreBoardBtn />
        <LoginForm handleLoginSubmit={this.handleLoginSubmit}/>
        <AddButton />
        <AddForm
          taskName={this.taskName}
          createdBy={this.created}
          timeToComplete={this.task}
          dateDue={this.dateDue}
          points={this.points}
        />
        <div className="main-todos-container">
          <TodoList data={this.state.incompleteTodos} handleEditButton={this.handleEditButton} handleDeleteButton={this.handleDeleteButton}/>
          <div className="roommate-containers">
            <ClaimedTL handleCheckBox={this.handleCheckBox} data={this.state.claimedTodosR1} roommate="Roomie #1" />
            <ClaimedTL handleCheckBox={this.handleCheckBox} data={this.state.claimedTodosR2} roommate="Roomie #2" />
          </div>
          <CompletedTL data={this.state.completeTodos} />
        </div>
        <ScoreBoard roommate1={this.state.roommate1} roommate2={this.state.roommate2}/>
      </div>
    )
  }
});

export default App;
