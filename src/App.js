import React from "react";
import "./reset.css";
import "./preferences.css";
import "./App.css";
import "./colors.css";
import "./Components/Board/board.css";
import "./Components/Sider/sider.css";
import "./Components/Synth/synth.css";
import "./Components/Intro/tuto.css";
import BoardContainer from "./Components/Board/BoardContainer";
import IntroScreen from "./Components/Intro/IntroScreen";
import TutoScreen from "./Components/Intro/TutoScreen";
import Particles from "react-particles-js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const partParams = require("./assets/particlesjs-config.json");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followerX: 0,
      followerY: 0,
      displayScroller: true,
      preventScrollerAppear: false,
    };
  }

  getPosition(el) {
    var xPosition = 0;
    var yPosition = 0;

    while (el) {
      xPosition += el.offsetLeft - el.scrollLeft + el.clientLeft;
      yPosition += el.offsetTop - el.scrollTop + el.clientTop;
      el = el.offsetParent;
    }
    return {
      x: xPosition,
      y: yPosition,
    };
  }

  followerPosition = (el) => {
    var xPosition = 0;
    var yPosition = 0;

    while (el) {
      xPosition += el.offsetLeft - el.scrollLeft + el.clientLeft;
      yPosition += el.offsetTop - el.scrollTop + el.clientTop;
      el = el.offsetParent;
    }
    return this.setState({ followerX: el.clientX, followerY: el.clientY });
  };

  componentDidMount = () => {
    /*    let follower = document.getElementById("mouseFollower");

    document.getElementById("App").addEventListener("mousemove", (e) => {
      console.log(e);
      let y = e.clientY;
      y = y + e.pageY - e.offsetY;
      this.setState({ followerX: e.clientX, followerY: y });
    }); */

    // Event lister in order to show or not the button to scroll down

    // self targets the App component
    let self = this;

    window.addEventListener("scroll", function (e) {
      if (window.scrollY > window.innerHeight * 2) {
        self.setState({ displayScroller: false });
      } else {
        if (self.state.displayScroller === false) {
          if (self.state.preventScrollerAppear === true) {
            self.setState({ preventScrollerAppear: false });
          }
          self.setState({ displayScroller: true });
        }
      }
    });
    // Prevent Appear on refresh if already at the bottom
    if (window.scrollY > window.innerHeight * 2) {
      this.setState({ preventScrollerAppear: true });
    }
  };

  render = () => {
    return (
      <div id="App" className="App">
        {this.state.preventScrollerAppear === false && (
          <div
            id="scroller"
            className={
              this.state.displayScroller === true
                ? "hover backWhite appeared"
                : "hover transparent whiteDisappeared"
            }
            onClick={() => {
              window.scroll({
                top: 10000,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <FontAwesomeIcon
              icon={faArrowDown}
              className={
                this.state.displayScroller === true
                  ? "bigIcon green appeared"
                  : "bigIcon transparent greenDisappeared"
              }
            />
          </div>
        )}
        {/* <div
          id="mouseFollower"
          style={{ top: this.state.followerY, left: this.state.followerX }}
        /> */}
        <div id="homeScreen" className="row j_center align">
          <div id="particlesFrame">
            <Particles params={partParams} />
          </div>
          <header>The Cell Sequencer</header>
        </div>
        <IntroScreen />
        <TutoScreen />
        {/*       <SiderContainer />
      <SynthContainer />
      <Drums />
      <MidiContainer /> */}
        <BoardContainer />
      </div>
    );
  };
}

export default App;
