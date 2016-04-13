import React from 'react';
import Title from '../components/Title';
import AddButton from '../components/AddButton';
import AddForm from '../components/AddForm';
import TodoList from './TodoList';
import ClaimedTL from './ClaimedTL';
import CompletedTL from './CompletedTL';
import ScoreBoard from './ScoreBoard';

const App = React.createClass ({

  getInitialState: function() {
    return {
      ajaxReturn: [],
      createdBy: '',
      task: '',
      timeToComplete: '',
      dateDue:''
    };
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
