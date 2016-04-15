import React from 'react';

const LoginForm = React.createClass ({
  getInitialState: function() {
    return {
      loginPath: "",
      name: "",
      password: ""
    }
  },
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
  handleRegisterSubmit: function(e) {
    console.log("ajax call to add to db (check if unique)");
    console.log("function to add name to state")
  },
  handleLoginSubmit: function() {
    console.log("check if name is in db");
    console.log("if yes, approve")
  },
  displayLogin: function() {
    if (this.state.loginPath === "login") {
      return (
        <form onSubmit={this.handleLoginSubmit}>
          <h1>Please log in</h1>
          <input
            className="logininput"
            type="text"
            placeholder="name"
            value={this.state.name}
            onChange={this.props.handleLoginName}
            />
          <input
            className="logininput"
            type="text"
            placeholder="Password"
            value={this.state.password}
            onChange={this.props.handleLoginPassword}
            />
          <input className="user-login-button" type="submit"/>
        </form>
      )
    } else if (this.state.loginPath === "nologin") {
      return (
        <div>
            <h1>You are in!</h1>
            <p>Please remember since you are not logged in your data will not be saved</p>
            <button onClick={this.props.closeBtn}>Close</button>
        </div>

      )
    } else if (this.state.loginPath == "register") {
      return (
        <form onSubmit={this.handleRegisterSubmit}>
          <h1>Please register</h1>
          <input
            type="text"
            placeholder="name"
            value={this.state.name}
            onChange={this.props.handleLoginName}
            />
          <input
            type="text"
            placeholder="password"
            value={this.state.password}
            onChange={this.props.handleLoginPassword}
            />
          <input type="submit"/>
        </form>
      )
    }
  },
  displayUnregisteredGreeting: function () {

  },
  render: function() {
    return (
      <div>
        <h2 className="welcome-message">Welcome to Roomies, where dirty pots don't eat relationships</h2>
        <h3 className="login">Please login or proceed as a guest.</h3>
        <button className="button main-start-button" onClick={this.handleRegisterPathButton}>Register</button>
        <button className="button main-start-button" onClick={this.handleLoginPathButton}>Login</button>
        <button className="button main-start-button" onClick={this.handleNoLoginPathButton}>Just peek in</button>
        {/* <hr></hr> */}
        {this.displayLogin()}

      </div>
    )
  }
});


export default LoginForm;
