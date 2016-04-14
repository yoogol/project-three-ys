import React from 'react';

const AddButton = React.createClass ({


  render: function() {
    return (
      <div>
        <button onClick={this.props.handleAddButton}>Add Button</button>
      </div>
    )
  }
})

export default AddButton;
