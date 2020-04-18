import React from "react";
import colorMapper from "../../functions/colorMapper";
import getIndexes from "../../functions/getIndexes";
import CellDirections from "./CellDirections";
// import virus from "../assets/icons/virus.svg";

const Board = ({
  array,
  cells,
  onAddCell,
  isPlaying,
  displayCellDirection,
  selectedCell,
  onAddDeterministCell,
  tempo,
  displayGrid,
}) => {
  return (
    <div id="board">
      {array.map((line, index) => {
        let theIndex = index;
        return (
          <div key={index} className="line row align">
            {line.map((square, index) => {
              let emptyStyle = "";
              if (displayGrid === true) {
                emptyStyle = "cellShadow solid";
              }
              let indexes = getIndexes(cells, { y: theIndex, x: index });
              if (indexes.tab.length === 0) {
                return (
                  <div
                    key={index}
                    className={
                      selectedCell.x === index && selectedCell.y === theIndex
                        ? "square hover relative backPink " + emptyStyle
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
                          directionChoice={(choice) => {
                            onAddDeterministCell(false, {
                              x: "",
                              y: "",
                            });
                            onAddCell(index, theIndex, choice);
                          }}
                        />
                      )}
                  </div>
                );
              } else if (indexes.tab.length === 1) {
                let color = colorMapper(indexes.tab[0].lifePoints);
                let animation = "";

                if (isPlaying === true) {
                  animation =
                    "x" +
                    indexes.tab[0].direction.x +
                    "y" +
                    indexes.tab[0].direction.y;
                }
                let animationSpeed = 60 / tempo;
                let lifePoints = indexes.tab[0].lifePoints;
                if (lifePoints < 3) {
                  // animationSpeed = animationSpeed * 2;
                } else if (lifePoints < 7) {
                } else {
                  animationSpeed = animationSpeed / 2;
                }
                let solid = "";
                if (displayGrid === true) {
                  solid = " solid sqareBis";
                } else {
                  solid = "";
                }
                return (
                  <div
                    key={index}
                    className={
                      "square hover relative backVirus  " +
                      color +
                      " " +
                      animation +
                      solid
                    }
                    style={{ animationDuration: animationSpeed + "s" }}
                    onClick={() => {
                      onAddCell(index, theIndex);
                    }}
                  />
                );
              } else {
                return (
                  <div
                    key={index}
                    className={
                      displayGrid === true
                        ? "square hover relative solid "
                        : "square hover relative"
                    }
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
