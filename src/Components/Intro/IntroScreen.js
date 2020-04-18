import React from "react";

const IntroScreen = () => {
  return (
    <div id="screen2" className="">
      <div className="para1">
        <div>
          Welcome on the <span className="green">Cell Sequencer</span>{" "}
        </div>
        <div>
          <span className="green">No need</span> for any musical education
        </div>
        <div>
          Let the browser play or{" "}
          <span className="green">control your own instruments</span> with MIDI
        </div>
      </div>
      <div className="para2">
        <div>
          The page is based on the concept of
          <span className="green"> cellular </span> automatons.
        </div>
        <div>
          A <span className="green"> cellular automaton</span> consists (more ot
          less) in a grid containing some units, called cells,
        </div>
        <div>
          that can <span className="green">move and interact</span> with their
          environment.
        </div>
        <div>
          Our cells can move, give<span className="green"> life</span> , make{" "}
          <span className="green">music</span> , and even
          <span className="green"> die</span>{" "}
          <span role="img" aria-label="emoji">
            😢
          </span>
        </div>
      </div>
      <a
        href="https://mathworld.wolfram.com/GameofLife.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        Want to know more?
      </a>
    </div>
  );
};

export default IntroScreen;
