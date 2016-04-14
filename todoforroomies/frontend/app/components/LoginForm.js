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
  displayLogin: function() {
    if (this.state.loginPath === "login") {
      return (
        <form onSubmit={this.handleLoginSubmit}>
          <h1>Please log in</h1>
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
    } else if (this.state.loginPath === "nologin") {
      return (
        <div>
            <h1>You are in!</h1>
            <p>Please remember since you are not logged in your data will not be saved</p>
        </div>

      )
    }
  },
  displayUnregisteredGreeting: function () {

  },
  render: function() {
    return (
      <div>
        <h2 className="welcome-message">Welcome to Roomies</h2>
        <h3 className="login">Please login or proceed as a guest.</h3>
        <button className="button" onClick={this.handleLoginPathButton}>Login</button>
        <button className="button" onClick={this.handleNoLoginPathButton}>Just go in</button>
        {/* <hr></hr> */}
        {this.displayLogin()}

      </div>
    )
  }
});


export default LoginForm;
