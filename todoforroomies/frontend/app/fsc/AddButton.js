import React from 'react';
var FontAwesome = require('react-fontawesome');
const AddButton = React.createClass ({


  render: function() {
    return (
      <div>
        <button className="add-button" onClick={this.props.handleAddButton}>Add Task <FontAwesome
          name='plus'
          size='1x'
        /></button>
      </div>
    )
  }
})

export default AddButton;
