import React from "react";
import { connect } from "react-redux";

// Import of functions
import midiNotesGen from "../../functions/midiNotesGen";
import velocityAssign from "../../functions/velocityAssign";
import getIndexes from "../../functions/getIndexes";

class MidiContainer extends React.Component {
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

  render = () => {
    let cells = this.props.cells;
    let already = false;
    if (this.props.midi.poly === true) {
      this.polyMidi();
    } else {
      for (let i = 0; i < cells.length; i++) {
        let indexes = getIndexes(cells, { x: cells[i].x, y: cells[i].y });
        if (already === false && indexes.tab.length > 1) {
          if (this.props.midi.poly === false) {
            this.sendMidiNote(indexes.tab[0]);
          }
        }
      }
    }

    return null;
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

export default connect(mapStateToProps)(MidiContainer);
