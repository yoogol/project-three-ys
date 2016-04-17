import axios from 'axios';

const AjaxHelpers = {
  getAllToDos: function(currentGroup) {
    return axios.get('http://localhost:3000/api/todos/' + currentGroup);
  },
  addNewToDo: function(todo) {
    console.log("ajax for todo");
    return axios.post('http://localhost:3000/api/todo', todo);
  },
  editToDo: function(todo, oldtodoid) {
    console.log(oldtodoid);
    console.log(todo);
    return axios.put('http://localhost:3000/api/todo/' + oldtodoid, todo);
  },
  deleteToDo: function(todo) {
    console.log(todo);
    return axios.delete('http://localhost:3000/api/todo/' +  todo);
  },
  addNewUser: function(user) {
    console.log("ajax for user");
    return axios.post('http://localhost:3000/api/user', user)
  },
  getAllUsers: function() {
    return axios.get('http://localhost:3000/api/users')
  },
  findUsersByGroup: function(group) {
    return axios.get('http://localhost:3000/api/users/' + group)
  },
  editUserInfo: function(score, name) {
    return axios.put('http://localhost:3000/api/user/' + name, score)
  }
}

export default AjaxHelpers;
