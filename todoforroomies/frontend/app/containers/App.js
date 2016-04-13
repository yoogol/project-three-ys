import React from 'react';
import Title from '../components/Title';
import AddButton from '../components/AddButton';
import AddForm from '../components/AddForm';
import TodoList from './TodoList';
import ClaimedTL from './ClaimedTL';
import CompletedTL from './CompletedTL';
import ScoreBoard from './ScoreBoard';
import AjaxHelpers from '../utils/AjaxHelpers'

const App = React.createClass ({
  getInitialState: function() {
    return {
      incompleteTodos: [],
      completeTodos: [],
      claimedTodosR1: [],
      claimedTodosR2: []
    }
  },
  handleAddButton: function() {
    console.log("add button clicked")
  },
  handleAddForm: function() {
    console.log("add form submitted")
  },
  componentDidMount: function() {
    AjaxHelpers.getAllToDos().then(function(response) {
      console.log(response.data.todos)
      let incompleteTodos = response.data.todos.filter(function(todo) {
        if (todo.completedStatus == false) {
          return true
        }
      });
      console.log("incomplete: ", incompleteTodos );
      this.setState({
        incompleteTodos: incompleteTodos
      });

      let completeTodos = response.data.todos.filter(function(todo) {
        if (todo.completedStatus === true) {
          return true
        }
      });
      console.log("complete: ", completeTodos );
      this.setState({
        completeTodos: completeTodos
      });

      let claimedTodosR1 = response.data.todos.filter(function(todo) {
        if (todo.roommate == 1) {
          return true
        }
      });
      console.log("claimed by R1: ", claimedTodosR1 );
      this.setState({
        claimedTodosR1: claimedTodosR1
      });

      let claimedTodosR2 = response.data.todos.filter(function(todo) {
        if (todo.roommate == 2) {
          return true
        }
      });
      console.log("claimed by R2: ", claimedTodosR2 );
      this.setState({
        claimedTodosR2: claimedTodosR2
      });

    }.bind(this));
  },
  render: function() {
    return (
      <div>
        <Title />
        <AddButton />
        <AddForm />
        <TodoList data={this.state.incompleteTodos}/>
        <ClaimedTL data={this.state.claimedTodosR1} roommate="Roomie #1" />
        <ClaimedTL data={this.state.claimedTodosR2} roommate="Roomie #2" />
        <CompletedTL data={this.state.completeTodos} />
        <ScoreBoard />
      </div>
    )
  }
});

export default App;
