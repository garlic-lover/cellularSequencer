import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faMusic,
  faTh,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";

const icons = [faTh, faHeart, faMusic, faSlidersH];

class TutoScreen extends React.Component {
  state = { menuSelected: 0 };
  render = () => {
    return (
      <div id="screen3">
        <h2>How does it work ?</h2>
        <div id="underConstruct" className="row width align j_space">
          {icons.map((icon, index) => {
            return (
              <div
                className="relative"
                key={index}
                onClick={() => {
                  this.setState({ menuSelected: index });
                }}
              >
                {this.state.menuSelected === index && <div id="selectedItem" />}
                <FontAwesomeIcon icon={icon} className="bigIcon" />
              </div>
            );
          })}
        </div>
      </div>
    );
  };
}

export default TutoScreen;
