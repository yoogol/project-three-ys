import axios from 'axios';

const AjaxHelpers = {
  getAllToDos: function() {
    return axios.get('http://localhost:3000/api/todos');
  },
  addNewToDo: function(todo) {
    console.log("ajax for todo");
    return axios.post('http://localhost:3000/api/todo', todo);
  },
  editToDo: function(todo, oldtodoid) {
    return axios.put('http://localhost:3000/api/todo' + oldtodoid, todo);
  },
  deleteToDo: function(todo) {
    return axios.delete('http://localhost:3000/api/todo', todo);
  }
}

export default AjaxHelpers;
