import React from 'react';

const LoginForm = React.createClass ({
  getInitialState: function() {
    return {
      name: "",
      password: ""
    }
  },
  displayLogin: function() {
    return (
      <form onSubmit={this.handleLoginSubmit}>
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
  },
  displayUnregisteredGreeting: function () {

  },
  render: function() {
    return (
      <div style={LoginFormStyle}>
        <h2>Welcome message</h2>
        <h3>Please login or proceede as a guest.</h3>
        <button>Login</button>
        <button>Just go in</button>
      </div>
    )
  }
});

let LoginFormStyle = {
  border: '1px solid grey'
}

export default LoginForm;
