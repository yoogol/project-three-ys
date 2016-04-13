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
      databaseData: [],
    }
  },
  handleAddButton: function() {
    console.log("add button clicked")
  },
  handleAddForm: function() {
    console.log("add form submitted")
  },
  // componentDidMount: function() {
  //   AjaxHelpers.getAllToDos().then(function(response) {
  //     this.setState({
  //       todosFromDB: response.data.todos,
  //       todosToDisplay: response.data.todos
  //     })
  //   }.bind(this));
  // },
  getData: [
    {
      headline:"hello"
    },
    {
      headline:"hello2"
    }
  ],
  render: function() {
    return (
      <div>
        <Title />
        <AddButton />
        <AddForm />
        <TodoList data={this.getData}/>
        <ClaimedTL />
        <ClaimedTL />
        <CompletedTL />
        <ScoreBoard />
      </div>
    )
  }
});

export default App;
