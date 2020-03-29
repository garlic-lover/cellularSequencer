import React from "react";
import { connect } from "react-redux";
import * as Tone from "tone";

//Import of components
import Fader from "../Synth/Fader";

//Import of functions
import getIndexes from "../functions/getIndexes";
import crazyNotesStyle from "../functions/crazyNotesStyle";

import { setGridSize } from "../actions";

/* 
Un gros slider accessible sur le côté de la grille ; 
En appuyant sur un bouton on voit les paramètres sans style css pour modifier la 
manière dont le gros slider va agir. Ce dernier est un bouton macro.

En fonction des couleurs des blocs, jouer des instruments différents

Give special properties to some of the cells : they can change the scale or other
parameters depending on their lifepoint
*/

class SynthConainer extends React.Component {
  //create a synth and connect it to the master output (your speakers)

  chorus = new Tone.Chorus(2).toMaster();

  synth = new Tone.MembraneSynth({
    pitchDecay: 0.0,
    octaves: 8,
    oscillator: {
      type: "sine"
    },
    envelope: {
      attack: 0.001,
      decay: 0.2,
      sustain: 0.2,
      release: 1.4,
      attackCurve: "exponential"
    }
  }).connect(this.chorus);

  playSound = data => {
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
    this.synth.triggerAttackRelease(note, "8n");
  };

  componentDidMount = () => {};

  render = () => {
    let cells = this.props.cells;
    for (let i = 0; i < cells.length; i++) {
      let indexes = getIndexes(cells, { x: cells[i].x, y: cells[i].y });
      if (indexes.tab.length > 1) {
        this.playSound(indexes.tab[0]);
      }
    }
    return (
      <div
        id="SynthBar"
        onClick={() => {
          this.playSound();
        }}
      >
        <h3>Macro</h3>
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
    octavesRange: state.gridManager.parameters.octavesRange
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetGridSize: gridSide => {
      dispatch(setGridSize(gridSide));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SynthConainer);
