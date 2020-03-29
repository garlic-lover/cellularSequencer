import React from "react";
import { connect } from "react-redux";

class DrumGrid extends React.Component {
  render = () => {
    return <div id="drumGrid" />;
  };
}

const mapStateToProps = state => {
  return {
    cells: state.gridManager.cells,
    gridSize: state.gridManager.gridSize,
    scale: state.gridManager.parameters.scale,
    base: state.gridManager.parameters.base,
    octavesRange: state.gridManager.parameters.octavesRange,
    synthParameters: state.synthParameters
  };
};

export default connect(mapStateToProps)(DrumGrid);
