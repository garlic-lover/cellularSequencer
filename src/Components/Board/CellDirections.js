import React from "react";
import arrow from "../../assets/icons/arrow.svg";

const moves = require("../../assets/moves.json");

const angles = [-135, -90, -45, -180, "", 0, 135, 90, 45];

const CellDirections = ({ directionChoice }) => {
  const theMoves = [...moves];
  theMoves.splice(4, 0, { x: 0, y: 0 });
  console.log(theMoves);
  return (
    <div id="cellDirections" className="j_between">
      {theMoves.map((move, index) => {
        return (
          <div
            className={
              index === 4 ? "centerCircle" : "circle  row align j_center"
            }
            key={index}
            onClick={() => {
              console.log("Touch");
              directionChoice(move);
            }}
          >
            {index !== 4 && (
              <img
                src={arrow}
                height={12}
                alt="flèche"
                style={{ transform: "rotate(" + angles[index] + "deg)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CellDirections;
