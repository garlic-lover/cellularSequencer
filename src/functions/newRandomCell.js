// Import of the Cell class to build my objects
import Cell from "../Components/Board/Cell";

// I made a small tab store all possible moves
const movesTab = require("../assets/moves.json");

const newRandomCell = (tab, width, height, lifePoints) => {
  let random = Math.random();
  random = random * 8;
  random = Math.trunc(random);
  let direction = movesTab[random];

  random = Math.random();
  random = random * width;
  random = Math.trunc(random);
  let x = random;

  random = Math.random();
  random = random * height;
  random = Math.trunc(random);
  let y = random;

  let newCell = new Cell(x, y, direction, lifePoints);
  tab.push(newCell);
  return tab;
};

export default newRandomCell;
