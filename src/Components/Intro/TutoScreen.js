import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faMusic,
  faTh,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";

const icons = [faTh, faSlidersH, faHeart, faMusic];

const tutoTexts = require("./tutoScripts.json");

class TutoScreen extends React.Component {
  state = { menuSelected: 0, previousSelected: 0 };
  render = () => {
    // Animation conditionelle selon la direction et la distance
    let animation = "";
    if (this.state.menuSelected !== this.state.previousSelected) {
      let diff = this.state.previousSelected - this.state.menuSelected;
      if (diff < 0) {
        diff = diff * -1;
        animation = "right" + diff;
        console.log(animation);
      } else {
        animation = "left" + diff;
        console.log(animation);
      }
    }
    return (
      <div id="screen3">
        <h2>How does it work ?</h2>
        <div id="tutoSpace">
          {tutoTexts[this.state.menuSelected].map((text, index) => {
            let color = "";
            if (index % 2 === 1) {
              color = "green";
            }
            return (
              <div key={index} className={color}>
                {text}
              </div>
            );
          })}
        </div>
        <div id="underConstruct" className="row width align j_space">
          <div id="tutoIcons" className="row align j_between">
            {icons.map((icon, index) => {
              return (
                <div
                  className="relative"
                  key={index}
                  onClick={() => {
                    this.setState({
                      menuSelected: index,
                      previousSelected: this.state.menuSelected,
                    });
                  }}
                >
                  {this.state.menuSelected === index && (
                    <div id="selectedItem" className={animation} />
                  )}
                  <FontAwesomeIcon
                    icon={icon}
                    className={
                      this.state.menuSelected === index
                        ? "bigIcon selectedFading"
                        : "bigIcon lightGreen"
                    }
                  />
                </div>
              );
            })}{" "}
          </div>
        </div>
      </div>
    );
  };
}

export default TutoScreen;
