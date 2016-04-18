import React from "react";
var FontAwesome = require('react-fontawesome');
var Tooltip = require('react-bootstrap').Tooltip;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
require('../style/Styles.css');

function ScoreBoardBtn(props){
  const scoreboardTooltip=(
    <Tooltip id="scoreboard-tooltip"><strong>Check Your Score!</strong></Tooltip>
  )
  return(
    <div className="scoreboard-button">
      <OverlayTrigger placement="bottom" overlay={scoreboardTooltip}>
        <FontAwesome
          onClick={props.handleScoreBoardButton}
          name='star'
          size='3x'
        />
      </OverlayTrigger>
    </div>
  )
}

export default ScoreBoardBtn;
