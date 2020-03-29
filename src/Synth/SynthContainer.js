import React from "react";
import { connect } from "react-redux";
import * as Tone from "tone";

//Import of components
import Fader from "../Synth/Fader";
import Parameter from "./Parameter";

import ParametersList from "./ParametersList";

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
*/

class SynthConainer extends React.Component {
  //create a synth and connect it to the master output (your speakers)

  chorus = new Tone.Chorus(2).toMaster();

  synth = new Tone.MembraneSynth(this.props.synthParameters).connect(
    this.chorus
  );

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

    this.synth.triggerAttackRelease(note, "8n");
  };

  onEditParams = () => {
    this.synth = new Tone.MembraneSynth(this.props.synthParameters).connect(
      this.chorus
    );
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
        <h3>Synth Params</h3>
        {ParametersList.map((param, index) => {
          return (
            <Parameter
              key={index}
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
