import React from "react";

/* 
state : boolean
toggle : fonction that needs to change the state
*/

const Switch = ({ state, toggle, color }) => {
  if (!color) {
    color = "backBlue";
  }
  return (
    <div
      id="switchContainer"
      className={state ? "row align " + color : "row align backGrey"}
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
