import React from 'react';
require('../style/Styles.css');

const UserInfo = React.createClass ({
  render: function() {
    return (

      <div className="user-group-info">
        <p>
          <span className="group-info-labels">Group:</span>
          <span className="group-info-data">{this.props.currentGroup}</span>
           &nbsp;|&nbsp;
          <span className="group-info-labels">Roomie #1:</span>
          <span className="group-info-data">{this.props.currentUser}</span>
            &nbsp;|&nbsp;
           <span className="group-info-labels">Roomie #2:</span>
           <span className="group-info-data">{this.props.partnerUser}</span>
        </p>
      </div>

    )
  }
})

export default UserInfo;

// <div className="user-group-info">
//   <div className="group-info-labels">
//     <p>Group:</p>
//     <p>Logged In As:</p>
//   </div>
//   <div className="group-info-data">
//     <p>{this.props.currentGroup}</p>
//     <p>{this.props.currentUser}</p>
//   </div>
// </div>
