import React from "react";

function Instructions(props){
  return(
    <div className="pop-up-content">
      <h3>Instructions</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sem eros, dapibus et accumsan eget, feugiat nec risus. Curabitur et pellentesque nulla. Ut id convallis leo. Suspendisse eu sollicitudin lectus. Donec tristique rutrum dui, at luctus orci molestie laoreet.</p>
      <p>Aliquam magna ipsum, dictum ut tristique a, malesuada sit amet sem. Pellentesque in porta nunc. In tortor metus, porta nec tincidunt sed, efficitur at ipsum. Donec libero arcu, eleifend nec fringilla nec, efficitur et odio. Curabitur et elit ultrices, consectetur tortor nec, finibus ex. In egestas dignissim ex id pellentesque. Phasellus hendrerit, augue id sodales congue, risus risus sollicitudin ante, in accumsan tortor ligula sit amet urna. Cras a dictum turpis.</p>
      <button className="close-button" onClick={props.closeBtn}>Close</button>
    </div>
  )
}

export default Instructions;
