import React from "react";
import "./reset.css";
import "./preferences.css";
import "./App.css";
import "./colors.css";
import "./Components/Board/board.css";
import "./Components/Sider/sider.css";
import "./Components/Synth/synth.css";
import BoardContainer from "./Components/Board/BoardContainer";
import SynthContainer from "./Components/Synth/SynthContainer";
import SiderContainer from "./Components/Sider/SiderContainer";
import Drums from "./Components/Synth/Drums";
import MidiContainer from "./Components/Midi/MidiContainer";

function App() {
  return (
    <div className="App">
      <header className="row j_center">My super app</header>
      <BoardContainer />
      <SiderContainer />
      <SynthContainer />
      <Drums />
      <MidiContainer />
    </div>
  );
}

export default App;
