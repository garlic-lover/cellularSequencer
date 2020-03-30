// I made a small tab store all possible moves
const movesTab = require("../assets/moves.json");

const randomMove = () => {
  let random = Math.random();
  random = random * 8;
  random = Math.trunc(random);
  return movesTab[random];
};

const deterMove = (cell, tab) => {
  let counter = 0;
  for (let i = 0; i < tab.length; i++) {
    let x = tab[i];
    if (x.direction.x === cell.x && x.direction.y === cell.y) {
      counter = counter + 1;
    }
  }
  if (counter > 1) {
    console.log(tab);
    return randomMove();
  }

  return { x: cell.x * -1, y: cell.y * -1 };
};

export default deterMove;
