import React from 'react';
require('../style/Styles.css');

const UserInfo = React.createClass ({
  render: function() {
    return (
      <div className="user-group-info">
        <div className="group-info-labels">
          <p>Group:</p>
          <p>Logged In As:</p>
        </div>
        <div className="group-info-data">
          <p>{this.props.currentGroup}</p>
          <p>{this.props.currentUser}</p>
        </div>
      </div>
    )
  }
})

export default UserInfo;
