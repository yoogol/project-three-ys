import React from "react";
var FontAwesome = require('react-fontawesome');
var Tooltip = require('react-bootstrap').Tooltip;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;

function InfoBtn(props){
  const infoTooltip=(
    <Tooltip id="instructions-tooltip"><strong>See Instructions</strong></Tooltip>
  )
  return(
    <div className="instructions-button">
      <OverlayTrigger placement="bottom" overlay={infoTooltip}>
        <FontAwesome
          onClick={props.handleInstructionsButton}
          name='info-circle'
          size='2x'
        />
      </OverlayTrigger>
  </div>
  )
}

export default InfoBtn;
