import React from "react";
import { connect } from "react-redux";

/* 
Pour placer les composants sur la grille, deux options : 
    - si le timer est on, donner une direction aléatoire ; 
    - si le timer est off, laisser à l'utilisateur le choix (utile pour programmer
      des rythmes)

Bonus : rajouter des cases folles
*/

// Import of components
import Board from "./components/Board";

// Import of the Cell class to build my objects
import Cell from "../Board/Cell";

// Import of functions
import arrayGenerator from "../functions/arrayGenerator";
import cellMovement from "../functions/cellMovement";
import newRandomCell from "../functions/newRandomCell";
import { arrayModify, cellsMove, chaosMode } from "../actions";

class BoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timer: "", width: 17, height: 17, count: 0 };
  }

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
      let array = cellMovement(
        this.props.cells,
        this.props.gridArray[0].length - 1,
        this.props.gridArray.length - 1,
        this.state.count,
        this.props.isChaos
      );
      this.props.onMove(array);
      this.setState({ count: this.state.count + 1 });
    }, tempo / 4);
    this.setState({ timer: timer });
  };

  componentDidMount = () => {
    let array = arrayGenerator(this.props.gridSize.x, this.props.gridSize.y);
    this.props.onArrayModify(array);
    const cells = [new Cell(11, 11)];
    this.props.onMove(cells);
  };

  render = () => {
    return (
      <div id="boardContainer" className="column height align j_center">
        <Board
          array={this.props.gridArray}
          cells={this.props.cells}
          onAddCell={(x, y) => {
            let newCell = new Cell(x, y);
            let tab = [...this.props.cells];
            tab.push(newCell);
            this.props.onMove(tab);
          }}
        />
        <div id="optionsBar" className="row width j_space">
          <div
            className="hover row align j_center hover optionButton"
            onClick={() => {
              if (this.state.timer === "") {
                this.timerStart();
              } else {
                window.clearInterval(this.state.timer);
                this.setState({ timer: "" });
              }
            }}
          >
            {this.state.timer === "" ? "Start" : "Stop"}
          </div>
          <div
            className="hover row align j_center hover optionButton"
            onClick={() => {
              this.props.onMove(
                newRandomCell(
                  this.props.cells,
                  this.state.width,
                  this.state.height
                )
              );
              this.setState(this.state);
            }}
          >
            Random
          </div>
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
    isChaos: state.gridManager.parameters.chaosMode
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
