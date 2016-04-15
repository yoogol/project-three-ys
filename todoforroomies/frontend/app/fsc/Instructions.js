import React from "react";

function Instructions(props){
  return(
    <div>
      <p>Instructions</p>
      <button onClick={props.closeBtn}>Close</button>
    </div>
  )
}

export default Instructions;
