import React from "react";

/* 
state : boolean
toggle : fonction that needs to change the state
*/

const Switch = ({ state, toggle, color }) => {
  if (!color) {
    color = "backGreen";
  }
  return (
    <div
      id="switchContainer"
      className={state ? "row align " + color : "row align backPink"}
    >
      <div
        id={state ? "switchBis" : "switch"}
        onClick={() => {
          toggle(!state);
        }}
      />
    </div>
  );
};

export default Switch;
