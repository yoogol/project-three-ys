import React from "react";
var FontAwesome = require('react-fontawesome');

function InfoBtn(props){
  return(
    <div className="instructions-button" onClick={props.handleInstructionsButton}>
      <FontAwesome
        name='info-circle'
        size='2x'
      />
  </div>
  )
}

export default InfoBtn;



    // <FontAwesome
    //   name='info-circle'
    //   size='2x'
    // />
    // <button className="instructions-button" onClick={this.props.handleInstructionsButton}>See ScoreBoard</button>
