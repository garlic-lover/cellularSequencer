import React from "react";
import { connect } from "react-redux";
import { parametersChange } from "../../actions";

import scales from "../../assets/scales";

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
          <h3>Mode</h3>
          <select
            value={
              this.props.parameters.chaosMode === true
                ? "Chaos"
                : "Déterministe"
            }
            onChange={(event) => {
              let chaos = true;
              if (event.target.value === "Déterministe") {
                chaos = false;
              }
              this.paramChange("chaosMode", chaos);
            }}
          >
            <option value="Déterministe">Déterministe</option>
            <option value="Chaos">Chaos</option>
          </select>
        </div>
        <div className="parameter">
          <h3>Chaos proba'</h3>
          <div className="row align">
            <input
              type="number"
              value={this.props.parameters.chaosProba}
              min={0}
              max={100}
              onChange={(event) => {
                this.paramChange("chaosProba", event.target.value);
              }}
            />
            <div>%</div>
          </div>
        </div>
        <div className="parameter">
          <h3>Can give life</h3>
          <div
            onClick={() => {
              let life = { ...this.props.parameters.life };
              life.canGive = !life.canGive;
              this.paramChange("life", life);
            }}
          >
            {this.props.parameters.life.canGive === true ? "Yes" : "No"}
          </div>
        </div>
        <div className="parameter">
          <h3>Can Die</h3>
          <div
            onClick={() => {
              let life = { ...this.props.parameters.life };
              life.canDie = !life.canDie;
              this.paramChange("life", life);
            }}
          >
            {this.props.parameters.life.canDie === true ? "Yes" : "No"}
          </div>
        </div>
        <div className="parameter">
          <h3>Life points</h3>
          <input
            type="number"
            value={this.props.parameters.life.lifePoints}
            min={0}
            onChange={(event) => {
              let life = { ...this.props.parameters.life };
              life.lifePoints = event.target.value;
              this.paramChange("life", life);
            }}
          />
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    parameters: state.gridManager.parameters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (parameters) => {
      dispatch(parametersChange(parameters));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SiderContainer);
