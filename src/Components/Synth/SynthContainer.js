import React from "react";
import { connect } from "react-redux";
import * as Tone from "tone";

import SynthParams from "./SynthParams";

//Import of functions
import getIndexes from "../../functions/getIndexes";
import crazyNotesStyle from "../../functions/crazyNotesStyle";

import { synthEdit } from "../../actions";

class SynthConainer extends React.Component {
  //create a synth and connect it to the master output (your speakers)

  chorus = new Tone.Chorus(2).toMaster();

  synth = new Tone.MembraneSynth(this.props.synthParameters).connect(
    this.chorus
  );

  fmSynth = new Tone.FMSynth().toMaster();

  //a polysynth composed of 6 Voices of Synth
  fmSynth = new Tone.PolySynth(6, Tone.FMSynth).toMaster();

  playSound = data => {
    if (!data) {
      return;
    }

    let note = crazyNotesStyle(
      data,
      this.props.scale,
      this.props.gridSize.y,
      this.props.gridSize.x,
      this.props.base,
      this.props.octavesRange
    );
    //play a middle 'C' for the duration of an 8th note
    if (note === false) {
      return;
    }
    this.synth.triggerAttackRelease(note, "8n");
  };

  polyPlay = tab => {
    this.fmSynth.triggerAttackRelease(["C4", "E4", "A4"], "4n");
  };

  onEditParams = () => {
    this.synth = new Tone.MembraneSynth(this.props.synthParameters).connect(
      this.chorus
    );
  };

  render = () => {
    let cells = this.props.cells;
    let already = false;
    for (let i = 0; i < cells.length; i++) {
      let indexes = getIndexes(cells, { x: cells[i].x, y: cells[i].y });
      if (already === false && indexes.tab.length > 1) {
        if (this.props.synthParameters.synthOn === true) {
          this.playSound(indexes.tab[0]);
          already = true;
        }
      }
    }
    return (
      <SynthParams
        synthParameters={this.props.synthParameters}
        onSynthEdit={params => {
          this.props.onSynthEdit(params);
          this.onEditParams();
        }}
      />
    );
  };
}

const mapStateToProps = state => {
  return {
    cells: state.gridManager.cells,
    gridSize: state.gridManager.gridSize,
    scale: state.gridManager.parameters.scale,
    base: state.gridManager.parameters.base,
    octavesRange: state.gridManager.parameters.octavesRange,
    synthParameters: state.synthParameters,
    midi: state.gridManager.midiData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSynthEdit: params => {
      return dispatch(synthEdit(params));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SynthConainer);
