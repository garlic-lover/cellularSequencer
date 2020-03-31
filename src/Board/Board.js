import React from "react";
import colorMapper from "../functions/colorMapper";
import getIndexes from "../functions/getIndexes";
import CellDirections from "./CellDirections";
import virus from "../assets/icons/virus.svg";

/* 
  Add animations
  Fill with samples 
  Drums mode 
  MIDI

*/

const Board = ({
  array,
  cells,
  onAddCell,
  isPlaying,
  displayCellDirection,
  selectedCell,
  onAddDeterministCell,
  tempo
}) => {
  return (
    <div id="board">
      {array.map((line, index) => {
        let theIndex = index;
        return (
          <div key={index} className="line row align">
            {line.map((square, index) => {
              let emptyStyle = "";
              if (isPlaying === false) {
                emptyStyle = "cellShadow";
              }
              let indexes = getIndexes(cells, { y: theIndex, x: index });
              if (indexes.tab.length === 0) {
                return (
                  <div
                    key={index}
                    className={
                      selectedCell.x === index && selectedCell.y === theIndex
                        ? "square hover relative backPink cellShadow"
                        : "square hover relative " + emptyStyle
                    }
                    onClick={() => {
                      if (displayCellDirection === true) {
                        return;
                      }
                      if (isPlaying === true) {
                        onAddCell(index, theIndex);
                      } else {
                        onAddDeterministCell(true, { x: index, y: theIndex });
                      }
                    }}
                  >
                    {displayCellDirection === true &&
                      selectedCell.x === index &&
                      selectedCell.y === theIndex && (
                        <CellDirections
                          directionChoice={choice => {
                            onAddDeterministCell(false, {
                              x: "",
                              y: ""
                            });
                            onAddCell(index, theIndex, choice);
                          }}
                        />
                      )}
                  </div>
                );
              } else if (indexes.tab.length === 1) {
                let color = colorMapper(indexes.tab[0].lifePoints);

                let animation =
                  "x" +
                  indexes.tab[0].direction.x +
                  "y" +
                  indexes.tab[0].direction.y;
                let animationSpeed = 60 / tempo;
                let lifePoints = indexes.tab[0].lifePoints;
                if (lifePoints < 3) {
                  // animationSpeed = animationSpeed * 2;
                } else if (lifePoints < 7) {
                } else {
                  animationSpeed = animationSpeed / 2;
                }
                return (
                  <div
                    key={index}
                    className={
                      "square hover cellShadow relative backVirus  " +
                      color +
                      " " +
                      animation
                    }
                    style={{ animationDuration: animationSpeed + "s" }}
                  />
                );
              } else {
                return (
                  <div
                    key={index}
                    className="square hover relative backVirus"
                    style={{ backgroundColor: "pink" }}
                  >
                    <div className="activeStep" />
                  </div>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
