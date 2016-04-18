import React from "react";
var Button = require('react-bootstrap').Button;
require('../style/Styles.css');

function Instructions(props){
  return(
    <div className="pop-up-content">
      <h3>Instructions</h3>
      <p>Sick of looking at those dirty dishes in the sink? Welcome to Roomies, getting rid of resentful roommates one point at a time.</p>
      <p>It's simple. Start by adding a new task: When should it be completed by? How long will it take? Cleaning toilets...gross! Mark that one as <span className="italic">extra yucky</span>!</p>
      <p>Claim that chore with the dropdown, and watch it move to your board.</p>
      <p>Need to change a task you already added? No problem! Just click edit or delete.</p>
      <p>When you're done, just check it off and watch your score go up!</p>
      <p>Whoever has the most points at the end of each week wins... And the loser has to do that week's random punishment.</p>
      <Button className="close-button" onClick={props.closeBtn}>Close</Button>
    </div>
  )
}

export default Instructions;
