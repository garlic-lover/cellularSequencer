import React from "react";
import { connect } from "react-redux";
import { parametersChange } from "../actions";

import scales from "../assets/scales";

class SiderContainer extends React.Component {
  paramChange = (param, value) => {
    let parameters = { ...this.props.parameters };
    parameters[param] = value;
    this.props.onChange(parameters);
  };

  render = () => {
    return (
      <div id="siderContainer">
        <div className="parameter">
          <h3>Tempo</h3>
          <input
            type="number"
            value={this.props.parameters.tempo}
            min={0}
            onChange={event => {
              this.paramChange("tempo", Number(event.target.value));
            }}
          />
        </div>
        <div className="parameter">
          <h3>Scale</h3>
          <select
            value={this.props.parameters.scale}
            onChange={event => {
              this.paramChange("scale", event.target.value);
            }}
          >
            {Object.keys(scales).map((scale, index) => {
              return <option key={index}>{scale}</option>;
            })}
          </select>
        </div>
        <div className="parameter">
          <h3>Base octave</h3>
          <input
            type="number"
            value={this.props.parameters.base}
            min={0}
            onChange={event => {
              if (
                this.props.parameters.base +
                  this.props.parameters.octavesRange ===
                  8 &&
                event.target.value > this.props.parameters.base
              ) {
                alert("Base octave + octave range can't exceed 8");
                return this.paramChange("base", this.props.parameters.base);
              }
              this.paramChange("base", Number(event.target.value));
            }}
          />
        </div>
        <div className="parameter">
          <h3>Octave range</h3>
          <input
            type="number"
            value={this.props.parameters.octavesRange}
            min={0}
            onChange={event => {
              if (
                this.props.parameters.base +
                  this.props.parameters.octavesRange ===
                  8 &&
                event.target.value > this.props.parameters.octavesRange
              ) {
                alert("Base octave + octave range can't exceed 8");
                return this.paramChange(
                  "octavesRange",
                  this.props.parameters.octavesRange
                );
              }
              this.paramChange("octavesRange", Number(event.target.value));
            }}
          />
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    parameters: state.gridManager.parameters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChange: parameters => {
      dispatch(parametersChange(parameters));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SiderContainer);
