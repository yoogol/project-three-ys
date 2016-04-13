import axios from 'axios';

const AjaxHelpers = {
  getAllToDos: function() {
    return axios.get('http://localhost:3000/api/todos');
  },
  addNewToDo: function(todo) {
    return axios.post('http://localhost:3000/api/todo', todo);
  },
  editToDo: function(todo) {
    return axios.put('http://localhost:3000/api/todo', todo);
  },
  deleteToDo: function(todo) {
    return axios.delete('http://localhost:3000/api/todo', todo);
  }
}

export default AjaxHelpers;
