import React from 'react';

const UserInfo = React.createClass ({
  render: function() {
    return (
      <div>
        <div>Group: {this.props.currentGroup}</div>
        <div>Logged In As: {this.props.currentUser}</div>
      </div>
    )
  }
})

export default UserInfo;
