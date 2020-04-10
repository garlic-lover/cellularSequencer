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
          output(input + 1);
        }}
      >
        <FontAwesomeIcon
          icon={vertical === true ? faArrowUp : faArrowLeft}
          className="playIcon lightGreen"
        />
      </div>
      <div className="numberInput">{input}</div>
      <div
        onClick={() => {
          if (input === 0) {
            return;
          }
          output(input - 1);
        }}
      >
        <FontAwesomeIcon
          icon={vertical === true ? faArrowDown : faArrowRight}
          className="playIcon lightGreen"
        />
      </div>
    </div>
  );
};

export default NumberInput;
