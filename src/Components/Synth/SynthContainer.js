import React from "react";
import { connect } from "react-redux";
import * as Tone from "tone";

import SynthParams from "./SynthParams";

import { synthEdit } from "../../actions";

class SynthConainer extends React.Component {
  state = { currentlyPlayed: [] };
  //create a synth and connect it to the master output (your speakers)

  delay = new Tone.PingPongDelay({
    delayTime: 60 / this.props.tempo,
    feedback: 0.1,
    wet: 0.3,
  }).toMaster();

  synth = new Tone.FMSynth(this.props.synthParameters.membraneSynth).connect(
    this.delay
  );

  //a polysynth composed of 4 Voices of Synth
  synth = new Tone.PolySynth(
    Tone.MembraneSynth,
    this.props.synthParameters.fmSynth
  ).connect(this.delay);

  polyPlay = () => {
    this.synth.triggerAttackRelease(this.props.notes.current, "4n");
  };

  onEditParams = () => {
    //a polysynth composed of 4 Voices of Synth
    if (this.props.synthParameters.delayOn === true) {
      this.synth = new Tone.PolySynth(
        Tone.FMSynth,
        this.props.synthParameters.fmSynth
      ).connect(this.delay);
    } else {
      console.log("IsOff");
      this.synth = new Tone.PolySynth(
        Tone.FMSynth,
        this.props.synthParameters.fmSynth
      ).toDestination();
    }
  };

  render = () => {
    if (this.props.synthParameters.synthOn === true) {
      this.polyPlay();
    }
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
    tempo: state.gridManager.parameters.tempo,
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
