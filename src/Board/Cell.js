// I made a small tab store all possible moves
const movesTab = require("../assets/moves.json");

const randomMove = () => {
  let random = Math.random();
  random = random * 8;
  random = Math.trunc(random);
  return movesTab[random];
};

class Cell {
  constructor(x, y, dir, lifePoints) {
    this.x = x ? x : 0;
    this.y = y ? y : 0;
    this.direction = dir ? dir : randomMove();
    this.lifePoints = lifePoints ? lifePoints : 10;
  }
}

export default Cell;
