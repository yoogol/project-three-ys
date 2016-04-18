import React from 'react';
import AddForm from '../components/AddForm'
require('../style/Styles.css');


const FormContainer = React.createClass ({
  displayAddForm: function() {
    if (this.props.typeOfFormActivated == "Add") {
      console.log("add is called")
      return (
        <AddForm
          closeBtn={this.props.closeBtn}
          userName={this.props.roommate1}
          typeOfFormActivated={this.props.typeOfFormActivated}
          todoToEdit={this.props.todoToEdit}
          loadAllTasks={this.props.loadAllTasks}
          currentUser={this.props.currentUser}
          currentGroup={this.props.currentGroup}
          />
      )
    } else if (this.props.typeOfFormActivated == "Edit") {
      return (
        <AddForm
          closeBtn={this.props.closeBtn}
          userName={this.props.roommate1}
          typeOfFormActivated={this.props.typeOfFormActivated}
          loadAllTasks={this.props.loadAllTasks}
          todoToEdit={this.props.todoToEdit}
          currentUser={this.props.currentUser}
          currentGroup={this.props.currentGroup}
          />
      )
    } else {
      return
    }
  },

  render: function() {
    // console.log(this.props.todoToEdit);
    return (
      <div className="add-form-container">
        {this.displayAddForm()}
      </div>
    )

  }
})

export default FormContainer;
