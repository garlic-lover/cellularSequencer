import Cell from "../Components/Board/Cell";

const randomCellGen = (number, maxX, maxY) => {
  let cellsTab = [];
  for (let i = 0; i < number; i++) {
    let x = Math.round(Math.random() * maxX);
    let y = Math.round(Math.random() * maxY);
    let cell = new Cell(x, y);
    cellsTab.push(cell);
  }
  return cellsTab;
};

export default randomCellGen;
