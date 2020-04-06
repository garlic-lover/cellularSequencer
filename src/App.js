import React from "react";
import "./reset.css";
import "./preferences.css";
import "./App.css";
import "./colors.css";
import "./Components/Board/board.css";
import "./Components/Sider/sider.css";
import "./Components/Synth/synth.css";
import BoardContainer from "./Components/Board/BoardContainer";
import Particles from "react-particles-js";

const partParams = require("./assets/particlesjs-config.json");

function App() {
  return (
    <div className="App">
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
            Our cells can move, give<span className="green"> life</span> , make{" "}
            <span className="green">music</span> , and even
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
            Our cells can move, give<span className="green"> life</span> , make{" "}
            <span className="green">music</span> , and even
            <span className="green"> die</span> <span>😢</span>
          </div>
        </div>
        <a href="https://mathworld.wolfram.com/GameofLife.html" target="_blank">
          Want to know more?
        </a>
      </div>
      <div id="screen3">
        <h2>How does it work ?</h2>
        <div id="underConstruct">Page en cours de construction</div>
      </div>
      {/*       <SiderContainer />
      <SynthContainer />
      <Drums />
      <MidiContainer /> */}
      <BoardContainer />
    </div>
  );
}

export default App;
