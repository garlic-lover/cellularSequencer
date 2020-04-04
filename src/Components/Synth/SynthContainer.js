import React from "react";
import { connect } from "react-redux";
import * as Tone from "tone";

import SynthParams from "./SynthParams";

import { synthEdit } from "../../actions";

class SynthConainer extends React.Component {
  state = { currentlyPlayed: [] };
  //create a synth and connect it to the master output (your speakers)

  chorus = new Tone.Chorus(2).toMaster();

  synth = new Tone.MembraneSynth(
    this.props.synthParameters.membraneSynth
  ).connect(this.chorus);

  //a polysynth composed of 4 Voices of Synth
  synth = new Tone.PolySynth(
    Tone.FMSynth,
    this.props.synthParameters.fmSynth
  ).toDestination();

  /*   fmSynth0 = new Tone.FMSynth().toMaster();
  fmSynth1 = new Tone.FMSynth().toMaster();
  fmSynth2 = new Tone.FMSynth().toMaster();
  fmSynth3 = new Tone.FMSynth().toMaster(); */

  /*   polyPlay = async () => {
    let current = this.props.notes.current;
    let previous = this.props.notes.previous;
    if (current.length > 0) {
      for (let i = 0; i < 4; i++) {
        let synth = "fmSynth" + i;
        if (previous.indexOf(current[i]) !== -1) {
          let index = previous.indexOf(current[i]) + 1;
          synth = "fmSynth" + index;
          console.log(synth);
        }
        this[synth].triggerAttackRelease(current[i], "4n");
      }
    }
  }; */

  polyPlay = () => {
    this.synth.triggerAttackRelease(this.props.notes.current, "4n");
  };

  onEditParams = () => {
    //a polysynth composed of 4 Voices of Synth
    this.synth = new Tone.PolySynth(
      Tone.FMSynth,
      this.props.synthParameters.fmSynth
    ).toDestination();
  };

  render = () => {
    this.polyPlay();
    return (
      <SynthParams
        synthParameters={this.props.synthParameters}
        onSynthEdit={async (params) => {
          await this.props.onSynthEdit(params);
          this.onEditParams();
        }}
        synthType="membraneSynth"
      />
    );
  };
}

const mapStateToProps = (state) => {
  return {
    cells: state.gridManager.cells,
    gridSize: state.gridManager.gridSize,
    scale: state.gridManager.parameters.scale,
    base: state.gridManager.parameters.base,
    octavesRange: state.gridManager.parameters.octavesRange,
    synthParameters: state.synthParameters,
    midi: state.gridManager.midiData,
    notes: state.gridManager.notes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSynthEdit: (params) => {
      return dispatch(synthEdit(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SynthConainer);
