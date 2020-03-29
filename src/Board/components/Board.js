import React from "react";
import colorMapper from "../../functions/colorMapper";
import getIndexes from "../../functions/getIndexes";

const Board = ({ array, cells, onAddCell }) => {
  return (
    <div id="board" className="">
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
                    className="square hover relative"
                    onClick={() => {
                      onAddCell(index, theIndex);
                    }}
                  />
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
