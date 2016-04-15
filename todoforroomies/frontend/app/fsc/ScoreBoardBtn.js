import React from "react";
var FontAwesome = require('react-fontawesome');

function ScoreBoardBtn(props){
  return(
    <FontAwesome
      onClick={props.handleScoreBoardButton}
      name='star'
      size='2x'
    />

  )
}

export default ScoreBoardBtn;
