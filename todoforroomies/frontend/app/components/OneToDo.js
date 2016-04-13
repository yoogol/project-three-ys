import React from "react";

const OneToDo = React.createClass({
  render: function(){
    return(
      <div>{this.props.ToDoItem}</div>
    )
  }
});


export default OneToDo;
