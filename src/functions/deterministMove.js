// I made a small tab store all possible moves
const movesTab = require("../assets/moves.json");

const randomMove = () => {
  let random = Math.random();
  random = random * 8;
  random = Math.trunc(random);
  return movesTab[random];
};

const deterministMove = (cell0, cell1, cell2) => {
  let ref = cell0.direction;
  let other = "";
  if (cell0 === cell1) {
    other = cell2.direction;
  } else if (cell0 === cell2) {
    other = cell1.direction;
  }
  if (other === "") {
    other = randomMove();
  }
  let x = "";
  let y = "";
  if (ref.x === other.x && ref.y === other.y) {
    while (ref.x === other.x && ref.y === other.y) {
      other = randomMove();
    }
  }

  // Cas 1 ne bouge que sur un axe
  if (ref.x === 0 || ref.y === 0) {
    x = ref.x * -1;
    y = ref.y * -1;
  } else {
    // Deuxième cas : si sur deux axes. Dans ce cas, regarder celui qui est différent
    if (other.x === 0) {
      x = ref.x;
      y = ref.y * -1;
    } else if (other.y === 0) {
      x = ref.x * -1;
      y = ref.y;
    } else if (ref.x === other.x) {
      x = ref.x * -1;
      y = ref.y;
    } else if (ref.y === other.y) {
      x = ref.x;
      y = ref.y * -1;
    }
  }

  const newDirection = {
    x: x,
    y: y
  };
  return newDirection;
};

export default deterministMove;
