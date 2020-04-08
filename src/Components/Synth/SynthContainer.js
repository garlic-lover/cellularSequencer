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
  }).toDestination();

  //a polysynth composed of 4 Voices of Synth
  synth = new Tone.PolySynth(
    Tone.FMSynth,
    this.props.synthParameters.fmSynth
  ).toDestination();

  polyPlay = () => {
    if (this.props.notes.current.length > 0) {
      this.synth.triggerAttackRelease(this.props.notes.current, "4n");
    }
  };

  monoPlay = () => {
    if (this.props.notes.current.length > 0) {
      console.log("play");
      this.synth.triggerAttackRelease(this.props.notes.current[0], "4n");
    }
  };

  onEditParams = () => {
    let instrument = this.props.synthParameters.instrument;
    let theInstument = "MembraneSynth";
    if (instrument === "fmSynth") {
      theInstument = "FMSynth";
    }
    //a polysynth composed of 4 Voices of Synth
    if (this.props.synthParameters.delayOn === true) {
      this.synth = new Tone.PolySynth(
        Tone[theInstument],
        this.props.synthParameters[instrument]
      ).connect(this.delay);
    } else {
      this.synth = new Tone.PolySynth(
        Tone[theInstument],
        this.props.synthParameters[instrument]
      ).toDestination();
    }
  };

  render = () => {
    if (this.props.synthParameters.synthOn === true) {
      if (this.props.synthParameters.polyOn === true) {
        this.polyPlay();
      } else {
        this.monoPlay();
      }
    }
    if (this.props.displaySynth === true) {
      return (
        <SynthParams
          synthParameters={this.props.synthParameters}
          onSynthEdit={async (params) => {
            console.log(params);
            await this.props.onSynthEdit(params);
            this.onEditParams();
          }}
        />
      );
    } else {
      return null;
    }
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
