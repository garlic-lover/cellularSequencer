import React from "react";
import colorMapper from "../functions/colorMapper";
import getIndexes from "../functions/getIndexes";
import CellDirections from "./CellDirections";

const Board = ({
  array,
  cells,
  onAddCell,
  isPlaying,
  displayCellDirection,
  selectedCell,
  onAddDeterministCell
}) => {
  return (
    <div id="board">
      {array.map((line, index) => {
        let theIndex = index;
        return (
          <div key={index} className="line row align">
            {line.map((square, index) => {
              let indexes = getIndexes(cells, { y: theIndex, x: index });
              if (indexes.tab.length === 0) {
                return (
                  <div
                    key={index}
                    className={
                      selectedCell.x === index && selectedCell.y === theIndex
                        ? "square hover relative backPink"
                        : "square hover relative"
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
                return (
                  <div
                    key={index}
                    className={"square hover relative " + color}
                  />
                );
              } else {
                return (
                  <div
                    key={index}
                    className="square hover relative"
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
