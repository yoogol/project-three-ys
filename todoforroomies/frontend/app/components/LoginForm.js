import React from 'react';
var Button = require('react-bootstrap').Button;
import AjaxHelpers from '../utils/AjaxHelpers';

const LoginForm = React.createClass ({
  getInitialState: function() {
    return {
      loginPath: "",
      name: "",
      password: "",
      group: ""
    }
  },
  //******CHOSING PATH ************//
  handleLoginPathButton: function() {
    this.setState ({
      loginPath: "login"
    })
  },
  handleNoLoginPathButton: function() {
    this.setState ({
      loginPath: "nologin"
    })
  },
  handleRegisterPathButton: function() {
    this.setState ({
      loginPath: "register"
    })
  },
  //************HANDLING LOGIN*************//
  handleLoginName: function(e) {
    this.setState ({
      name: e.target.value
    })
  },
  handleLoginPassword: function(e) {
    this.setState ({
      password: e.target.value
    })
  },
  handleGroupName: function(e) {
    this.setState ({
      group: e.target.value
    })
  },

  //*************HANDLING REGISTRATION**********//
  handleRegisterSubmit: function(e) {
    e.preventDefault();
    this.props.closeBtn();
    if (this.state.name != "") {
      let newUser = {
        name: this.state.name,
        password: this.state.password,
        group: this.state.group
      };
      console.log(newUser);
      console.log("ajax call to add to db (check if unique)");
      AjaxHelpers.getAllUsers().then(function(response) {
        console.log(response.data);
        let userExists = response.data.filter(function(user) {
          if (user.name == newUser.name) {
            return true
          }
        });
        let groupExists = response.data.filter(function(user) {
          if (user.group == newUser.group) {
            return true
          }
        });
        if (userExists.length > 0 || groupExists.length > 0) {
          console.log("user already exists")
        } else {
          AjaxHelpers.addNewUser(newUser).then(function(response) {
            console.log(response);
            this.props.handleRegistration(newUser);
          }.bind(this))
        }
      }.bind(this));
    }
  },
  handleLoginSubmit: function(e) {
    e.preventDefault();
    this.props.closeBtn();
    console.log("check if name is in db");
    console.log("if yes, approve");
    e.preventDefault();
    if (this.state.name != "") {
      let lookupUser = {
        name: this.state.name,
        password: this.state.password,
      };
      console.log(lookupUser);
      console.log("ajax call to add to db (check if unique)");
      AjaxHelpers.getAllUsers().then(function(response) {
        console.log(response.data);
        let userIsCorrect = response.data.filter(function(user) {
          if (user.name == lookupUser.name && user.password == lookupUser.password) {
            return true
          }
        });
        if (userIsCorrect.length > 0) {
          console.log("user info is correct");
          this.props.handleRegistration(userIsCorrect[0]);
        } else {
          console.log("user info incorrect")
        }
      }.bind(this));
    }
  },
  handleJustPeekIn: function(e) {
    e.preventDefault();
    this.props.closeBtn();
    let dummyUser = {
      name: "Awesome Roommate",
      group: "Just Trying It Out"
    };
    this.props.handleRegistration(dummyUser);
  },
  //*********DISPLAYING*********//
  displayLogin: function() {
    if (this.state.loginPath === "login") {
      return (
        <div>
          <hr></hr>
          <form onSubmit={this.handleLoginSubmit}>
            <h1>Please log in</h1>
            <input
              className="logininput"
              type="text"
              placeholder="User Name"
              value={this.state.name}
              onChange={this.handleLoginName}
              />
            <input
              className="logininput"
              type="text"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleLoginPassword}
              />
            <input className="user-login-button" type="submit"/>
          </form>
        </div>
      )
    } else if (this.state.loginPath === "nologin") {

      return (
        <div>
            <hr></hr>
            <h1>You are in!</h1>
            <p>Please remember since you are not logged in your data will not be saved</p>
            <Button onClick={this.handleJustPeekIn}>Close</Button>
        </div>

      )
    } else if (this.state.loginPath == "register") {
      return (
        <div>
          <hr></hr>
          <form onSubmit={this.handleRegisterSubmit}>
            <h1>Please register</h1>
            <input
              type="text"
              placeholder="group name"
              value={this.state.group}
              onChange={this.handleGroupName}
              />
            <input
              type="text"
              placeholder="name"
              value={this.state.name}
              onChange={this.handleLoginName}
              />
            <input
              type="text"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleLoginPassword}
              />
            <input type="submit"/>
          </form>
        </div>
      )
    }
  },

  render: function() {
    return (
      <div className="pop-up-content">
        <h2 className="welcome-message">Welcome to Roomies, where dirty pots don't eat relationships</h2>
        <h3 className="login">Please login or proceed as a guest.</h3>
        <Button className="button main-start-button" onClick={this.handleRegisterPathButton}>Register</Button>
        <Button className="button main-start-button" onClick={this.handleLoginPathButton}>Login</Button>
        <Button className="button main-start-button" onClick={this.handleNoLoginPathButton}>Just peek in</Button>
        {/* <hr></hr> */}
        {this.displayLogin()}

      </div>
    )
  }
});


export default LoginForm;
