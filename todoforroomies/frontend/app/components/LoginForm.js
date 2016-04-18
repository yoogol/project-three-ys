import React from 'react';
var Button = require('react-bootstrap').Button;
var FontAwesome = require('react-fontawesome');
import AjaxHelpers from '../utils/AjaxHelpers';
require('../style/Styles.css');

const LoginForm = React.createClass ({
  getInitialState: function() {
    return {
      loginPath: "",
      name: "",
      password: "",
      group: "",
      groupPassword: ""
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
  handleGroupPassword: function(e) {
    this.setState ({
      groupPassword: e.target.value
    })
  },
  //*************HANDLING REGISTRATION**********//
  handleRegisterSubmit: function(e) {
    e.preventDefault();
    if (this.state.name != "") {
      let newUser = {
        name: this.state.name,
        password: this.state.password,
        group: this.state.group,
        groupPassword: this.state.groupPassword
      };
      console.log(newUser);
      console.log("ajax call to add to db (check if unique)");
      AjaxHelpers.getAllUsers().then(function(response) {
        console.log(response.data);
        //checking if username is taken
        let userExists = response.data.filter(function(user) {
          if (user.name == newUser.name) {
            return true
          }
        });
        //chekcing if group is taken or password incorrect
        let groupExists = response.data.filter(function(user) {
          if (user.group == newUser.group && user.groupPassword != newUser.groupPassword) {
            return true
          }
        });

        if (userExists.length > 0) {
          alert("Sorry, this name is already taken. Try a different one, please!")

        } else if (groupExists.length > 0) {
          alert("If you are creating a new group, this group name is already taken. If you are joining an existing group, your group password did not match. Please try again!")
        } else {
          this.props.closeBtn();

          AjaxHelpers.addNewUser(newUser).then(function(response) {
            console.log(response);
            AjaxHelpers.findUsersByGroup(newUser.group).then(function(response) {
              console.log(response.data);
              if (response.data.length > 1) {
                let partnerUser = response.data.filter(function(user) {
                  if (user.name != newUser.name) {
                    return true
                  }
                })[0];
                this.props.handleRegistration(newUser, partnerUser);
              } else {
                let partnerUser = {
                  name: "TBD",
                  score: 0
                }
                this.props.handleRegistration(newUser, partnerUser);
              };
            }.bind(this));

          }.bind(this))
        }
      }.bind(this));
    }
  },
  handleLoginSubmit: function(e) {
    e.preventDefault();
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
        let correctUser = response.data.filter(function(user) {
          if (user.name == lookupUser.name && user.password == lookupUser.password) {
            return true
          }
        });
        if (correctUser.length > 0) {
          console.log("user info is correct");
          console.log(correctUser[0]);
          AjaxHelpers.findUsersByGroup(correctUser[0].group).then(function(response) {
            console.log(response.data);
            if (response.data.length > 1) {
              console.log("running if statement")
              let partnerUser = response.data.filter(function(user) {
                if (user.name != correctUser[0].name) {
                  return true
                }
              })[0];
              console.log(partnerUser);
              this.props.handleRegistration(correctUser[0], partnerUser);
            } else {
              let partnerUser = {
                name: "TBD",
                score: 0
              }
              this.props.handleRegistration(correctUser[0], partnerUser);
            };
          }.bind(this));

          this.props.closeBtn();

        } else {
          alert("user info incorrect")
        }
      }.bind(this));
    }
  },
  handleJustPeekIn: function(e) {
    e.preventDefault();
    this.props.closeBtn();
    let currentUser = {
      name: "best roomie",
      group: "TryingItOut",
      score: 20
    };
    let partnerUser = {
      name: "other roomie",
      score: 30
    }
    this.props.handleRegistration(currentUser, partnerUser);
  },
  //*********DISPLAYING*********//
  displayLogin: function() {
    if (this.state.loginPath === "login") {
      return (
        <div>
          <hr></hr>
          <form onSubmit={this.handleLoginSubmit}>
            <h2>Please log in</h2>
            <input
              className="logininput"
              type="text"
              placeholder="User Name"
              value={this.state.name}
              onChange={this.handleLoginName}
              />
            <br />
            <input
              className="logininput"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleLoginPassword}
              />
            <br />
            <Button className="user-login-button" type="submit">Submit!</Button>
          </form>
        </div>
      )
    } else if (this.state.loginPath === "nologin") {

      return (
        <div>
            <hr></hr>
            <h2>You are in!</h2>
            <p className="guest-message">Please remember since you are not logged in your data will not be saved</p>
            <Button onClick={this.handleJustPeekIn}>Close</Button>
        </div>

      )
    } else if (this.state.loginPath == "register") {
      return (
        <div>
          <hr></hr>
          <form onSubmit={this.handleRegisterSubmit}>
            <h2>Please register or join a group</h2>
            <input
              type="text"
              placeholder="Group Name"
              value={this.state.group}
              onChange={this.handleGroupName}
              />
            <br />
              <input
                type="password"
                placeholder="Group Password"
                value={this.state.groupPassword}
                onChange={this.handleGroupPassword}
                />
              <br />
            <input
              type="text"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleLoginName}
              />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleLoginPassword}
              />
            <br />
            <Button type="submit">Submit!</Button>
          </form>
        </div>
      )
    }
  },

  render: function() {
    return (
      <div className="pop-up-content">
        <p>KYKass GA WDI Team Presents</p>
        <h2 className="welcome-message">Welcome to Roomies, <br/> an app for happy roommates</h2>
        <hr className="small-hr"></hr>
        <h3 className="login">Please login or proceed as a guest.</h3>
        <br />
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
