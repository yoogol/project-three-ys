import React from 'react';
import Title from '../components/Title';
import AddButton from '../components/AddButton';
import AddForm from '../components/AddForm';
import TodoList from './TodoList';
import ClaimedTL from './ClaimedTL';
import CompletedTL from './CompletedTL';
import ScoreBoard from './ScoreBoard';

const App = React.createClass ({
  getData: [
    {
      name:"hello"
    },
    {
      name:"hello2"
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
