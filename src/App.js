import React from "react";
import "./reset.css";
import "./preferences.css";
import "./App.css";
import "./colors.css";
import "./Components/Board/board.css";
import "./Components/Sider/sider.css";
import "./Components/Synth/synth.css";
import BoardContainer from "./Components/Board/BoardContainer";
import TutoScreen from "./Components/Intro/TutoScreen";
import Particles from "react-particles-js";

const partParams = require("./assets/particlesjs-config.json");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { followerX: 0, followerY: 0 };
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
  };

  render = () => {
    return (
      <div id="App" className="App">
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
        <div id="screen2" className="">
          <div className="para1">
            <div>
              This page is based on the concept of
              <span className="green"> cellular </span> automatons.
            </div>
            <div>
              A <span className="green"> cellular automaton</span> consists of a
              regular grid of cells, each in one of a finite number of states.
            </div>
            <div>
              Our cells can move, give<span className="green"> life</span> ,
              make <span className="green">music</span> , and even
              <span className="green"> die</span> <span>😢</span>
            </div>
          </div>
          <div className="para2">
            <div>
              This page is based on the concept of
              <span className="green"> cellular </span> automatons.
            </div>
            <div>
              A <span className="green"> cellular automaton</span> consists of a
              regular grid of cells, each in one of a finite number of states.
            </div>
            <div>
              Our cells can move, give<span className="green"> life</span> ,
              make <span className="green">music</span> , and even
              <span className="green"> die</span> <span>😢</span>
            </div>
          </div>
          <a
            href="https://mathworld.wolfram.com/GameofLife.html"
            target="_blank"
          >
            Want to know more?
          </a>
        </div>
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
