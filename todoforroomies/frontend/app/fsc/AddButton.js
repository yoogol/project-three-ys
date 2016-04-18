import React from 'react';
var FontAwesome = require('react-fontawesome');
require('../style/Styles.css');

const AddButton = React.createClass ({
  render: function() {
    return (
      <button className="add-button" onClick={this.props.handleAddButton}>
        <FontAwesome
          name='plus'
        />
      </button>
    )
  }
})

export default AddButton;

// <div>
//   <button className="add-button" onClick={this.props.handleAddButton}>Add Task <FontAwesome
//     name='plus'
//   /></button>
// </div>
