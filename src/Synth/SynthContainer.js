import React from "react";
import { connect } from "react-redux";
import * as Tone from "tone";

//Import of components
import Fader from "../Synth/Fader";
import Parameter from "./Parameter";

// import of sounds
import kick from "../assets/Samples/kick.wav";
import snare from "../assets/Samples/snare.wav";
import rim from "../assets/Samples/rim.wav";
import hihat from "../assets/Samples/hihat.wav";
import hit from "../assets/Samples/hit.wav";

// import of 808
import Height_kick from "../assets/Samples/808/808kick.wav";
import Height_snare from "../assets/Samples/808/808snare.wav";
import Height_cowbell from "../assets/Samples/808/808cowbell.wav";
import Height_hihatC from "../assets/Samples/808/808hihatC.wav";
import Height_hihatO from "../assets/Samples/808/808hihatO.wav";
import Height_conga from "../assets/Samples/808/808conga.wav";
import Height_clap from "../assets/Samples/808/808clap.wav";

import ParametersList from "./ParametersList";

//Import of scales
import scales from "../assets/scales";

//Import of functions
import getIndexes from "../functions/getIndexes";
import crazyNotesStyle from "../functions/crazyNotesStyle";

import { synthEdit } from "../actions";

/* 
Un gros slider accessible sur le côté de la grille ; 
En appuyant sur un bouton on voit les paramètres sans style css pour modifier la 
manière dont le gros slider va agir. Ce dernier est un bouton macro.

En fonction des couleurs des blocs, jouer des instruments différents

Give special properties to some of the cells : they can change the scale or other
parameters depending on their lifepoint

Drum sounds are triggered by wall contact or by a different sequencer ? 
*/

class SynthConainer extends React.Component {
  //create a synth and connect it to the master output (your speakers)

  chorus = new Tone.Chorus(2).toMaster();

  synth = new Tone.MembraneSynth(this.props.synthParameters).connect(
    this.chorus
  );

  drums = new Tone.Sampler({
    C2: Height_kick,
    D2: Height_snare,
    "D#2": Height_hihatC,
    F2: Height_hihatO,
    G2: Height_cowbell,
    A2: Height_clap,
    "A#2": Height_conga,
    C3: kick,
    D3: kick,
    "D#3": snare,
    F3: hit,
    G3: rim,
    A3: hihat,
    "A#3": hihat
  }).connect(this.chorus);

  playSound = data => {
    if (!data) {
      return;
    }

    let note = crazyNotesStyle(
      data,
      this.props.scale,
      this.props.gridSize.x,
      this.props.gridSize.y,
      this.props.base,
      this.props.octavesRange
    );
    //play a middle 'C' for the duration of an 8th note
    if (note === false) {
      return;
    }
    console.log(note);
    if (this.props.synthParameters.drumsOn === true) {
      let noteSplitted = note.split("");
      let noteSplittedLength = noteSplitted.length;

      let scale = scales.minor;

      // Position of the note in the scale
      let notesAmount = 7;
      let x = data.x;
      let theNote = Math.trunc((x / this.props.gridSize.x) * notesAmount);
      theNote = scale[theNote];
      if (!theNote) {
        return false;
      }
      let drumNote = theNote + noteSplitted[noteSplittedLength - 1];
      /* 
      We are going to apply probabilities to drums so that
      they dont't play all the time
      */
      let random = Math.random();
      if (random < 1) {
        this.drums.triggerAttackRelease(drumNote, "8n");
      }
    }
    if (this.props.synthParameters.synthOn === true) {
      this.synth.triggerAttackRelease(note, "8n");
    }
  };

  onEditParams = () => {
    this.synth = new Tone.MembraneSynth(this.props.synthParameters).connect(
      this.chorus
    );
  };

  componentDidMount = () => {};

  render = () => {
    let cells = this.props.cells;
    let already = false;
    for (let i = 0; i < cells.length; i++) {
      let indexes = getIndexes(cells, { x: cells[i].x, y: cells[i].y });
      if (already === false && indexes.tab.length > 1) {
        this.playSound(indexes.tab[0]);
        already = true;
      }
    }
    return (
      <div
        id="SynthBar"
        onClick={() => {
          this.playSound();
        }}
      >
        <h3>Synth Params</h3>
        {ParametersList.map((param, index) => {
          return (
            <Parameter
              key={index}
              type={param.type}
              label={param.label}
              min={param.min}
              step={param.step}
              value={
                param.level === 0
                  ? this.props.synthParameters[param.param]
                  : this.props.synthParameters.envelope[param.param]
              }
              onChange={async value => {
                let params = { ...this.props.synthParameters };
                if (param.level === 0) {
                  params[param.param] = value;
                } else {
                  let envelope = { ...params.envelope };
                  envelope[param.param] = value;
                  params.envelope = envelope;
                }

                await this.props.onSynthEdit(params);
                this.onEditParams();
              }}
            />
          );
        })}
        <Fader />
      </div>
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
    synthParameters: state.synthParameters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSynthEdit: params => {
      dispatch(synthEdit(params));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SynthConainer);
