import React from 'react';

const UserInfo = React.createClass ({
  render: function() {
    return (
      <div className="user-group-info">
        <div className="group-info-labels">
          <p>Group:</p>
          <p>Roomie #1:</p>
          <p>Roomie #2:</p>
        </div>
        <div className="group-info-data">
          <p>{this.props.currentGroup}</p>
          <p>{this.props.currentUser}</p>
          <p>{this.props.roommate2name}</p>
        </div>
      </div>
    )
  }
})

export default UserInfo;
