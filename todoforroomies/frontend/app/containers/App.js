import React from 'react';
var Modal = require('react-bootstrap').Modal;
import Title from '../fsc/Title';
import AddButton from '../fsc/AddButton';
import AddForm from '../components/AddForm';
import TodoList from './TodoList';
import ClaimedTL from './ClaimedTL';
import CompletedTL from './CompletedTL';
import Instructions from "../fsc/Instructions";
import ScoreBoard from './ScoreBoard';
import AjaxHelpers from '../utils/AjaxHelpers';
import LoginForm from '../components/LoginForm';
// import ScoreBoardButton from '../components/ScoreBoardButton'
import InfoBtn from "../fsc/InfoBtn";
import ScoreBoardBtn from "../fsc/ScoreBoardBtn";
import FormContainer from "./FormContainer";
import UserInfo from "../fsc/UserInfo";
require('../style/Styles.css');
var Moment = require('moment');
var Datetime = require('react-datetime');


const App = React.createClass ({

  getInitialState: function() {
    return {
      /*user info*/
      currentGroup: "TryingItOut",

      currentUser: 'best roomie',
      currentUserTotalScore: 0,
      currentUserThisWeek: 0,
      currentUserLastWeek: 0,

      partnerUser: "another roomie",
      partnerUserTotalScore: 0,
      partnerUserThisWeek: 0,
      partnerUserLastWeek: 0,

      /*tasks info*/
      allTasks: [],
      incompleteTodos: [],
      completeTodos: [],
      completeTodosThisWR1: [],
      completeTodosLastWR1: [],
      completeTodosThisWR2: [],
      completeTodosLastWR1: [],
      claimedTodosR1: [],
      claimedTodosR2: [],

      /*props to retire*/
      roommate1name: "",
      roommate1score: 0,
      roommate1scoreThisWeek: 0,
      roommate1scoreLastWeek: 0,
      roommate2name: "",
      roommate2score: 0,
      roommate2scoreThisWeek: 0,
      roommate2scoreLastWeek: 0,

      typeOfFormActivated: "",

      oldtodoid: '',
      todoToEdit: '',
      ajaxResponse: '',


      showWelcomeModal: true,
      showInstructionsModal: true,
      showScoreboardModal: true,
      showAddTaskModal: false,
    }
  },

  //modal functions from react bootstrap
  welcomeClose() {
    this.setState({ showWelcomeModal: false });
  },
  welcomeOpen() {
    this.setState({ showWelcomeModal: true });
  },
  instructionsClose() {
    this.setState({ showInstructionsModal: false });
  },
  instructionsOpen() {
    this.setState({ showInstructionsModal: true });
  },
  scoreboardClose() {
    this.setState({ showScoreboardModal: false });
  },
  scoreboardOpen() {
    this.setState({ showScoreboardModal: true });
  },
  addTaskClose() {
    this.setState({ showAddTaskModal: false });
  },
  addTaskOpen() {
    this.setState({ showAddTaskModal: true });
  },

  handleInstructionsButton: function() {
    console.log("instructions are called");
    this.setState ({
      typeOfFormActivated: "Instructions",
    })
    this.instructionsOpen();
  },

  //*******LOGIN/REGISTRATION*******//
  handleRegistration: function(currentUser, partnerUser) {
    console.log("logging users:")
    console.log(currentUser, partnerUser);
    this.setState ({
      currentGroup: currentUser.group,
      currentUser: currentUser.name,
      currentUserTotalScore: currentUser.score,
      partnerUser: partnerUser.name,
      partnerUserTotalScore: partnerUser.score,
    });
    console.log("state was updated");
    this.loadAllTasks()
  },
  //******MAIN SCREEN BUTTONS*******//
  handleScoreBoardButton: function() {
    console.log("scoreboard is called");
    this.setState ({
      typeOfFormActivated: "ScoreBoard",
    })
    this.scoreboardOpen();

  },
  handleAddButton: function() {
    console.log("add button clicked");
    if (this.state.typeOfFormActivated != "Todo") {
      this.setState ({
        typeOfFormActivated: "Add",
        todoToEdit: ''
      });
    } else {
      this.setState ({
        typeOfFormActivated: "",
        todoToEdit: ''
      });
    };
    this.addTaskOpen();

  },
  //*********ONE TODO BUTTONS***********//
  handleEditButton: function(e) {
    console.log("edit button clicked");
    let todoToEdit = this.state.incompleteTodos.filter(function(todo) {
      if (todo._id == e.target.value) {
        return todo
      }
    });
    this.setState ({
      typeOfFormActivated: "Edit",
      todoToEdit: todoToEdit[0]
    });
    this.addTaskOpen();
  },
  handleDeleteButton: function(e) {
    console.log("delete button clicked");
    let todoToDeleteId = e.target.value;
    AjaxHelpers.deleteToDo(todoToDeleteId).then(function(response) {
      console.log("response from deleteToDo", response);
      this.setState ({
        ajaxResponse: response
      });
      this.loadAllTasks();
    }.bind(this))

  },

  retrieveThisWeekScore: function(weekNum, roomie) {
    console.log("runnign function");
    console.log("complted", this.state.completeTodos)
    let tasks = this.state.completeTodos.filter(function(todo) {
      if (todo.weekCompleted == weekNum && todo.completedBy == roomie) {
        return true
      }
    });
    console.log("tasks found", tasks)
    let NumOfTasks = tasks.length;
    let scores = 0;
    for (let i = 0; i < NumOfTasks; i ++) {
      scores += tasks[i].pointsWorth
    };
    console.log(scores)
    return scores
  },
  handleCheckBox: function(e) {
    e.preventDefault();
    console.log("checkbox clicked");
    let todoToComplete = e.target.value;
    console.log("week number stored in db", Moment().format('W'));
    let roommateThatClaimed = e.target.getAttribute("id");
    console.log("roommateThatClaimed:", roommateThatClaimed);
    let newTaskProp = {
      completedStatus: true,
      timeCompleted: new Date(),
      weekCompleted: Moment().format('W'),
      completedBy: roommateThatClaimed
    };
    AjaxHelpers.editToDo(newTaskProp, todoToComplete).then(function(response) {
      console.log("response from editToDo (check):", response);
      this.loadAllTasks();
      let pointsEarned = this.state.allTasks.filter(function(todo) {
        if (todoToComplete == todo._id) {
          return true
        }
      })[0].pointsWorth;
      let newScore ={
        score: this.state.currentUserTotalScore + pointsEarned,
      };
      this.setState ({
        currentUserTotalScore: this.state.currentUserTotalScore + pointsEarned,
        currentUserThisWeek: this.state.currentUserThisWeek + pointsEarned
      });
      console.log("new score after updating the state (check)", newScore);
      AjaxHelpers.editUserInfo(newScore, this.state.currentUser).then(function(response) {
        console.log("response from editUserInfo", response);
      })
    }.bind(this));
  },
  handleUnCheckBox: function(e) {
    e.preventDefault();
    console.log("uncheckbox clicked");
    let todoToComplete = e.target.value;
    let newTaskProp = {
      completedStatus: false,
      timeCompleted: '',
      weekCompleted: '',
      completedBy: ''
    };
    AjaxHelpers.editToDo(newTaskProp, todoToComplete).then(function(response) {
      console.log("response from editToDo (uncheck):", response);
      this.loadAllTasks();
      let pointsLost = this.state.allTasks.filter(function(todo) {
        if (todoToComplete == todo._id) {
          return true
        }
      })[0].pointsWorth;
      let newScore ={
        score: this.state.currentUserTotalScore - pointsLost,
      };
      this.setState ({
        currentUserTotalScore: this.state.currentUserTotalScore - pointsLost,
        currentUserThisWeek: this.state.currentUserThisWeek - pointsLost
      });
      console.log("new score after updating the state (uncheck)", newScore);
      AjaxHelpers.editUserInfo(newScore, this.state.currentUser).then(function(response) {
        console.log("response from editUserInfo", response);
      })
    }.bind(this))
  },
  handleUnClaimButton: function(e) {
    console.log("unclaim button clicked");
    let todoToChange = e.target.value;
    let newTaskProp = {
      roommate: 0
    };
    AjaxHelpers.editToDo(newTaskProp, todoToChange).then(function(response) {
      console.log("response from editToDo", response);
      this.loadAllTasks();
    }.bind(this))
  },
  handleClaimMenu: function(e,eventKey){
    console.log("dropdown has been changed");
    console.log("eventKey",eventKey[0]);
    console.log("eventKey",eventKey[1]);
    // console.log("e.target",e.target);
    // console.log("e.target.getAttribute('value')",e.target.getAttribute("value"));
    // console.log("e.target.getAttribute('id')",e.target.getAttribute("id"));
    let todoToChange = eventKey[1];
    let newTaskProp = {
      roommate: eventKey[0]
    };
    //"roommate reflects which roomie claimed the task"
    AjaxHelpers.editToDo(newTaskProp, todoToChange).then(function(response) {
      console.log("response from editToDo", response);
      this.loadAllTasks();
    }.bind(this))
  },

  //********DISPLAY COMPONENTS**********//
  displayInstructions: function() {
    if (this.state.typeOfFormActivated == "Instructions") {
      return (
        <Modal
          show={this.state.showInstructionsModal}
          onHide={this.InstructionsClose}
          className="pop-up-window"
        >
          <Instructions
            closeBtn={this.instructionsClose}
          />
        </Modal>
      )
    }
  },

  displayScoreBoard: function() {
    if (this.state.typeOfFormActivated == "ScoreBoard") {
      return (
        <Modal
          show={this.state.showScoreboardModal}
          onHide={this.scoreboardClose}
          className="pop-up-window"
        >
          <ScoreBoard
            closeBtn={this.scoreboardClose}
            currentUser={this.state.currentUser}  partnerUser={this.state.partnerUser}
            currentUserThisWeek={this.state.currentUserThisWeek}
            currentUserLastWeek={this.state.currentUserLastWeek}
            partnerUserThisWeek={this.state.partnerUserThisWeek}
            partnerUserLastWeek={this.state.partnerUserLastWeek}
            updateAllScores={this.updateAllScores}
          />
        </Modal>
      )
    }
  },
  displayForm: function() {
      return (
        <Modal
          show={this.state.showAddTaskModal}
          onHide={this.addTaskClose}
          className="pop-up-window"
        >
          <FormContainer
            closeBtn={this.addTaskClose}
            userName={this.state.currentUser}
            typeOfFormActivated={this.state.typeOfFormActivated}
            todoToEdit={this.state.todoToEdit}
            loadAllTasks={this.loadAllTasks}
            currentUser={this.state.currentUser}
            currentGroup={this.state.currentGroup}
          />
        </Modal>
      )
  },
  //**********RELOADING FROM DB***********//
  loadAllTasks: function() {
    AjaxHelpers.getAllToDos(this.state.currentGroup).then(function(response) {
      console.log("response from get All To Dos", response.data.todos);
      this.setState({
        allTasks: response.data.todos
      });

      let incompleteTodos = response.data.todos.filter(function(todo) {
        if (todo.completedStatus == false && todo.roommate == 0) {
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
  updateAllScores: function(){
    console.log("running updateAllScores");
    this.setState({
      currentUserThisWeek: this.retrieveThisWeekScore(Moment().format('W'), this.state.currentUser),
      currentUserLastWeek: this.retrieveThisWeekScore((Moment().format('W')-1), this.state.currentUser),
      partnerUserThisWeek: this.retrieveThisWeekScore(Moment().format('W'), this.state.partnerUser),
      partnerUserLastWeek: this.retrieveThisWeekScore((Moment().format('W')-1), this.state.partnerUser)
    })
  },
  componentDidMount: function() {
    this.loadAllTasks();
  },

  //*************RENDERING***************//
  render: function() {
    return (
      <div>
        <Modal show={this.state.showWelcomeModal} className="pop-up-window">
          <LoginForm closeBtn={this.welcomeClose} handleRegistration={this.handleRegistration}/>
        </Modal>

        <div className="top-row">
          <InfoBtn
            show={this.state.showInstructionsModal}
            handleInstructionsButton={this.handleInstructionsButton}
          />
          {this.displayInstructions()}

          <div className="top-middle">
            <Title className="title"/>

            <UserInfo currentGroup={this.state.currentGroup} currentUser={this.state.currentUser}
            partnerUser={this.state.partnerUser}
              />
          </div>

          <ScoreBoardBtn show={this.state.showScoreboardModal}
          handleScoreBoardButton={this.handleScoreBoardButton}/>
          {this.displayScoreBoard()}
        </div>

        {/* <AddButton
        //   show={this.state.showAddTaskModal}
        //   handleAddButton={this.handleAddButton}
        // />
        // {this.displayForm()}*/}

        <div className="main-todos-container">
          <TodoList
            showForm={this.state.showAddTaskModal}
            handleAddButton={this.handleAddButton}
            displayAddForm={this.displayForm}
            data={this.state.incompleteTodos}
            handleEditButton={this.handleEditButton}
            handleDeleteButton={this.handleDeleteButton}
            handleClaimButtonR1={this.handleClaimButtonR1}
            handleClaimButtonR2={this.handleClaimButtonR2}
            handleClaimMenu={this.handleClaimMenu}
            handleClickOnClaimMenu={this.handleClickOnClaimMenu}
            currentUser={this.state.currentUser}
            partnerUser={this.state.partnerUser}
            />

          <div className="roommate-containers">
            <ClaimedTL
              handleCheckBox={this.handleCheckBox}
              data={this.state.claimedTodosR1}
              roommate={this.state.currentUser}
              handleUnClaimButton={this.handleUnClaimButton}
            />
            <ClaimedTL
              handleCheckBox={this.handleCheckBox}
              data={this.state.claimedTodosR2}
              roommate={this.state.partnerUser}
              handleUnClaimButton={this.handleUnClaimButton}
            />
          </div>
          <CompletedTL
            data={this.state.completeTodos}
            handleUnCheckBox={this.handleUnCheckBox}
          />
        </div>
      </div>
    )
  }
});

export default App;
