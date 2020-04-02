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
import midiNotesGen from "../functions/midiNotesGen";
import velocityAssign from "../functions/velocityAssign";

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
      this.props.gridSize.y,
      this.props.gridSize.x,
      this.props.base,
      this.props.octavesRange
    );
    //play a middle 'C' for the duration of an 8th note
    if (note === false) {
      return;
    }
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

  polyMidi = async () => {
    let cells = this.props.cells;
    let alreadyPlayed = [];
    for (let i = 0; i < cells.length; i++) {
      let indexes = await getIndexes(cells, { x: cells[i].x, y: cells[i].y });
      let isAlready = await getIndexes(alreadyPlayed, {
        x: cells[i].x,
        y: cells[i].y
      });
      if (
        alreadyPlayed.length < 5 &&
        indexes.tab.length > 1 &&
        isAlready.tab.length === 0
      ) {
        if (indexes.tab[0]) {
          this.sendMidiNote(indexes.tab[0]);
          alreadyPlayed.push(cells[i]);
        } else {
          console.log("Strange", indexes.tab, i, indexes.tab[i]);
          console.log(indexes.tab);
        }
      }
    }
  };

  sendMidiNote = data => {
    if (!data) {
      return;
    }
    // Set velocity
    let velocity = "0x" + velocityAssign(data.lifePoints);

    // Then set midi note
    let midiNote = midiNotesGen(
      data,
      this.props.scale,
      this.props.gridSize.y,
      this.props.gridSize.x,
      this.props.base,
      this.props.octavesRange
    );
    let midiAccess = this.props.midi.midiAccess;
    let portID = this.props.midi.availableOutputs[
      this.props.midi.selectedDevice
    ].id;
    let hex = "0x" + midiNote;
    let noteOn = "0x9" + this.props.midi.channel;
    let noteOff = "0x8" + this.props.midi.channel;
    var noteOnMessage = [noteOn, hex, velocity]; // note on, middle C, full velocity
    var output = midiAccess.outputs.get(portID);
    output.send(noteOnMessage); //omitting the timestamp means send immediately.
    output.send([noteOff, hex, 0x40], window.performance.now() + 10.0); // Inlined array creation- note off, middle C,
    // release velocity = 64, timestamp = now + 1000ms.
    return "Finished";
  };

  componentDidMount = () => {};

  render = () => {
    let cells = this.props.cells;
    let already = false;
    for (let i = 0; i < cells.length; i++) {
      let indexes = getIndexes(cells, { x: cells[i].x, y: cells[i].y });
      if (already === false && indexes.tab.length > 1) {
        if (
          this.props.synthParameters.synthOn === true ||
          this.props.synthParameters.drumsOn === true
        ) {
          this.playSound(indexes.tab[0]);
          already = true;
        }
        if (this.props.midi.poly === false) {
          this.sendMidiNote(indexes.tab[0]);
        }
      }
    }
    if (this.props.midi.poly === true) {
      this.polyMidi();
    }
    return (
      <div
        id="SynthBar"
        onClick={() => {
          this.playSound();
        }}
      >
        <h3>Sound Params</h3>
        <div className="parameter">
          <h3>Wave type</h3>
          <select
            value={this.props.synthParameters.oscillator.type}
            onChange={async event => {
              let params = { ...this.props.synthParameters };
              params.oscillator = { type: event.target.value };
              await this.props.onSynthEdit(params);
              this.onEditParams();
            }}
          >
            <option value="sawtooth">Sawtooth</option>
            <option value="sine">Sine</option>
            <option value="square">Square</option>
          </select>
        </div>
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
    synthParameters: state.synthParameters,
    midi: state.gridManager.midiData
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
