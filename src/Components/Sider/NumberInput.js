import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const NumberInput = ({ vertical, input, output }) => {
  return (
    <div className={vertical === true ? "column align" : "row align"}>
      <div
        onClick={() => {
          if (input === 36) {
            return;
          }
          if (vertical === true) {
            output(input + 1);
          } else {
            output(input - 1);
          }
        }}
      >
        <FontAwesomeIcon
          icon={vertical === true ? faArrowUp : faArrowLeft}
          className="numberIcon lightGreen"
        />
      </div>
      <div className="numberInput">{input}</div>
      <div
        onClick={() => {
          if (input === 0) {
            return;
          }
          if (vertical === true) {
            output(input - 1);
          } else {
            output(input + 1);
          }
        }}
      >
        <FontAwesomeIcon
          icon={vertical === true ? faArrowDown : faArrowRight}
          className="numberIcon lightGreen"
        />
      </div>
    </div>
  );
};

export default NumberInput;
