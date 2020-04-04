import React from "react";

class Fader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseDown: false,
      faderPosition: 0,
      faderStaticPosition: 0,
      faderHeight: "",
      onClickPosition: 300,
    };
  }

  componentDidMount = () => {
    // Event listeners to manage the movement of the fader
    let fader = document.getElementById("fader" + this.props.name);
    let faderContainer = document.getElementById(
      "faderContainer" + this.props.name
    );
    this.setState({
      faderHeight: faderContainer.clientHeight,
      faderPosition: faderContainer.clientHeight * this.props.value,
    });

    fader.addEventListener("mousedown", (e) => {
      this.setState({ mouseDown: true, onClickPosition: e.y });
    });

    faderContainer.addEventListener("mousemove", (e) => {
      if (this.state.mouseDown === true) {
        let diff = this.state.onClickPosition - e.clientY;
        if (
          this.state.faderStaticPosition - diff > 0 &&
          this.state.faderStaticPosition - diff < this.state.faderHeight
        ) {
          this.setState({
            faderPosition: this.state.faderStaticPosition - diff,
          });
        }
      }
    });

    document.addEventListener("mouseup", (e) => {
      this.setState({
        mouseDown: false,
        faderStaticPosition: this.state.faderPosition,
      });
      // The callback sends a value between 0 and 1
      this.props.callbackValue(
        (this.state.faderHeight - this.state.faderPosition) /
          this.state.faderHeight
      );
    });
  };

  render = () => {
    return (
      <div className="faderContainer" id={"faderContainer" + this.props.name}>
        <div
          className="fader"
          id={"fader" + this.props.name}
          style={{ top: this.state.faderPosition }}
        />
      </div>
    );
  };
}

export default Fader;
