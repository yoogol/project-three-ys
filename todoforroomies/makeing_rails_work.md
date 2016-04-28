Transferring app to rails: Order of actions

Problems:
1. Need to redesign how todos are loaded: currently loading all todos and then looking for specific group/user
2. Need to redesign how group and user are matched: currently loading all users and looking for the one that is needed



Task: create all necessary routes to handle application:
I. For TODOS
  1. load all todos
    getAllToDos: function(currentGroup) {
      return axios.get('http://localhost:3000/api/todos/' + currentGroup);
    },
  2. add new todo
    addNewToDo: function(todo) {
      console.log("ajax for todo");
      return axios.post('http://localhost:3000/api/todo', todo);
  3. edit todo
    editToDo: function(todo, oldtodoid) {
      return axios.put('http://localhost:3000/api/todo/' + oldtodoid, todo);
    },
  4. delete todo
    deleteToDo: function(todo) {
      console.log(todo);
      return axios.delete('http://localhost:3000/api/todo/' +  todo);
    },
For USER
1. sign up user
  addNewUser: function(user) {
    return axios.post('http://localhost:3000/api/user', user)
  },
2. find group by user name
  findUsersByGroup: function(group) {
    return axios.get('http://localhost:3000/api/users/' + group)
  },
3. edit user
  editUserInfo: function(score, name) {
    return axios.put('http://localhost:3000/api/user/' + name, score)
  }

Unclear:
  getAllUsers: function() {
    return axios.get('http://localhost:3000/api/users')
  },
