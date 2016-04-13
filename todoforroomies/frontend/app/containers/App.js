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
      claimedTodosR2: [],
      createdBy: '',
      task: '',
      timeToComplete: '',
      dateDue:''
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
        <Title />
        <AddButton />
        <AddForm
          taskName={this.taskName}
          createdBy={this.created}
          timeToComplete={this.task}
          dateDue={this.dateDue}
          points={this.points}
          />
        <TodoList data={this.state.incompleteTodos}/>
        <ClaimedTL data={this.state.claimedTodosR1} roommate="Roomie #1" />
        <ClaimedTL data={this.state.claimedTodosR2} roommate="Roomie #2" />
        <CompletedTL data={this.state.completeTodos} />
        <TodoList />
        <ClaimedTL />
        <ClaimedTL />
        <CompletedTL />
        <ScoreBoard />
      </div>
    )
  }
});

export default App;
