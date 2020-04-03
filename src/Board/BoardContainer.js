import React from "react";
import { connect } from "react-redux";

/* 
Bonus : rajouter des cases folles

We could have a no move property : when elements reach it, it makes a special sound

Let add a probability parameter making changing the probabilities of random move
*/

// Import of components
import Board from "./Board";

// Import of the Cell class to build my objects
import Cell from "../Board/Cell";

// Import of functions
import arrayGenerator from "../functions/arrayGenerator";
import cellMovement from "../functions/cellMovement";
import newRandomCell from "../functions/newRandomCell";
import {
  arrayModify,
  cellsMove,
  chaosMode,
  playStop,
  setGridSize,
  midiSet
} from "../actions";

//Import of midi channels in hexadecimal
const midiChannels = require("../assets/midiChannels.json");

class BoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: "",
      width: 17,
      height: 17,
      count: 0,
      displayCellDirection: false,
      selectedCell: { x: "", y: "" }
    };
  }

  midiConnect = async () => {
    let midi = null; // global MIDIAccess object

    const onMIDISuccess = async midiAccess => {
      console.log("MIDI ready!");
      midi = await midiAccess; // store in the global (in real usage, would probably keep in an object instance)
      this.listInputsAndOutputs(midi);
    };

    function onMIDIFailure(msg) {
      console.log("Failed to get MIDI access - " + msg);
    }

    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  };

  listInputsAndOutputs = midiAccess => {
    let midiData = { midiAccess: midiAccess, id: "" };
    for (var entry of midiAccess.inputs) {
      var input = entry[1];
      console.log(
        "Input port [type:'" +
          input.type +
          "'] id:'" +
          input.id +
          "' manufacturer:'" +
          input.manufacturer +
          "' name:'" +
          input.name +
          "' version:'" +
          input.version +
          "'"
      );
    }
    let availableOutputs = [];
    for (var entry of midiAccess.outputs) {
      var output = entry[1];
      midiData.id = output.id;
      let theName = output.manufacturer + "-" + output.name;
      availableOutputs.push({
        name: theName,
        id: output.id
      });
    }
    if (availableOutputs.length !== 0) {
      midiData.availableOutputs = availableOutputs;
      midiData.selectedDevice = 0;
      midiData.ready = true;
      midiData.channel = 8;
      midiData.poly = true;
      this.props.onMidiSet(midiData);
      alert(
        "Midi connecté à l'appareil suivant : " +
          midiData.availableOutputs[0].name
      );
    } else {
      alert("No device detected, please retry");
    }
  };

  clockSend = () => {
    if (this.props.midi.ready === true) {
      if (this.state.count % 2 === 0) {
        let midiAccess = this.props.midi.midiAccess;
        let portID = this.props.midi.availableOutputs[
          this.props.midi.selectedDevice
        ].id;
        var noteOnMessage = [0x9b, 0x3c, 0x7f];
        var noteOff = 0x8b;
        var output = midiAccess.outputs.get(portID);
        output.send(noteOnMessage);
        output.send([noteOff, 0x3c, 0x40], window.performance.now() + 10.0);
      }
      return;
    }
  };

  oneShot = () => {
    let array = cellMovement(
      this.props.cells,
      this.props.gridArray.length - 1,
      this.props.gridArray[0].length - 1
    );
    this.props.onMove(array);
  };

  timerStart = () => {
    let frequence = this.props.tempo / 60;
    let tempo = 1000 / frequence;
    let timer = setInterval(() => {
      this.clockSend();
      let array = cellMovement(
        this.props.cells,
        this.props.gridArray[0].length - 1,
        this.props.gridArray.length - 1,
        this.state.count,
        this.props.isChaos,
        this.props.chaosProba,
        this.props.life
      );
      this.props.onMove(array);
      this.setState({ count: this.state.count + 1 });
    }, tempo / 4);
    this.props.playStop(true);
    this.setState({ timer: timer });
  };

  componentDidMount = () => {
    let array = arrayGenerator(this.props.gridSize.x, this.props.gridSize.y);
    this.props.onArrayModify(array);
    const cells = [
      new Cell(5, 5),
      new Cell(10, 5),
      new Cell(5, 10),
      new Cell(10, 10),
      new Cell(0, 0),
      new Cell(15, 15),
      new Cell(0, 15),
      new Cell(15, 0)
    ];
    this.props.onMove(cells);
  };

  render = () => {
    return (
      <div id="boardContainer" className="column height align j_center">
        <Board
          array={this.props.gridArray}
          cells={this.props.cells}
          onAddCell={(x, y, direction) => {
            let tab = [...this.props.cells];
            let already = false;
            for (let i = 0; i < this.props.cells.length; i++) {
              let theCell = this.props.cells[i];
              if (theCell.x === x && theCell.y === y) {
                already = true;
                tab.splice(i, 1);
              }
            }
            if (already === false) {
              let newCell = new Cell(
                x,
                y,
                direction,
                this.props.life.lifePoints
              );
              tab.push(newCell);
            }

            this.props.onMove(tab);
          }}
          isPlaying={this.props.isPlaying}
          displayCellDirection={this.state.displayCellDirection}
          selectedCell={this.state.selectedCell}
          onAddDeterministCell={(displayCellDirection, selectedCell) => {
            this.setState({
              displayCellDirection: displayCellDirection,
              selectedCell: selectedCell
            });
          }}
          tempo={this.props.tempo}
        />
        <div id="optionsBar" className="column">
          <div
            className="hover row align j_center hover optionButton"
            onClick={() => {
              if (this.state.timer === "") {
                this.timerStart();
              } else {
                window.clearInterval(this.state.timer);
                this.setState({ timer: "" });
                this.props.playStop(false);
              }
            }}
          >
            {this.state.timer === "" ? "Start" : "Stop"}
          </div>
          <div
            className="hover row align j_center hover optionButton"
            onClick={() => {
              this.props.onMove([]);
            }}
          >
            Clear the grid
          </div>
          <div
            className="hover row align j_center hover optionButton"
            onClick={() => {
              this.props.onMove(
                newRandomCell(
                  this.props.cells,
                  this.props.gridSize.y,
                  this.props.gridSize.x,
                  this.props.life.lifePoints
                )
              );
              this.setState(this.state);
            }}
          >
            New random cell
          </div>
          <div
            className="hover row align j_center hover optionButton"
            onClick={() => {}}
          >
            <div>X :</div>
            <input
              type="number"
              value={this.props.gridSize.y}
              min={0}
              max={36}
              step={1}
              onChange={event => {
                let gridSize = { ...this.props.gridSize };
                gridSize.y = event.target.value;
                let array = arrayGenerator(gridSize.x, gridSize.y);
                this.props.setGridSize({
                  x: gridSize.x,
                  y: Number(event.target.value)
                });
                this.props.onArrayModify(array);
              }}
            />

            <div>Y : </div>
            <input
              type="number"
              value={this.props.gridSize.x}
              min={0}
              max={36}
              step={1}
              onChange={event => {
                let gridSize = { ...this.props.gridSize };
                gridSize.x = event.target.value;
                let array = arrayGenerator(gridSize.x, gridSize.y);
                this.props.setGridSize({
                  x: Number(event.target.value),
                  y: gridSize.y
                });
                this.props.onArrayModify(array);
              }}
            />
          </div>
          <div
            className="hover row align j_center hover optionButton"
            onClick={() => {
              alert(
                "This page is based on the concept of cellular algorithms. \n\nEvery cell has a direction and a life expetancy(blue, green, orange, red).\n\nThe cells lose lifepoints when they hit the walls. When a cell no longer has life points, it dies.\n\nWhen two cells meet:\nThey make a sound;\nIf they're not too young (blue), they get a child;\nThey get back some life points (with a limit of 10).\nThey get a new direction.\n\nIn determinist mode, when two cells meet, their direction is reversed.\nLet's bring some chaos : in chaos mode, when two cells meet, they get a random direction for the next step.\n\nIn synth mode, the X axis determines the note played (do, ré, mi, ...), and the Y axis the octave (based on the octave base and range).\n\n In drum mode, the X axis determines the drum part being triggered, and the Y axis the drum kit (1 drum kit per octave range)."
              );
            }}
          >
            Information
          </div>
          <div
            className="hover row align j_center hover optionButton"
            onClick={() => {
              this.midiConnect();
            }}
          >
            MIDI connect
          </div>
          {this.props.midi.ready === true && (
            <div
              className="hover column align j_center midiOptions"
              onClick={() => {}}
            >
              <h3>Midi options</h3>
              <div>
                <div>Midi device</div>
                <select
                  value={
                    this.props.midi.availableOutputs[
                      this.props.midi.selectedDevice
                    ].name
                  }
                  onChange={event => {
                    let midiObject = { ...this.props.midi };
                    midiObject.selectedDevice = event.target.value;
                    this.props.onMidiSet(midiObject);
                  }}
                >
                  {this.props.midi.availableOutputs.map((output, index) => {
                    return (
                      <option value={index} key={index}>
                        {output.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <div>Midi channel</div>
                <select
                  value={this.props.midi.channel}
                  onChange={event => {
                    let midiObject = { ...this.props.midi };
                    midiObject.channel = event.target.value;
                    this.props.onMidiSet(midiObject);
                  }}
                >
                  {midiChannels.map((channel, index) => {
                    return (
                      <option key={index} value={channel}>
                        {index + 1}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div
                className="hover row align j_center hover optionButton"
                onClick={() => {
                  let midiObject = { ...this.props.midi };
                  midiObject.poly = !this.props.midi.poly;
                  this.props.onMidiSet(midiObject);
                }}
              >
                {this.props.midi.poly === true
                  ? "MIDI Poly On"
                  : "MIDI Poly Off"}
              </div>
            </div>
          )}

          {/* <div
            className="hover"
            onClick={() => {
              this.oneShot();
            }}
          >
            One shot
          </div> */}
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    gridArray: state.gridManager.array,
    cells: state.gridManager.cells,
    gridSize: state.gridManager.gridSize,
    tempo: state.gridManager.parameters.tempo,
    isChaos: state.gridManager.parameters.chaosMode,
    chaosProba: state.gridManager.parameters.chaosProba,
    isPlaying: state.gridManager.isPlaying,
    life: state.gridManager.parameters.life,
    midi: state.gridManager.midiData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onArrayModify: array => {
      dispatch(arrayModify(array));
    },
    onMove: array => {
      dispatch(cellsMove(array));
    },
    onChaos: isChaos => {
      dispatch(chaosMode(isChaos));
    },
    playStop: isPlaying => {
      dispatch(playStop(isPlaying));
    },
    setGridSize: grid => {
      dispatch(setGridSize(grid));
    },
    onMidiSet: midi => {
      dispatch(midiSet(midi));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
