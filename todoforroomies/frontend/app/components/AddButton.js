import React from 'react';

const AddButton = React.createClass ({
  handleClick: function(e) {
    this.props.nameInput(e);
  },
  handleTask: function(e) {
    this.props.taskInput(e)
  },

  render: function() {
    return (
      <div>
        <button>Add Button</button>
      </div>
    )
  }
})

export default AddButton;
