import React from "react";
import "./reset.css";
import "./preferences.css";
import "./App.css";
import "./colors.css";
import "./Board/board.css";
import "./Sider/sider.css";
import "./Synth/synth.css";
import BoardContainer from "./Board/BoardContainer";
import SynthContainer from "./Synth/SynthContainer";
import SiderContainer from "./Sider/SiderContainer";

function App() {
  return (
    <div className="App">
      {/*       <header className="row j_center">My super app</header> */}
      <BoardContainer />
      <SiderContainer />
      <SynthContainer />
    </div>
  );
}

export default App;
