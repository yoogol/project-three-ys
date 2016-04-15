import React from 'react';

const AddButton = React.createClass ({


  render: function() {
    return (
      <div>
        <button className="button add-button" onClick={this.props.handleAddButton}>Add Task</button>
      </div>
    )
  }
})

export default AddButton;
