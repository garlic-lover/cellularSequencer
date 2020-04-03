import React from "react";
import { connect } from "react-redux";
import * as Tone from "tone";

import SynthParams from "./SynthParams";

//Import of functions
import getIndexes from "../../functions/getIndexes";
import crazyNotesStyle from "../../functions/crazyNotesStyle";
import midiNotesGen from "../../functions/midiNotesGen";
import velocityAssign from "../../functions/velocityAssign";

import { synthEdit } from "../../actions";

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

  fmSynth = new Tone.FMSynth().toMaster();

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
        if (this.props.synthParameters.synthOn === true) {
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
