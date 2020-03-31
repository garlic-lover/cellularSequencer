// This function will animate the cells

/* 
  I could build a function to generate different kinds of repulsions depending on 
  the speed of the impact : are they in contact or in the same square? Reactions 
  can be different (colorwise and soudwise)
*/

// Import of the Cell class to build my objects
import Cell from "../Board/Cell";

import getIndexes from "../functions/getIndexes";
// import deterministMove from "../functions/deterministMove";
import deterMove from "../functions/deterMove";

// I made a small tab store all possible moves
const movesTab = require("../assets/moves.json");

const randomMove = () => {
  let random = Math.random();
  random = random * 8;
  random = Math.trunc(random);
  return movesTab[random];
};

const cellMovement = (
  initialTab,
  width,
  height,
  timer,
  isChaos,
  chaosProba,
  life
) => {
  let newTab = [];
  const newCellsTab = [];
  let tab = [...initialTab];
  for (let i = 0; i < tab.length; i++) {
    let cell = tab[i];
    if (cell.x > width || cell.y > height) {
    } else {
      let newDirection = { ...cell.direction };
      let newX = "";
      let newY = "";
      // Let's try to make the not young a bit slower
      if (timer % 2 === 1 && cell.lifePoints < 7) {
        newTab.push(cell);
      } else if (timer % 4 === 0 && cell.lifePoints < 3) {
        newTab.push(cell);
      } else {
        // If two cells are in the same square, they get random movements
        let indexes = getIndexes(initialTab, {
          x: cell.x,
          y: cell.y
        });
        if (indexes.tab.length > 1) {
          // Chaos mode on : random moves // Chaos mode off : determinist moves
          if (isChaos === true) {
            let randomNumber = Math.random() * 100;
            if (randomNumber < chaosProba) {
              newDirection = randomMove();
            } else {
              newDirection = deterMove(cell.direction, indexes.tab);
            }
          } else {
            newDirection = deterMove(cell.direction, indexes.tab);
          }
          if (life.canDie === true) {
            cell.lifePoints = cell.lifePoints + 5;
            if (cell.lifePoints > 10) {
              cell.lifePoints = 10;
            }
          }
          // If two cells meet, they have a child
          let isAlready = getIndexes(newCellsTab, {
            x: cell.x,
            y: cell.y
          });
          if (
            life.canGive === true &&
            isAlready.tab.length === 0 &&
            indexes.isYoung === false
          ) {
            let theDirection = {
              x: indexes.tab[0].x * indexes.tab[0].x,
              y: indexes.tab[0].x * indexes.tab[0].x
            };
            let x = cell.x + theDirection.x;
            let y = cell.y + theDirection.y;

            let newCell = new Cell(x, y, theDirection, life.lifePoints);
            newTab.push(newCell);
            newCellsTab.push(newCell);
          }
        } else {
          //let position = cells.findIndex(test, { x: theIndex, y: index });

          // If we arrive at one of the border, we change the direction
          if (
            (cell.x === 0 && cell.direction.x === -1) ||
            (cell.x === width && cell.direction.x === 1)
          ) {
            newDirection = { x: newDirection.x * -1, y: newDirection.y };
            if (life.canDie === true) {
              cell.lifePoints = cell.lifePoints - 2;
            }
          }
          if (
            (cell.y === 0 && cell.direction.y === -1) ||
            (cell.y === height && cell.direction.y === 1)
          ) {
            newDirection = { x: newDirection.x, y: newDirection.y * -1 };
            if (life.canDie === true) {
              cell.lifePoints = cell.lifePoints - 2;
            }
          }
        }

        newX = cell.x + newDirection.x;
        newY = cell.y + newDirection.y;

        // When no more Life Points, the cell dies
        if (cell.lifePoints > 0) {
          newTab.push(new Cell(newX, newY, newDirection, cell.lifePoints));
        }
      }
    }
  }
  return newTab;
};

export default cellMovement;
